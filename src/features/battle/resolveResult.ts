// 戦闘終了時のサーバー側の処理
import type { MeResponse } from '../../api/types'
import type { MaterialCost } from '../../data/characters/types'
import { dropTables } from '../../data/drops'
import { expToNextRank, staminaMaxFor } from '../../data/rank'
import { chapters, isChapterCleared } from '../../data/stages'
import { addItems } from '../inventory/inventory'
import { refreshStamina, spendStamina } from '../stamina/stamina'
import { rollDrops } from './drops'

export type BattleResult = 'victory' | 'defeat'

// キャラの経験値は戦闘では入らない（強化でのみ得る）
export interface BattleReward {
  currency: number
  rankExp: number
  drops: MaterialCost[]
}

const NO_REWARD: BattleReward = { currency: 0, rankExp: 0, drops: [] }

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

  const reward: BattleReward = { ...stage.reward, drops: rollDrops(dropTables[stageId]) }
  user.currency += reward.currency
  user.items = addItems(user.items, reward.drops)

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
    // 章の末尾ステージを全部クリアしたら次の章を解放
    const chapter = chapters.find((c) => c.stages.includes(stage))!
    if (isChapterCleared(chapter, user.cleared_stage_ids)) {
      user.chapter = Math.max(user.chapter, chapter.id + 1)
    }
  }

  // ランクアップでstamina_maxが変わりうるので
  return { me: { ...me, user: refreshStamina(user, now) }, reward }
}

// クリア済みステージの戦闘を省略する
export function resolveBattleSkip(
  me: MeResponse,
  stageId: string,
  now: number,
): { me: MeResponse; reward: BattleReward } {
  if (!me.user.cleared_stage_ids.includes(stageId)) {
    throw new Error(`未クリアのステージはスキップできない: ${stageId}`)
  }
  return resolveBattleResult(me, stageId, 'victory', now)
}
