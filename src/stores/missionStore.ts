import { create } from 'zustand'
import type { UserRow } from '../api/types'
import type { DailyMissionBase } from '../features/mission/daily'

// 任務
export interface MissionState {
  base: DailyMissionBase
  done: string[] // 受け取った永続任務の id
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  base: {
    mission_day: 0,
    mission_counts: {},
    mission_claimed: [] as number[],
  },
  done: [] as string[],
}

export const useMissionStore = create<MissionState>((set) => ({
  ...initial,
  hydrate: (row) =>
    set({
      base: {
        mission_day: row.mission_day,
        mission_counts: row.mission_counts,
        mission_claimed: row.mission_claimed,
      },
      done: row.mission_done,
    }),
  reset: () => set(initial),
}))
