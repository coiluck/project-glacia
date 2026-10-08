import type { MailEntry } from './types'

const EMPTY: MailEntry[] = []

// メールはまだサーバー側が無いので常に空。
// 届くようになったら MeResponse から hydrate する mailStore に差し替える
export function useMails(): MailEntry[] {
  return EMPTY
}

export function useClaimableMailCount(): number {
  return useMails().filter((m) => !m.claimed).length
}
