import { create } from 'zustand'
import type { UserRow } from '../api/types'

// アカウント情報（ID・ユーザー名）
export interface AccountState {
  id: string | null
  username: string | null
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  id: null,
  username: null,
}

export const useAccountStore = create<AccountState>((set) => ({
  ...initial,
  hydrate: (row) => set({ id: row.id, username: row.username }),
  reset: () => set(initial),
}))
