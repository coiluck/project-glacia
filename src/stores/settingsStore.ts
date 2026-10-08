import { create } from 'zustand'
import type { UserRow } from '../api/types'
import type { Lang, TextSize, TextSpeed } from '../data/settings'

export interface SettingsState {
  bgm: number // 0〜100
  se: number // 0〜100
  textSpeed: TextSpeed
  textSize: TextSize
  lang: Lang
  dirty: boolean // 未保存の変更があるか
  set: (patch: Partial<Pick<SettingsState, 'bgm' | 'se' | 'textSpeed' | 'textSize' | 'lang'>>) => void
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  bgm: 80,
  se: 80,
  textSpeed: 'normal' as TextSpeed,
  textSize: 'normal' as TextSize,
  lang: 'ja' as Lang,
  dirty: false,
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ...initial,
  set: (patch) => set({ ...patch, dirty: true }),
  hydrate: (row) =>
    set({
      bgm: row.settings_bgm,
      se: row.settings_se,
      textSpeed: row.settings_text_speed,
      textSize: row.settings_text_size,
      lang: row.settings_lang,
      dirty: false,
    }),
  reset: () => set(initial),
}))
