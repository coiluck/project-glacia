// 戦闘終了時のサーバー側の処理
import type { MeResponse } from '../../api/types'
import { characterMasters } from '../../data/characters'
import { expToNextRank, staminaMaxFor } from '../../data/rank'
import { chapters } from '../../data/stages'
import { gainExp } from '../characters/growth'
import { refreshStamina, spendStamina } from '../stamina/stamina'

export type BattleResult = 'victory' | 'defeat'

export interface BattleReward {
  currency: number
  rankExp: number
  characterExp: number
}

const NO_REWARD: BattleReward = { currency: 0, rankExp: 0, characterExp: 0 }

const findStage = (stageId: string) =>
  chapters.flatMap((c) => c.stages).find((s) => s.id === stageId)

export function resolveBattleResult(
  me: MeResponse,
  stageId: string,
  result: BattleResult,
  partySlot: number,
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

  // 出撃した編成のメンバーに経験値
  const deployed = new Set(me.party[partySlot] ?? [])
  const characters = me.characters.map((c) =>
    deployed.has(c.masterId) ? gainExp(characterMasters[c.masterId], c, reward.characterExp) : c,
  )

  // ランクアップでstamina_maxが変わりうるので
  return { me: { ...me, user: refreshStamina(user, now), characters }, reward }
}
