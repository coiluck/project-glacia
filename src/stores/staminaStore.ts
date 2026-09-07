import { create } from 'zustand'
import type { UserRow } from '../api/types'
import { REGEN_INTERVAL_SECONDS } from '../features/stamina/stamina'

// スタミナ
export interface StaminaState {
  stamina: number
  staminaMax: number // rankに連動する
  staminaRecoveringSeconds: number // +1までの残り秒。満タンなら0
  staminaRecoveringSecondsMax: number // 全回復までの残り秒。満タンなら0
  tick: () => void // 表示を1秒進める
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  stamina: 0,
  staminaMax: 0,
  staminaRecoveringSeconds: 0,
  staminaRecoveringSecondsMax: 0,
}

export const useStaminaStore = create<StaminaState>((set) => ({
  ...initial,
  tick: () =>
    set((s) => {
      if (s.staminaRecoveringSeconds <= 0) return s // 満タン

      const toFull = Math.max(0, s.staminaRecoveringSecondsMax - 1)
      const toNext = s.staminaRecoveringSeconds - 1
      if (toNext > 0) {
        return { staminaRecoveringSeconds: toNext, staminaRecoveringSecondsMax: toFull }
      }

      // 1回復ぶん経った
      const stamina = Math.min(s.staminaMax, s.stamina + 1)
      const full = stamina >= s.staminaMax
      return {
        stamina,
        staminaRecoveringSeconds: full ? 0 : REGEN_INTERVAL_SECONDS,
        staminaRecoveringSecondsMax: full ? 0 : toFull,
      }
    }),
  hydrate: (row) =>
    set({
      stamina: row.stamina,
      staminaMax: row.stamina_max,
      staminaRecoveringSeconds: row.stamina_recovering_seconds,
      staminaRecoveringSecondsMax: row.stamina_recovering_seconds_max,
    }),
  reset: () => set(initial),
}))
