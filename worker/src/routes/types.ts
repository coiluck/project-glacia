import type { MeResponse } from '../../../src/api/types'
import type { Context } from '../context'

// 読む -> resolve -> 保存 -> 全状態を返すを共通化
export type Command<T> = (
  me: MeResponse,
  body: unknown,
  ctx: Context,
) => { me: MeResponse; result: T }
