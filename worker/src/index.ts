// Cloudflare Workers用
// 値を決めるのはsrc/features/*/resolve*.ts
import type { Env } from './context'
import { BadRequest, error, withCors } from './http'
import { route } from './router'

export default {
  async fetch(request, env) {
    // vite の proxy 経由だと `/api` が付いたまま来る
    const path = new URL(request.url).pathname.replace(/^\/api/, '')

    const origin = request.headers.get('Origin')

    if (request.method === 'OPTIONS') return withCors(new Response(null, { status: 204 }), env, origin)

    try {
      return withCors(await route(request, env, path), env, origin)
    } catch (e) {
      if (e instanceof BadRequest) return withCors(error(e.message, 400), env, origin)
      // D1のエラーとかだけのはず
      console.error(e)
      return withCors(error('internal error', 500), env, origin)
    }
  },
} satisfies ExportedHandler<Env>
