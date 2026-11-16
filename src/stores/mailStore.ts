import { create } from 'zustand'
import type { UserRow } from '../features/contract'
import type { MailBase } from '../features/mail/mail'

// メール。届くメールは data/mails.ts にあり、ここには受取済みの id だけを持つ
export interface MailState {
  base: MailBase
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  base: { mail_claimed: [] as string[] },
}

export const useMailStore = create<MailState>((set) => ({
  ...initial,
  hydrate: (row) => set({ base: { mail_claimed: row.mail_claimed } }),
  reset: () => set(initial),
}))
