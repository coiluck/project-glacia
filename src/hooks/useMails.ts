import { MAILS } from '../data/mails'
import { useMailStore } from '../stores/mailStore'
import { useStaminaStore } from '../stores/staminaStore'
import { claimableMails } from '../features/mail/mail'
import type { MailEntry } from '../features/mail/types'

// 期限内のメール。受取済みも期限までは残す
export function useMails(): MailEntry[] {
  const claimed = useMailStore((s) => s.base.mail_claimed)
  const now = useStaminaStore((s) => s.now)
  return MAILS.filter((m) => now < m.expiresAt).map((m) => ({ ...m, claimed: claimed.includes(m.id) }))
}

export function useClaimableMailCount(): number {
  const base = useMailStore((s) => s.base)
  const now = useStaminaStore((s) => s.now)
  return claimableMails(base, now).length
}
