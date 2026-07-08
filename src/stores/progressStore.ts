import { create } from 'zustand'
import type { UserRow } from '../api/types'
import type { GameState } from '../features/scenario/types'

// シナリオ進行（現在の章・クリア済みステージ・進行中シナリオ）
export interface ProgressState {
  currentChapter: number
  clearedStageIds: string[]
  // 進行中シナリオのセーブ（スロット無しの単一データ）。
  // 進行中のみ保持し、終わったら null に戻す（復元不可にする）。
  scenarioId: string | null
  scenarioState: GameState | null
  saveScenario: (id: string, state: GameState) => void
  clearScenario: () => void
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  currentChapter: 1,
  clearedStageIds: [] as string[],
  scenarioId: null as string | null,
  scenarioState: null as GameState | null,
}

export const useProgressStore = create<ProgressState>((set) => ({
  ...initial,
  setCurrentChapter: (chapter: number) => set({ currentChapter: chapter }), // これのみcurrentChapterをフロント側で変更できるようにする
  saveScenario: (id, state) => set({ scenarioId: id, scenarioState: state }),
  clearScenario: () => set({ scenarioId: null, scenarioState: null }),
  hydrate: (row) => set({ currentChapter: row.current_chapter, clearedStageIds: row.cleared_stage_ids }),
  reset: () => set(initial),
}))
