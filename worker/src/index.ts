// Cloudflare Workers用
// 値を決めるのはsrc/features/*/resolve*.ts
import type { Env } from './context'
import { error, withCors } from './http'
import { route } from './router'

export default {
  async fetch(request, env) {
    // vite の proxy 経由だと `/api` が付いたまま来る
    const path = new URL(request.url).pathname.replace(/^\/api/, '')

    if (request.method === 'OPTIONS') return withCors(new Response(null, { status: 204 }), env)

    try {
      return withCors(await route(request, env, path), env)
    } catch (e) {
      return withCors(error((e as Error).message, 400), env)
    }
  },
} satisfies ExportedHandler<Env>
