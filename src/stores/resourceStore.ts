import { create } from 'zustand'
import type { UserRow } from '../api/types'

// リソース（通貨・ジェムの残高）
export interface ResourceState {
  currency: number
  gems: number
  addCurrency: (amount: number) => void
  spendGems: (amount: number) => void // 足りるかどうかは呼び出し側で確かめる
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  currency: 1000000,
  gems: 30000, // TODO: 仮の残高。召集を試せるだけ持たせている
}

export const useResourceStore = create<ResourceState>((set) => ({
  ...initial,
  addCurrency: (amount) => set((s) => ({ currency: s.currency + amount })),
  spendGems: (amount) => set((s) => ({ gems: s.gems - amount })),
  hydrate: (row) =>
    set({
      currency: row.currency,
      gems: row.gems,
    }),
  reset: () => set(initial),
}))
