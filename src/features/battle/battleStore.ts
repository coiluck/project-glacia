// 戦闘の進行状態を持つ zustand ストア。
// エンジン（battle.ts / ai.ts）は純粋関数なので、set で新しい state に差し替えるだけ
import { create } from 'zustand';
import { battleStageRegistry } from '../../data/battleStages';
import { enemyDefs } from '../../data/enemies';
import { unitClasses } from '../../data/unitClasses';
import { actEnemy } from './ai';
import {
  attack,
  castSkill,
  createBattleState,
  deployAlly,
  endTurn,
  moveUnit,
  startBattle,
  undeployAlly,
} from './battle';
import type { Axial } from './hex';
import type { BattleStageData, BattleState, CharacterDef, SkillDef } from './types';

// 敵の行動間の待ち時間（ms）。ユニット移動の transition より少し長くする
const ENEMY_ACT_DELAY = 550;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

interface BattleStore {
  stage: BattleStageData | null;
  state: BattleState | null;
  snapshot: BattleState | null; // 味方ターン開始時点。やり直しはここへ戻す

  init: (stageId: string | undefined) => void;
  deploy: (character: CharacterDef, skill: SkillDef | undefined, pos: Axial) => void;
  undeploy: (unitId: string) => void;
  start: () => void;
  move: (unitId: string, dest: Axial) => void;
  doAttack: (attackerId: string, targetIds: string[]) => void;
  doSkill: (userId: string, aim: Axial) => void;
  undoTurn: () => void;
  endPlayerTurn: () => Promise<void>;
}

export const useBattleStore = create<BattleStore>((set, get) => ({
  stage: null,
  state: null,
  snapshot: null,

  init: (stageId) => {
    const stage = stageId ? battleStageRegistry[stageId] : undefined;
    set({
      stage: stage ?? null,
      state: stage ? createBattleState(stage, enemyDefs) : null,
      snapshot: null,
    });
  },

  deploy: (character, skill, pos) =>
    set((s) => ({ state: deployAlly(s.state!, s.stage!, character, skill, pos) })),

  undeploy: (unitId) => set((s) => ({ state: undeployAlly(s.state!, unitId) })),

  move: (unitId, dest) =>
    set((s) => ({ state: moveUnit(s.state!, s.stage!, unitId, dest) })),

  doAttack: (attackerId, targetIds) =>
    set((s) => ({ state: attack(s.state!, unitClasses, attackerId, targetIds) })),

  doSkill: (userId, aim) => set((s) => ({ state: castSkill(s.state!, s.stage!, userId, aim) })),

  start: () =>
    set((s) => {
      const next = startBattle(s.state!, s.stage!, unitClasses);
      return { state: next, snapshot: next }; // イミュータブルなので参照を持つだけでOK
    }),

  undoTurn: () => {
    const { snapshot, state } = get();
    if (!snapshot || state?.phase !== 'player') return;
    set({ state: snapshot }); // structuredClone不要
  },

  endPlayerTurn: async () => {
    if (get().state?.phase !== 'player') return;
    set((s) => ({ state: endTurn(s.state!, s.stage!, unitClasses) }));

    const enemyIds = get().state!.units.filter((u) => u.side === 'enemy').map((u) => u.id);
    for (const id of enemyIds) {
      const { state } = get(); // 毎回最新を読む
      if (state!.phase !== 'enemy') break;
      if (!state!.units.some((u) => u.id === id)) continue;
      await sleep(ENEMY_ACT_DELAY);
      set((s) => ({ state: actEnemy(s.state!, s.stage!, unitClasses, id) }));
    }

    if (get().state!.phase === 'enemy') {
      await sleep(ENEMY_ACT_DELAY);
      set((s) => {
        const next = endTurn(s.state!, s.stage!, unitClasses);
        return { state: next, snapshot: next };
      });
    }
  },
}));
