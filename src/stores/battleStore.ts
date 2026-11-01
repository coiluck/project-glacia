// 戦闘の進行状態を持つ zustand ストア。
// エンジン（battle.ts / ai.ts）は純粋関数なので、set で新しい state に差し替えるだけ
import { create } from 'zustand';
import { battleStageRegistry } from '../data/battleStages';
import { enemyDefs } from '../data/enemies';
import { unitClasses } from '../data/unitClasses';
import { enemyPhaseSteps } from '../features/battle/ai';
import {
  attack,
  castSkill,
  createBattleState,
  deployAlly,
  moveUnit,
  startBattle,
  undeployAlly,
} from '../features/battle/battle';
import type { Axial } from '../features/battle/hex';
import type { BattleAction } from '../features/battle/replay';
import type { BattleStageData, BattleState, CharacterDef, SkillDef } from '../features/battle/types';

// 敵の行動間の待ち時間（ms）。ユニット移動の transition より少し長くする
const ENEMY_ACT_DELAY = 550;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

interface BattleStore {
  stage: BattleStageData | null;
  state: BattleState | null;
  snapshot: BattleState | null; // 味方ターン開始時点。やり直しはここへ戻す
  log: BattleAction[]; // 決着したら /battle/result に送る操作ログ。サーバーが再生して勝敗を確かめる
  snapshotLogLength: number; // snapshot の時点の log の長さ。やり直しはここまで切り詰める

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
  log: [],
  snapshotLogLength: 0,

  init: (stageId) => {
    const stage = stageId ? battleStageRegistry[stageId] : undefined;
    set({
      stage: stage ?? null,
      state: stage ? createBattleState(stage, enemyDefs) : null,
      snapshot: null,
      log: [],
      snapshotLogLength: 0,
    });
  },

  // エンジンが throw したら set されないので、通った操作だけがログに残る
  deploy: (character, skill, pos) =>
    set((s) => ({
      state: deployAlly(s.state!, s.stage!, character, skill, pos),
      log: [...s.log, { type: 'deploy', charId: character.id, pos }],
    })),

  undeploy: (unitId) =>
    set((s) => ({ state: undeployAlly(s.state!, unitId), log: [...s.log, { type: 'undeploy', unitId }] })),

  move: (unitId, dest) =>
    set((s) => ({
      state: moveUnit(s.state!, s.stage!, unitId, dest),
      log: [...s.log, { type: 'move', unitId, to: dest }],
    })),

  doAttack: (attackerId, targetIds) =>
    set((s) => ({
      state: attack(s.state!, unitClasses, attackerId, targetIds),
      log: [...s.log, { type: 'attack', attackerId, targetIds }],
    })),

  doSkill: (userId, aim) =>
    set((s) => ({
      state: castSkill(s.state!, s.stage!, userId, aim),
      log: [...s.log, { type: 'skill', userId, aim }],
    })),

  start: () =>
    set((s) => {
      const next = startBattle(s.state!, s.stage!, unitClasses);
      const log: BattleAction[] = [...s.log, { type: 'start' }];
      // イミュータブルなので参照を持つだけでOK
      return { state: next, snapshot: next, log, snapshotLogLength: log.length };
    }),

  undoTurn: () => {
    const { snapshot, state, log, snapshotLogLength } = get();
    if (!snapshot || state?.phase !== 'player') return;
    set({ state: snapshot, log: log.slice(0, snapshotLogLength) }); // structuredClone不要
  },

  // 敵の行動順は enemyPhaseSteps が決める。ここは1手ごとに間を置いて見せるだけ
  endPlayerTurn: async () => {
    const { state, stage } = get();
    if (state?.phase !== 'player') return;
    set((s) => ({ log: [...s.log, { type: 'endTurn' }] }));

    let shown: BattleState | null = null;
    for (const next of enemyPhaseSteps(state, stage!, unitClasses)) {
      if (shown) {
        await sleep(ENEMY_ACT_DELAY);
        if (get().state !== shown) return; // 待っている間に戦闘が作り直された
      }
      set(
        next.phase === 'player'
          ? { state: next, snapshot: next, snapshotLogLength: get().log.length }
          : { state: next },
      );
      shown = next;
    }
  },
}));
