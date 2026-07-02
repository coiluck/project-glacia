import { create } from 'zustand'
import type { UserRow } from '../api/types'

// シナリオ進行（現在の章・クリア済みステージ）
export interface ProgressState {
  currentChapter: number
  clearedStageIds: string[]
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  currentChapter: 1,
  clearedStageIds: [] as string[],
}

export const useProgressStore = create<ProgressState>((set) => ({
  ...initial,
  setCurrentChapter: (chapter: number) => set({ currentChapter: chapter }), // これのみcurrentChapterをフロント側で変更できるようにする
  hydrate: (row) => set({ currentChapter: row.current_chapter, clearedStageIds: row.cleared_stage_ids }),
  reset: () => set(initial),
}))
