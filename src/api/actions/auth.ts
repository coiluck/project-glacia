import { apiPost } from '../client'
import { clearToken, setToken } from '../session'
import { distribute, resetAll } from '../sync'
import type { AuthResult, CommandResponse } from '../types'

async function authenticate(
  path: '/auth/register' | '/auth/login',
  name: string,
  password: string,
): Promise<void> {
  const res = await apiPost<CommandResponse<AuthResult>>(path, { name, password })

  setToken(res.result.token)
  distribute(res.me)
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
