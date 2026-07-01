import { create } from 'zustand'
import type { UserRow } from '../api/types'

// リソース（通貨・ジェムの残高）
export interface ResourceState {
  currency: number
  gems: number
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  currency: 1000000,
  gems: 1000,
}

export const useResourceStore = create<ResourceState>((set) => ({
  ...initial,
  hydrate: (row) =>
    set({
      currency: row.currency,
      gems: row.gems,
    }),
  reset: () => set(initial),
}))
