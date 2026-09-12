// 戦闘終了時のサーバー側の処理
import type { MeResponse } from '../../api/types'
import { expToNextRank, staminaMaxFor } from '../../data/rank'
import { chapters } from '../../data/stages'
import { refreshStamina, spendStamina } from '../stamina/stamina'

export type BattleResult = 'victory' | 'defeat'

// キャラの経験値は戦闘では入らない（強化でのみ得る）
export interface BattleReward {
  currency: number
  rankExp: number
}

const NO_REWARD: BattleReward = { currency: 0, rankExp: 0 }

const findStage = (stageId: string) =>
  chapters.flatMap((c) => c.stages).find((s) => s.id === stageId)

export function resolveBattleResult(
  me: MeResponse,
  stageId: string,
  result: BattleResult,
  now: number,
): { me: MeResponse; reward: BattleReward } {
  const stage = findStage(stageId)
  if (!stage) throw new Error(`ステージが無い: ${stageId}`)

  const user = spendStamina(me.user, stage.stamina, now)

  // 負けたらスタミナだけ引く
  if (result === 'defeat') return { me: { ...me, user }, reward: NO_REWARD }

  const reward = stage.reward
  user.currency += reward.currency

  // ランク経験値
  user.total_exp += reward.rankExp
  let expInRank = user.exp_in_rank + reward.rankExp
  for (;;) {
    const need = expToNextRank(user.rank)
    if (need === 0 || expInRank < need) break
    expInRank -= need
    user.rank += 1
  }
  user.exp_in_rank = expInRank
  user.exp_to_next = expToNextRank(user.rank)
  user.stamina_max = staminaMaxFor(user.rank)

  if (!user.cleared_stage_ids.includes(stageId)) {
    user.cleared_stage_ids = [...user.cleared_stage_ids, stageId]
  }

  // ランクアップでstamina_maxが変わりうるので
  return { me: { ...me, user: refreshStamina(user, now) }, reward }
}
