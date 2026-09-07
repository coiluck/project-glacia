import { apiPost } from '../client'
import { distribute } from '../sync'
import type { CommandResponse } from '../types'
import type { PullOutcome } from '../../features/gacha/types'

// 召喚を引く
// 抽選・ジェムの消費・所持キャラへの反映はすべてサーバーが行う
export async function pullGacha(count: number): Promise<PullOutcome[]> {
  const res = await apiPost<CommandResponse<PullOutcome[]>>('/gacha/pull', { count })
  distribute(res.me)
  return res.result
}
