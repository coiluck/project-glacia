import type { Env } from './context'

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export const error = (message: string, status: number) => json({ error: message }, status)

export function withCors(res: Response, env: Env): Response {
  const headers = new Headers(res.headers)
  headers.set('Access-Control-Allow-Origin', env.ALLOWED_ORIGIN)
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  headers.set('Vary', 'Origin')
  return new Response(res.body, { status: res.status, headers })
}
