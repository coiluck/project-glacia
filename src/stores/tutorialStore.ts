import { create } from 'zustand'
import type { UserRow } from '../api/types'

// チュートリアルのステップ
export type TutorialStep = 'intro' | 'firstBattle' | 'gacha' | 'base'

// チュートリアル進行（完了済みステップ）
export interface TutorialState {
  completedSteps: TutorialStep[]
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  completedSteps: [] as TutorialStep[],
}

export const useTutorialStore = create<TutorialState>((set) => ({
  ...initial,
  hydrate: (row) => set({ completedSteps: row.tutorial_steps as TutorialStep[] }),
  reset: () => set(initial),
}))
