// 戦闘の操作ログと、その再生
// フロントは操作を記録して /battle/result に送り、サーバーは同じ編成・同じステージで再生して勝敗を確かめる。
// エンジンは乱数も時刻も使わないので、同じ操作からは同じ結末になる
import { battleGuideRegistry } from '../../data/battleGuides';
import { battleStageRegistry } from '../../data/battleStages';
import type { UserCharacter } from '../../data/characters/types';
import { enemyDefs } from '../../data/enemies';
import { unitClasses } from '../../data/unitClasses';
import { buildParty, type PartyMember } from '../characters/build';
import { enemyPhaseSteps } from './ai';
import {
  attack,
  castSkill,
  createBattleState,
  deployAlly,
  moveUnit,
  startBattle,
  undeployAlly,
  unitById,
} from './battle';
import type { Axial } from './hex';
import type { BattleStageData, BattleState } from './types';

// 味方の操作1つ。敵の手番は endTurn の中でサーバーも同じ AI で動かすので記録しない
// やり直しはログを手番の開始時点まで切り詰めるだけなので、操作としては残らない
export type BattleAction =
  | { type: 'deploy'; charId: string; pos: Axial }
  | { type: 'undeploy'; unitId: string }
  | { type: 'start' }
  | { type: 'move'; unitId: string; to: Axial }
  | { type: 'attack'; attackerId: string; targetIds: string[] }
  | { type: 'skill'; userId: string; aim: Axial }
  | { type: 'endTurn' };

// 再生する長さの上限。巨大なログで CPU を使わせないため
export const MAX_ACTIONS = 1000;
export const MAX_TURNS = 100;

// 出撃する編成。チュートリアルのあるステージは、未クリアのうちはガイドの編成で戦う
export function battlePartyFor(
  owned: Record<string, UserCharacter>,
  party: Record<number, string[]>,
  clearedIds: string[],
  stageId: string,
  partySlot: number,
): PartyMember[] {
  const guide = battleGuideRegistry[stageId];
  if (guide && !clearedIds.includes(stageId)) {
    const guideOwned = Object.fromEntries(guide.party.map((c) => [c.masterId, c]));
    return buildParty(guideOwned, guide.party.map((c) => c.masterId));
  }
  return buildParty(owned, party[partySlot] ?? []);
}

const isId = (v: unknown): v is string => typeof v === 'string';

function toAxial(v: unknown): Axial | null {
  if (typeof v !== 'object' || v === null) return null;
  const { q, r } = v as Record<string, unknown>;
  return Number.isInteger(q) && Number.isInteger(r) ? { q: q as number, r: r as number } : null;
}

// 送られてきた操作1つを、余計な項目を落とした形に直す。形が違えば null
function toAction(raw: unknown): BattleAction | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const a = raw as Record<string, unknown>;
  switch (a.type) {
    case 'deploy': {
      const pos = toAxial(a.pos);
      return isId(a.charId) && pos ? { type: 'deploy', charId: a.charId, pos } : null;
    }
    case 'undeploy':
      return isId(a.unitId) ? { type: 'undeploy', unitId: a.unitId } : null;
    case 'start':
    case 'endTurn':
      return { type: a.type };
    case 'move': {
      const to = toAxial(a.to);
      return isId(a.unitId) && to ? { type: 'move', unitId: a.unitId, to } : null;
    }
    case 'attack':
      return isId(a.attackerId) && Array.isArray(a.targetIds) && a.targetIds.every(isId)
        ? { type: 'attack', attackerId: a.attackerId, targetIds: a.targetIds }
        : null;
    case 'skill': {
      const aim = toAxial(a.aim);
      return isId(a.userId) && aim ? { type: 'skill', userId: a.userId, aim } : null;
    }
    default:
      return null;
  }
}

// リクエストの body から操作ログを取り出す。形が違えば throw
export function readActions(raw: unknown): BattleAction[] {
  if (!Array.isArray(raw)) throw new Error('操作ログが配列でない');
  if (raw.length > MAX_ACTIONS) throw new Error(`操作ログが長すぎる: ${raw.length}`);
  return raw.map((r, i) => {
    const action = toAction(r);
    if (!action) throw new Error(`操作ログの${i}番目が不正`);
    return action;
  });
}

// 操作ログを頭から再生した最後の状態を返す。ルールに反する操作があれば throw
export function replayBattle(
  stageId: string,
  party: PartyMember[],
  actions: BattleAction[],
): BattleState {
  const stage = battleStageRegistry[stageId];
  if (!stage) throw new Error(`戦闘マップが無い: ${stageId}`);
  let state = createBattleState(stage, enemyDefs);
  for (const action of actions) {
    if (state.phase === 'victory' || state.phase === 'defeat') {
      throw new Error('決着のあとに操作がある');
    }
    state = apply(state, stage, party, action);
    if (state.turn > MAX_TURNS) throw new Error(`ターン数が多すぎる: ${state.turn}`);
  }
  return state;
}

function apply(
  state: BattleState,
  stage: BattleStageData,
  party: PartyMember[],
  action: BattleAction,
): BattleState {
  switch (action.type) {
    case 'deploy': {
      const member = party.find((m) => m.character.id === action.charId);
      if (!member) throw new Error(`編成にいない: ${action.charId}`);
      return deployAlly(state, stage, member.character, member.skill, action.pos);
    }
    case 'undeploy':
      return undeployAlly(state, action.unitId);
    case 'start':
      return startBattle(state, stage, unitClasses);
    case 'move':
      return moveUnit(state, stage, ownUnit(state, action.unitId), action.to);
    case 'attack':
      return attack(state, unitClasses, ownUnit(state, action.attackerId), action.targetIds);
    case 'skill':
      return castSkill(state, stage, ownUnit(state, action.userId), action.aim);
    case 'endTurn': {
      if (state.phase !== 'player') throw new Error(`味方の手番でない: ${state.phase}`);
      let next = state;
      for (const step of enemyPhaseSteps(state, stage, unitClasses)) next = step;
      return next;
    }
  }
}

// 味方の手番に味方を動かす操作だけを通す。エンジンの move / attack / castSkill は手番も陣営も見ない
function ownUnit(state: BattleState, unitId: string): string {
  if (state.phase !== 'player') throw new Error(`味方の手番でない: ${state.phase}`);
  if (unitById(state, unitId).side !== 'ally') throw new Error(`味方でない: ${unitId}`);
  return unitId;
}
