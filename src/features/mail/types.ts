import type { LoginReward } from '../../data/loginBonus'

export type MailReward = LoginReward

// サーバーから届くメール1通。時刻は秒（staminaStore.now と同じ単位）
export interface MailEntry {
  id: string
  from: string
  subject: string
  rewards: MailReward[]
  expiresAt: number
  claimed: boolean
}
