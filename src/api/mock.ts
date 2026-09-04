// バックエンド（worker/）ができるまでの仮
// 状態はメモリに置くだけ
import type { PullOutcome } from '../features/gacha/types'
import { resolvePull } from '../features/gacha/resolve'
import type { BattleResult, BattleReward } from '../features/battle/resolveResult'
import { resolveBattleResult } from '../features/battle/resolveResult'
import { resolveSaveParty } from '../features/characters/resolveParty'
import { expToNextRank } from '../data/rank'
import type { CommandResponse, MeResponse, PartyPayload } from './types'

export const USE_MOCK = import.meta.env.VITE_API_MOCK !== '0'

// D1 の1ユーザーぶんに相当する仮データ
let state: MeResponse = {
  user: {
    id: 'mock-user',
    username: 'ゲスト',
    rank: 1,
    total_exp: 0,
    exp_in_rank: 0,
    exp_to_next: expToNextRank(1),
    stamina: 50,
    stamina_max: 50,
    stamina_recovering_seconds: 0,
    stamina_recovering_seconds_max: 0,
    currency: 1000000,
    gems: 30000,
    pity: 0,
    chapter: 2,
    current_chapter: 1,
    cleared_stage_ids: [],
    tutorial_steps: [],
  },
  characters: [
    {
      masterId: 'lapis',
      level: 15,
      exp: 0,
      limitBreak: 0,
      dupe: 0,
      selectedSkillId: 'lapisFrostBolt',
      skillLevels: { lapisFrostBolt: 2, lapisMendingLight: 1 },
    },
    {
      masterId: 'vermilia',
      level: 10,
      exp: 0,
      limitBreak: 0,
      dupe: 0,
      selectedSkillId: 'vermiliaHeavyCleave',
      skillLevels: {},
    },
  ],
  party: {
    1: ['alma', 'lapis', 'vermilia'],
    2: [],
    3: [],
    4: [],
  },
}

// GET /me
export async function mockMe(): Promise<MeResponse> {
  return structuredClone(state)
}

// POST /gacha/pull
export async function mockPullGacha(count: number): Promise<CommandResponse<PullOutcome[]>> {
  const resolved = resolvePull(state, count)
  state = resolved.me
  return { me: structuredClone(state), result: resolved.pulls }
}

// POST /battle/result
export async function mockBattleResult(
  stageId: string,
  result: BattleResult,
  partySlot: number,
): Promise<CommandResponse<BattleReward>> {
  const resolved = resolveBattleResult(state, stageId, result, partySlot)
  state = resolved.me
  return { me: structuredClone(state), result: resolved.reward }
}

// PUT /party
export async function mockSaveParty(payload: PartyPayload): Promise<CommandResponse<null>> {
  state = resolveSaveParty(state, payload)
  return { me: structuredClone(state), result: null }
}
