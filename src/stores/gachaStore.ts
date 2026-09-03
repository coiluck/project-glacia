import { create } from 'zustand'

// 天井
export interface GachaState {
  pity: number
  setPity: (pity: number) => void
  reset: () => void
}

const initial = {
  pity: 0,
}

export const useGachaStore = create<GachaState>((set) => ({
  ...initial,
  setPity: (pity) => set({ pity }),
  reset: () => set(initial),
}))
