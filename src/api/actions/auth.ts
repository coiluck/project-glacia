import { apiPost } from '../client'
import { clearToken, setToken } from '../session'
import { distribute, resetAll } from '../sync'
import { saveSettings } from './settings'
import { useSettingsStore } from '../../stores/settingsStore'
import type { AuthResult, CommandResponse } from '../../features/contract'

async function authenticate(
  path: '/auth/register' | '/auth/login',
  name: string,
  password: string,
): Promise<void> {
  // ログイン前の設定変更も保存する
  const { bgm, se, textSpeed, textSize, lang, dirty } = useSettingsStore.getState()
  const res = await apiPost<CommandResponse<AuthResult>>(path, { name, password })

  setToken(res.result.token)
  distribute(res.me)

  if (path === '/auth/register' || dirty) {
    useSettingsStore.getState().set({ bgm, se, textSpeed, textSize, lang })
    await saveSettings().catch(() => undefined)
  }
}

// 新規登録
export const register = (name: string, password: string) =>
  authenticate('/auth/register', name, password)

// ログイン
export const login = (name: string, password: string) =>
  authenticate('/auth/login', name, password)

// ログアウト
export async function logout(): Promise<void> {
  await apiPost('/auth/logout').catch(() => undefined)
  clearToken()
  resetAll()
}
