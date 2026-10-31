import type { MeResponse } from '../../../src/features/contract'
import type { Command } from './types'

export const set: Command<null> = (me, body) => {
  const next = body as MeResponse
  return {
    me: { ...next, now: me.now, user: { ...next.user, id: me.user.id } },
    result: null,
  }
}
