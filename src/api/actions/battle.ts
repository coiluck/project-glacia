import { apiPost } from '../client'
import { USE_MOCK, mockBattleResult } from '../mock'
import { distribute } from '../sync'
import type { CommandResponse } from '../types'
import type { BattleResult, BattleReward } from '../../features/battle/resolveResult'

// 戦闘終了。スタミナの消費・報酬・クリア記録を1回でまとめて送る。
// 戦闘中は通信しないので、中断すればスタミナは減らない
export async function sendBattleResult(
  stageId: string,
  result: BattleResult,
  partySlot: number,
): Promise<BattleReward> {
  const res = USE_MOCK
    ? await mockBattleResult(stageId, result, partySlot)
    : await apiPost<CommandResponse<BattleReward>>('/battle/result', {
        stageId,
        result,
        partySlot,
      })
  distribute(res.me)
  return res.result
}
