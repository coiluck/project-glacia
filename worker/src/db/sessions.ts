import { SESSION_TTL_SECONDS, randomHex, sha256Hex } from '../../../src/features/auth/auth'

// セッションを作ってトークンを返す
export async function createSession(
  db: D1Database,
  userId: string,
  now: number,
): Promise<string> {
  const token = randomHex(32)
  await db
    .prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(await sha256Hex(token), userId, now + SESSION_TTL_SECONDS)
    .run()
  return token
}

// トークンに対応するユーザーID
// 無効・期限切れならnull
export async function findSessionUserId(
  db: D1Database,
  token: string,
  now: number,
): Promise<string | null> {
  const row = await db
    .prepare('SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?')
    .bind(await sha256Hex(token), now)
    .first<{ user_id: string }>()
  return row?.user_id ?? null
}

// ログアウト
export async function deleteSession(db: D1Database, token: string, now: number): Promise<void> {
  await db.batch([
    db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256Hex(token)),
    db.prepare('DELETE FROM sessions WHERE expires_at <= ?').bind(now),
  ])
}
