import type { ExchangePayload } from '../../../src/api/types'
import { buyTokens, claimDaily, trade } from '../../../src/features/exchange/exchange'
import type { Command } from './types'

// POST /exchange
export const run: Command<null> = (me, body, ctx) => {
  const b = body as ExchangePayload

  switch (b.kind) {
    case 'claim':
      return { me: claimDaily(me, ctx.now), result: null }
    case 'buyTokens':
      return { me: buyTokens(me, b.count), result: null }
    case 'trade':
      return { me: trade(me, b.slot, ctx.now), result: null }
    default:
      throw new Error('取引所の種別が不正')
  }
}
