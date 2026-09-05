import type { AuthResult } from '../../../src/api/types'
import {
  equalsConstantTime,
  hashPassword,
  randomHex,
  validateCredentials,
} from '../../../src/features/auth/auth'
import type { Context } from '../context'
import { createSession, deleteSession } from '../db/sessions'
import { createUser, findCredentials, loadMe } from '../db/users'
import { error, json } from '../http'

interface Credentials {
  name: string
  password: string
}

const REJECT = 'ユーザー名またはパスワードが違います'

// ログイン成功時のレスポンス
async function issue(ctx: Context, userId: string): Promise<Response> {
  const token = await createSession(ctx.db, userId, ctx.now)
  const me = await loadMe({ ...ctx, userId })
  return json({ me, result: { token } satisfies AuthResult })
}

// POST /auth/register
export async function register(request: Request, ctx: Context): Promise<Response> {
  const { name, password } = (await request.json()) as Credentials
  validateCredentials(name, password)

  const salt = randomHex(16)
  const id = crypto.randomUUID()
  const passwordHash = await hashPassword(password, salt, ctx.pepper)

  try {
    await createUser(ctx.db, { id, name, passwordHash, passwordSalt: salt }, ctx.now)
  } catch {
    // usernameがUNIQUEなので
    return error('そのユーザー名は使われています', 409)
  }

  return issue(ctx, id)
}

// POST /auth/login。nameはユーザー名かidでもよい
export async function login(request: Request, ctx: Context): Promise<Response> {
  const { name, password } = (await request.json()) as Credentials

  const found = await findCredentials(ctx.db, name)
  if (!found) return error(REJECT, 401)

  const hash = await hashPassword(password, found.password_salt, ctx.pepper)
  if (!equalsConstantTime(hash, found.password_hash)) return error(REJECT, 401)

  return issue(ctx, found.id)
}

// POST /auth/logout
export async function logout(token: string, ctx: Context): Promise<Response> {
  await deleteSession(ctx.db, token, ctx.now)
  return json({ ok: true })
}
