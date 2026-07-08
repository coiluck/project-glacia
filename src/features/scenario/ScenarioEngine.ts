import type {
  GameState, ScenarioLine, TransientCommand, ScenarioFile, BranchFrame, Choice, Condition,
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
  // 最初の消費/選択までは push をスキップする。
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

  // showIf を満たす選択肢だけ返す (UIに見せる一覧)。
  getChoices(choiceId: string): Choice[] {
    const top = this.state.progress.branchStack[this.state.progress.branchStack.length - 1];
    const scenarioId = top?.scenarioId ?? this.state.progress.scenarioId;
    const all = this.registry[scenarioId]?.choices?.[choiceId] ?? [];
    return all.filter((c) => this.isVisible(c));
  }

  // 1ステップ進める
  advance(): AdvanceResult {
    while (true) {
      const line = this.peek();
      if (line) {
        if (line.choiceId) return { kind: 'choice', choiceId: line.choiceId };
        return this.consumeLine(line);
      }
      // 終端: 分岐内 -> 親へ, ルート -> nextへ, なにもない -> シナリオ終了。
      if (this.state.progress.branchStack.length > 0) {
        const popped = this.state.progress.branchStack.pop()!;
        if (popped.next) {
          this.jumpToScenario(popped.next);
        } else {
          this.incrementCurrent();
        }
        continue;
      }
      const nextId = this.registry[this.state.progress.scenarioId]?.next;
      if (!nextId) return { kind: 'end' };
      this.jumpToScenario(nextId);
    }
  }

  // 選択肢を選ぶ。visibleIndex は getChoices が返した (絞り込み後の) 一覧の位置。
  selectChoice(choiceId: string, visibleIndex: number): void {
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
    this.pushHistory();
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

  private pushHistory(): void {
    if (!this.hasConsumed) {
      this.hasConsumed = true;
      return;
    }
    this.history.push(structuredClone(this.state));
  }

  private consumeLine(line: ScenarioLine): AdvanceResult {
    this.pushHistory();
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
