// 戦闘終了時のサーバー側の処理
import type { MeResponse } from '../contract'
import type { MaterialCost } from '../../data/characters/types'
import { dropTables } from '../../data/drops'
import { expToNextRank, staminaMaxFor } from '../../data/rank'
import { chapters, isChapterCleared, isStagePlayable } from '../../data/stages'
import { addItems } from '../inventory/inventory'
import { bumpMission } from '../mission/daily'
import { refreshStamina, spendStamina } from '../stamina/stamina'
import { rollDrops } from './drops'
import { battlePartyFor, replayBattle, type BattleAction } from './replay'

export type BattleResult = 'victory' | 'defeat'

// POST /battle/result のリクエスト
// result はフロントが見た結末。サーバーは actions を再生して確かめ、食い違えば受け付けない
export interface BattleResultPayload {
  stageId: string
  partySlot: number // 出撃した編成の番号（1〜4）。中身はサーバーが保存済みの編成から組み立てる
  result: BattleResult
  actions: BattleAction[]
}

// キャラの経験値は戦闘では入らない（強化でのみ得る）
export interface BattleReward {
  currency: number
  rankExp: number
  drops: MaterialCost[]
}

const NO_REWARD: BattleReward = { currency: 0, rankExp: 0, drops: [] }

const findStage = (stageId: string) =>
  chapters.flatMap((c) => c.stages).find((s) => s.id === stageId)

// 結果の反映。スキップでも通る
function settle(
  me: MeResponse,
  stageId: string,
  result: BattleResult,
  now: number,
): { me: MeResponse; reward: BattleReward } {
  const stage = findStage(stageId)
  if (!stage) throw new Error(`ステージが無い: ${stageId}`)

  const user = bumpMission(spendStamina(me.user, stage.stamina, now), 'staminaSpent', stage.stamina, now)

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
  return { me: { ...me, user: bumpMission(refreshStamina(user, now), 'battleWin', 1, now) }, reward }
}

export function resolveBattleResult(
  me: MeResponse,
  payload: BattleResultPayload,
  now: number,
): { me: MeResponse; reward: BattleReward } {
  const { stageId, partySlot, result, actions } = payload
  // 再生した phase と比べるだけだと、途中の phase（deployment / player）を名乗っても一致してしまう
  if (result !== 'victory' && result !== 'defeat') throw new Error(`結末が不正: ${result}`)
  const { chapter, cleared_stage_ids: clearedIds } = me.user
  if (!isStagePlayable(stageId, chapter, clearedIds)) throw new Error(`挑めないステージ: ${stageId}`)

  // 勝敗は送られた値ではなく、保存済みの編成で操作ログを再生して決める
  const owned = Object.fromEntries(me.characters.map((c) => [c.masterId, c]))
  const party = battlePartyFor(owned, me.party, clearedIds, stageId, partySlot)
  const replayed = replayBattle(stageId, party, actions).phase
  if (replayed !== result) throw new Error(`再生した結末（${replayed}）が送られた結末（${result}）と違う`)

  const settled = settle(me, stageId, result, now)
  if (result === 'defeat') return settled

  // スキップしなかった勝利だけ数える
  const user = bumpMission(settled.me.user, 'battleWinManual', 1, now)
  return { ...settled, me: { ...settled.me, user } }
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
  return settle(me, stageId, 'victory', now)
}
