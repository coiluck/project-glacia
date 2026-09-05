import { nowSeconds, readToken, type Context, type Env } from './context'
import { findSessionUserId } from './db/sessions'
import { loadMe, saveMe } from './db/users'
import { error, json } from './http'
import * as auth from './routes/auth'
import * as battle from './routes/battle'
import * as gacha from './routes/gacha'
import * as party from './routes/party'
import type { Command } from './routes/types'

// 状態を変えるルートのmap
const COMMANDS: Record<string, Command<unknown>> = {
  '/gacha/pull': gacha.pull,
  '/battle/result': battle.result,
  '/party': party.save,
}

export async function route(request: Request, env: Env, path: string): Promise<Response> {
  const now = nowSeconds()
  const base = { db: env.DB, now, pepper: env.PASSWORD_PEPPER }

  if (path === '/auth/register' || path === '/auth/login') {
    if (request.method !== 'POST') return error('method not allowed', 405)
    const ctx: Context = { ...base, userId: '' } // まだ誰か分からない
    return path === '/auth/register' ? auth.register(request, ctx) : auth.login(request, ctx)
  }

  // ここから先はセッションが要る
  const token = readToken(request)
  const userId = token && (await findSessionUserId(env.DB, token, now))
  if (!userId || !token) return error('unauthorized', 401)

  const ctx: Context = { ...base, userId }

  if (path === '/auth/logout') {
    if (request.method !== 'POST') return error('method not allowed', 405)
    return auth.logout(token, ctx)
  }

  if (path === '/me') {
    if (request.method !== 'GET') return error('method not allowed', 405)
    return json(await loadMe(ctx))
  }

  const command = COMMANDS[path]
  if (!command) return error(`not found: ${path}`, 404)
  if (request.method !== 'POST') return error('method not allowed', 405)

  const before = await loadMe(ctx)
  const after = command(before, await request.json(), ctx)
  await saveMe(ctx, before, after.me)
  return json({ me: after.me, result: after.result })
}
