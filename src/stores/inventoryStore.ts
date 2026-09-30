import { create } from 'zustand'
import type { UserRow } from '../api/types'

// 所持アイテム
export interface InventoryState {
  items: Record<string, number>
  countOf: (itemId: string) => number
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  items: {} as Record<string, number>,
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  ...initial,
  countOf: (itemId) => get().items[itemId] ?? 0,
  hydrate: (row) => set({ items: row.items }),
  reset: () => set(initial),
}))
