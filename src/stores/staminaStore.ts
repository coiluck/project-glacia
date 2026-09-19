import { create } from 'zustand'
import type { MeResponse } from '../api/types'
import { currentStamina, type StaminaBase } from '../features/stamina/stamina'

const nowSeconds = () => Math.floor(Date.now() / 1000)

// スタミナ
export interface StaminaState {
  base: StaminaBase
  now: number // サーバー時刻に揃えた現在のUnix秒
  offset: number // サーバー時刻 - 端末時刻。端末の時計がずれていてもサーバー基準で表示する
  tick: () => void // now を進める。飛んだ分は次の1回で追いつく
  hydrate: (me: MeResponse) => void
  reset: () => void
}

const initial = {
  base: { stamina: 0, stamina_max: 0, stamina_updated_at: 0 },
  now: 0,
  offset: 0,
}

export const useStaminaStore = create<StaminaState>((set) => ({
  ...initial,
  tick: () => set((s) => ({ now: nowSeconds() + s.offset })),
  hydrate: ({ user, now }) =>
    set({
      base: {
        stamina: user.stamina,
        stamina_max: user.stamina_max,
        stamina_updated_at: user.stamina_updated_at,
      },
      now,
      offset: now - nowSeconds(),
    }),
  reset: () => set(initial),
}))

export const selectStamina = (s: StaminaState) => currentStamina(s.base, s.now)
