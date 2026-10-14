import type {
  GameState, ScenarioLine, TransientCommand, ScenarioFile, BranchFrame, Choice, Condition, SceneSnapshot,
} from './types';
import { reduceLine } from './SceneReducer';
import { isTransient } from './commands';
import { resolveCursor, peekLine } from './cursor';
import { HistoryManager } from './HistoryManager';

export type AdvanceResult =
  | { kind: 'line'; line: ScenarioLine; transients: TransientCommand[] }
  | { kind: 'choice'; choiceId: string }
  | { kind: 'end' };

export class ScenarioEngine {
  private state: GameState;
  private readonly history = new HistoryManager<GameState>(50);
  // 初期 state (まだ何も消費していない空 snapshot) を history に積むと
  // goBack で「テキスト無し+背景無し」の見えない地点まで戻れてしまうため、
  // 最初の消費までは push をスキップする。
  private hasConsumed = false;

  private readonly registry: Record<string, ScenarioFile>;

  constructor(initial: GameState, registry: Record<string, ScenarioFile>) {
    this.state = structuredClone(initial);
    this.registry = registry;
  }

  getState(): GameState {
    return structuredClone(this.state);
  }

  peek(): ScenarioLine | null {
    return peekLine(this.state.progress, this.registry);
  }

  // ログ表示用。過去の行の snapshot を古い順で返す（現在の行は含まない）。
  getHistorySnapshots(): SceneSnapshot[] {
    return this.history.list().map((s) => structuredClone(s.snapshot));
  }

  // showIf を満たす選択肢だけ返す (UIに見せる一覧)。
  getChoices(choiceId: string): Choice[] {
    const top = this.state.progress.branchStack[this.state.progress.branchStack.length - 1];
    const scenarioId = top?.scenarioId ?? this.state.progress.scenarioId;
    const all = this.registry[scenarioId]?.choices?.[choiceId] ?? [];
    return all.filter((c) => this.isVisible(c));
  }

  // 今表示している行の choiceId
  currentChoiceId(): string | null {
    const cur = resolveCursor(this.state.progress, this.registry);
    return cur.lines[cur.frame.lineIndex - 1]?.choiceId ?? null;
  }

  // 1ステップ進める
  advance(): AdvanceResult {
    // 選択肢を選ぶまでは先へ進めない。
    const choiceId = this.currentChoiceId();
    if (choiceId) return { kind: 'choice', choiceId };
    return this.step(structuredClone(this.state));
  }

  // 選択肢を選び、分岐の最初の行まで進める
  selectChoice(choiceId: string, visibleIndex: number): AdvanceResult {
    const scenario = this.registry[this.state.progress.scenarioId];
    const all = scenario?.choices?.[choiceId] ?? [];
    // 絞り込み後の位置 → branch 本体を持つ元配列の位置へ変換。
    const choiceIndex = all.reduce<number[]>(
      (acc, c, i) => (this.isVisible(c) ? [...acc, i] : acc),
      [],
    )[visibleIndex];
    const choice = choiceIndex === undefined ? undefined : all[choiceIndex];
    if (!choice) {
      throw new Error(`Invalid choice: ${choiceId}[${visibleIndex}]`);
    }
    // 選ぶ前の画面 (テキスト+選択肢) を履歴に残す。
    const before = structuredClone(this.state);
    for (const [key, delta] of Object.entries(choice.points ?? {})) {
      this.state.points[key] = (this.state.points[key] ?? 0) + delta;
    }
    const frame: BranchFrame = {
      scenarioId: this.state.progress.scenarioId,
      choiceId,
      choiceIndex,
      lineIndex: 0,
    };
    if (choice.next) frame.next = choice.next;
    this.state.progress.branchStack.push(frame);
    return this.step(before);
  }

  // 1ステップ戻る
  goBack(): GameState | null {
    const prev = this.history.pop();
    if (!prev) return null;
    this.state = prev;
    return this.getState();
  }

  // ロード
  restore(saved: GameState): GameState {
    this.state = structuredClone(saved);
    this.history.clear();
    // ロード後はロード地点に「戻れる」必要があるため、次のadvanceからpush開始。
    this.hasConsumed = true;
    return this.getState();
  }

  // -------- private --------

  private isVisible(choice: Choice): boolean {
    return (choice.showIf ?? []).every((c) => this.evalCondition(c));
  }

  private evalCondition(c: Condition): boolean {
    const v = this.state.points[c.key] ?? 0;
    switch (c.op) {
      case '>=': return v >= c.value;
      case '<=': return v <= c.value;
      case '>': return v > c.value;
      case '<': return v < c.value;
      case '==': return v === c.value;
      case '!=': return v !== c.value;
    }
  }

  // 次の行を1つ消費する。履歴には操作前の画面 before を1件だけ積む。
  private step(before: GameState): AdvanceResult {
    while (true) {
      const line = this.peek();
      if (line) {
        this.pushHistory(before);
        return this.consumeLine(line);
      }
      // 終端: 分岐内 -> 親へ, ルート -> nextへ, なにもない -> シナリオ終了。
      // 選択肢付きの行は読んだ時点でカーソルが進んでいるので、親へ戻るだけでよい。
      if (this.state.progress.branchStack.length > 0) {
        const popped = this.state.progress.branchStack.pop()!;
        if (popped.next) this.jumpToScenario(popped.next);
        continue;
      }
      const nextId = this.registry[this.state.progress.scenarioId]?.next;
      if (!nextId) return { kind: 'end' };
      this.jumpToScenario(nextId);
    }
  }

  private pushHistory(entry: GameState): void {
    if (!this.hasConsumed) {
      this.hasConsumed = true;
      return;
    }
    this.history.push(entry);
  }

  private consumeLine(line: ScenarioLine): AdvanceResult {
    this.state.snapshot = reduceLine(this.state.snapshot, line);
    const transients = (line.commands ?? []).filter(isTransient);
    this.incrementCurrent();
    return { kind: 'line', line, transients };
  }

  private incrementCurrent(): void {
    resolveCursor(this.state.progress, this.registry).frame.lineIndex++;
  }

  private jumpToScenario(id: string): void {
    if (!this.registry[id]) throw new Error(`Unknown scenario: ${id}`);
    this.state.progress = { scenarioId: id, lineIndex: 0, branchStack: [] };
    this.state.rootChapter = id;
  }
}
