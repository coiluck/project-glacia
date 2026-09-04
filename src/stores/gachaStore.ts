import { create } from 'zustand'
import type { UserRow } from '../api/types'

// 天井
export interface GachaState {
  pity: number
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  pity: 0,
}

export const useGachaStore = create<GachaState>((set) => ({
  ...initial,
  hydrate: (row) => set({ pity: row.pity }),
  reset: () => set(initial),
}))
