import { apiPost } from '../client'
import { distribute } from '../sync'
import type { CommandResponse } from '../../features/contract'
import type { BattleResultPayload, BattleReward } from '../../features/battle/resolveResult'

// 戦闘終了のときに使う
// 操作ログを送り、サーバーが再生して確かめた勝敗でスタミナの消費・報酬・クリア記録が決まる
export async function sendBattleResult(payload: BattleResultPayload): Promise<BattleReward> {
  const res = await apiPost<CommandResponse<BattleReward>>('/battle/result', payload)
  distribute(res.me)
  return res.result
}

// クリア済み戦闘を省略したときに使う
export async function sendBattleSkip(stageId: string): Promise<BattleReward> {
  const res = await apiPost<CommandResponse<BattleReward>>('/battle/skip', { stageId })
  distribute(res.me)
  return res.result
}
