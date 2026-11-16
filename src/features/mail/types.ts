import type { LoginReward } from '../../data/loginBonus'
import type { MailDef } from '../../data/mails'

export type MailReward = LoginReward

// 画面に出すメール1通。差出人・件名・本文は i18n の mail.json（`<id>.from` など）
export interface MailEntry extends MailDef {
  claimed: boolean
}
