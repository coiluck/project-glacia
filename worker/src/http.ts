import type { Env } from './context'

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export const error = (message: string, status: number) => json({ error: message }, status)

// 理由をクライアントに返してよいエラー。それ以外は中身を伏せて500にする
export class BadRequest extends Error {}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json()
  } catch {
    throw new BadRequest('bad json')
  }
}

// ALLOWED_ORIGIN はカンマ区切り
export function withCors(res: Response, env: Env, origin: string | null): Response {
  const allowed = env.ALLOWED_ORIGIN.split(',').map((o) => o.trim())
  const headers = new Headers(res.headers)
  headers.set('Access-Control-Allow-Origin', origin && allowed.includes(origin) ? origin : allowed[0])
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  headers.set('Vary', 'Origin')
  return new Response(res.body, { status: res.status, headers })
}
