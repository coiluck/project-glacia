import { create } from 'zustand'
import type { UserRow } from '../api/types'

// スタミナ（staminaMaxはrankに連動する）
export interface StaminaState {
  stamina: number
  staminaMax: number
  staminaRecoveringSeconds: number // スタミナが+1するまでの時間（秒）
  staminaRecoveringSecondsMax: number // スタミナ全回復までの時間（秒）
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  stamina: 50,
  staminaMax: 50,
  staminaRecoveringSeconds: 0,
  staminaRecoveringSecondsMax: 0,
}

export const useStaminaStore = create<StaminaState>((set) => ({
  ...initial,
  hydrate: (row) =>
    set({
      stamina: row.stamina,
      staminaMax: row.stamina_max,
      staminaRecoveringSeconds: row.stamina_recovering_seconds,
      staminaRecoveringSecondsMax: row.stamina_recovering_seconds_max,
    }),
  reset: () => set(initial),
}))
