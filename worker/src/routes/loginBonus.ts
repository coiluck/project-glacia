import type { LoginBonusResult } from '../../../src/features/contract'
import { claimLoginBonus } from '../../../src/features/daily/loginBonus'
import type { Command } from './types'

// POST /login-bonus
export const claim: Command<LoginBonusResult> = (me, _body, ctx) => {
  const claimed = claimLoginBonus(me, ctx.now)
  return { me: claimed.me, result: { count: claimed.count } }
}
