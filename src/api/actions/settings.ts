import { apiPost } from '../client'
import { distribute } from '../sync'
import { useSettingsStore } from '../../stores/settingsStore'
import type { CommandResponse, SettingsPayload } from '../types'

// 設定をまとめて保存
export async function saveSettings(): Promise<void> {
  const s = useSettingsStore.getState()
  if (!s.dirty) return

  const payload: SettingsPayload = {
    bgm: s.bgm,
    se: s.se,
    textSpeed: s.textSpeed,
    textSize: s.textSize,
    lang: s.lang,
  }

  const res = await apiPost<CommandResponse<null>>('/settings', payload)
  distribute(res.me) // hydrate で dirty も戻る
}
