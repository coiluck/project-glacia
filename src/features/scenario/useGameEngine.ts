import { ScenarioEngine, type AdvanceResult } from './ScenarioEngine';
import { executeTransients } from './CommandExecutor';
import { scenarioRegistry } from '../../data/scenarios';
import { useGameStore } from './gameStore';
import type { Choice, GameState } from './types';

// エンジンと「初回advance済みフラグ」は
// /game ↔ /settings 等のナビゲーション越しに保つためモジュールスコープで持つ。
let sharedEngine: ScenarioEngine | null = null;
let started = false;

export const createInitialState = (scenarioId: string): GameState => ({
  progress: { scenarioId, lineIndex: 0, branchStack: [] },
  snapshot: {
    background: null,
    characters: [],
    text: '',
    speaker: '',
    faceId: null,
  },
  rootChapter: scenarioId,
  points: {},
  version: 2,
});

export function resetGameEngine(initial: GameState): void {
  sharedEngine = new ScenarioEngine(initial, scenarioRegistry);
  started = false;
  useGameStore.getState().reset();
  useGameStore.getState().setSnapshot(initial.snapshot);
}

export function useGameEngine(initial: GameState) {
  if (!sharedEngine) {
    sharedEngine = new ScenarioEngine(initial, scenarioRegistry);
  }
  const engine = sharedEngine;

  const setSnapshot = useGameStore((s) => s.setSnapshot);
  const fireMotion = useGameStore((s) => s.fireMotion);
  const fireBounce = useGameStore((s) => s.fireBounce);
  const setPendingChoice = useGameStore((s) => s.setPendingChoice);

  const syncFromState = () => {
    setSnapshot(engine.getState().snapshot);
  };

  const advance = async (): Promise<AdvanceResult> => {
    const result = engine.advance();
    if (result.kind === 'line') {
      syncFromState();
      // @char に bounce フラグが付いた立ち絵をはねさせる（話している演出）。
      for (const cmd of result.line.commands ?? []) {
        if (cmd.type === 'char' && cmd.bounce) fireBounce(cmd.id);
      }
      await executeTransients(result.transients, {
        bgMotion: (cmd) => fireMotion({ direction: cmd.direction, duration: cmd.duration }),
        bgShake: () => { /* TODO */ },
        showNextChapter: async () => { /* TODO */ },
      });
    } else if (result.kind === 'choice') {
      setPendingChoice({
        choiceId: result.choiceId,
        choices: engine.getChoices(result.choiceId),
      });
    }
    return result;
  };

  /** 既に開始済みなら何もしない。/game に再入したときに先頭から advance しないため。 */
  const start = async () => {
    if (started) {
      syncFromState();
      return;
    }
    started = true;
    await advance();
  };

  const goBack = (): boolean => {
    if (!engine.goBack()) return false;
    setPendingChoice(null);
    syncFromState();
    return true;
  };

  const selectChoice = async (choiceId: string, choiceIndex: number): Promise<AdvanceResult> => {
    engine.selectChoice(choiceId, choiceIndex);
    setPendingChoice(null);
    return advance();
  };

  const restore = (saved: GameState) => {
    engine.restore(saved);
    // ロード後に /game で再度 advance されないよう開始済みにする。
    started = true;
    setPendingChoice(null);
    syncFromState();
  };

  return {
    start,
    advance,
    goBack,
    selectChoice,
    restore,
    getChoices: (id: string): Choice[] => engine.getChoices(id),
    getState: () => engine.getState(),
    getHistorySnapshots: () => engine.getHistorySnapshots(),
  };
}
