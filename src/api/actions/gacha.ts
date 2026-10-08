import { apiPost } from '../client'
import { distribute } from '../sync'
import type { CommandResponse } from '../types'
import type { BannerId } from '../../data/gacha'
import type { PullOutcome } from '../../features/gacha/types'

// 召喚を引く
// 抽選・ジェムの消費・所持キャラへの反映はすべてサーバーが行う
export async function pullGacha(count: number, banner: BannerId): Promise<PullOutcome[]> {
  const res = await apiPost<CommandResponse<PullOutcome[]>>('/gacha/pull', { count, banner })
  distribute(res.me)
  return res.result
}

// 交換ptで★3を1体受け取る
export async function exchangeCeiling(masterId: string): Promise<PullOutcome> {
  const res = await apiPost<CommandResponse<PullOutcome>>('/gacha/exchange', { masterId })
  distribute(res.me)
  return res.result
}
