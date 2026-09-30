import { apiPost } from '../client'
import { distribute } from '../sync'
import type { CommandResponse, ExchangePayload } from '../types'

// 取引所（受取・紙幣で購入・交換）。結果は全状態の hydrate で反映される
export async function exchange(payload: ExchangePayload): Promise<void> {
  const res = await apiPost<CommandResponse<null>>('/exchange', payload)
  distribute(res.me)
}
