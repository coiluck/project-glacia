import type { MeResponse, UserRow } from '../contract'
import { MAILS, type MailDef } from '../../data/mails'
import { grant } from '../daily/loginBonus'

// メールの判定に要る値
export type MailBase = Pick<UserRow, 'mail_claimed'>

// まだ受け取っておらず、期限も切れていないメール
export function claimableMails(base: MailBase, now: number): MailDef[] {
  return MAILS.filter((m) => !base.mail_claimed.includes(m.id) && now < m.expiresAt)
}

// メールを1通受け取る
export function claimMail(me: MeResponse, id: string, now: number): MeResponse {
  const mail = MAILS.find((m) => m.id === id)
  if (!mail) throw new Error(`メールが無い: ${id}`)
  if (me.user.mail_claimed.includes(id)) throw new Error('受取済み')
  if (now >= mail.expiresAt) throw new Error('期限切れ')

  const user = mail.rewards.reduce(grant, {
    ...me.user,
    mail_claimed: [...me.user.mail_claimed, id],
  })
  return { ...me, user }
}

// 受け取れるメールをまとめて受け取る
export function claimAllMails(me: MeResponse, now: number): MeResponse {
  const mails = claimableMails(me.user, now)
  if (mails.length === 0) throw new Error('受け取れるメールが無い')
  return mails.reduce((next, m) => claimMail(next, m.id, now), me)
}
