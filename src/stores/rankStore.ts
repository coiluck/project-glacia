import { create } from 'zustand'
import type { UserRow } from '../api/types'

// プレイヤーランク・経験値
export interface RankState {
  rank: number
  totalExp: number
  expInRank: number
  expToNext: number
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  rank: 1,
  totalExp: 0,
  expInRank: 0,
  expToNext: 0,
}

export const useRankStore = create<RankState>((set) => ({
  ...initial,
  hydrate: (row) => set({ rank: row.rank, totalExp: row.total_exp, expInRank: row.exp_in_rank, expToNext: row.exp_to_next }),
  reset: () => set(initial),
}))
