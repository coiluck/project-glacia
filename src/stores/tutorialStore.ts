import { create } from 'zustand'
import type { UserRow } from '../api/types'
import type { TutorialStep } from '../features/tutorial/resolve'

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
