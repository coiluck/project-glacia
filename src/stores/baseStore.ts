import { create } from 'zustand'
import type { UserRow } from '../api/types'
import type { BaseRow } from '../features/base/board'
import type { BaseBuilding } from '../features/base/types'

// 基地
export interface BaseState {
  base: BaseRow
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  base: {
    base_board: {} as Record<string, BaseBuilding>,
    base_members: {} as Record<string, string>,
    base_tower_level: 1,
    base_collected_at: 0,
  },
}

export const useBaseStore = create<BaseState>((set) => ({
  ...initial,
  hydrate: (row) =>
    set({
      base: {
        base_board: row.base_board,
        base_members: row.base_members,
        base_tower_level: row.base_tower_level,
        base_collected_at: row.base_collected_at,
      },
    }),
  reset: () => set(initial),
}))
