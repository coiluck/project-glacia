import type { MailPayload } from '../../../src/features/contract'
import { claimAllMails, claimMail } from '../../../src/features/mail/mail'
import type { Command } from './types'

// POST /mail
export const claim: Command<null> = (me, body, ctx) => {
  const b = body as MailPayload

  switch (b.kind) {
    case 'claim':
      return { me: claimMail(me, b.id, ctx.now), result: null }
    case 'claimAll':
      return { me: claimAllMails(me, ctx.now), result: null }
    default:
      throw new Error('メールの種別が不正')
  }
}
