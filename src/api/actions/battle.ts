import { apiPost } from '../client'
import { distribute } from '../sync'
import type { CommandResponse } from '../types'
import type { BattleResult, BattleReward } from '../../features/battle/resolveResult'

// 戦闘終了のときに使う
// スタミナの消費・報酬・クリア記録を送る
export async function sendBattleResult(
  stageId: string,
  result: BattleResult,
): Promise<BattleReward> {
  const res = await apiPost<CommandResponse<BattleReward>>('/battle/result', {
    stageId,
    result,
  })
  distribute(res.me)
  return res.result
}
