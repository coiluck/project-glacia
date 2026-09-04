import { apiPost } from '../client'
import { USE_MOCK, mockPullGacha } from '../mock'
import { distribute } from '../sync'
import type { CommandResponse } from '../types'
import type { PullOutcome } from '../../features/gacha/types'

// 召集を引く。抽選・ジェムの消費・所持キャラへの反映はすべてサーバーが行い、
// 返ってきた状態でストアを更新する
export async function pullGacha(count: number): Promise<PullOutcome[]> {
  const res = USE_MOCK
    ? await mockPullGacha(count)
    : await apiPost<CommandResponse<PullOutcome[]>>('/gacha/pull', { count })
  distribute(res.me)
  return res.result
}
