import { create } from 'zustand'
import type { UserRow } from '../api/types'
import type { LoginBase } from '../features/daily/loginBonus'

// ログインボーナス
export interface LoginBonusState {
  base: LoginBase
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  base: {
    login_claimed_day: 0,
    login_count: 0,
  },
}

export const useLoginBonusStore = create<LoginBonusState>((set) => ({
  ...initial,
  hydrate: (row) =>
    set({
      base: {
        login_claimed_day: row.login_claimed_day,
        login_count: row.login_count,
      },
    }),
  reset: () => set(initial),
}))
