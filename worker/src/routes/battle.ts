import type { BattleResult, BattleReward } from '../../../src/features/battle/resolveResult'
import { resolveBattleResult, resolveBattleSkip } from '../../../src/features/battle/resolveResult'
import type { Command } from './types'

// POST /battle/result
export const result: Command<BattleReward> = (me, body, ctx) => {
  const b = body as { stageId: string; result: BattleResult }
  const resolved = resolveBattleResult(me, b.stageId, b.result, ctx.now)
  return { me: resolved.me, result: resolved.reward }
}

// POST /battle/skip
export const skip: Command<BattleReward> = (me, body, ctx) => {
  const b = body as { stageId: string }
  const resolved = resolveBattleSkip(me, b.stageId, ctx.now)
  return { me: resolved.me, result: resolved.reward }
}
