// Worker を立ててコマンドを HTTP で叩く。D1 は test/entry.ts で遅くしてある
// node --test worker/test で動かす（vitest-pool-workers が Vitest 5 に未対応のため）
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { after, before, test } from 'node:test'
import { createTestHarness, unstable_readConfig, unstable_splitSqlQuery } from 'wrangler'

const root = join(import.meta.dirname, '../..')
const real = unstable_readConfig({ config: join(root, 'worker/wrangler.toml') })

// バインディングと migration は本物の wrangler.toml から取り、入口と変数だけ差し替える
const server = createTestHarness({
  root,
  workers: [
    {
      config: {
        name: real.name,
        main: 'worker/test/entry.ts',
        compatibility_date: real.compatibility_date,
        d1_databases: real.d1_databases,
        durable_objects: real.durable_objects,
        migrations: real.migrations,
        vars: { ALLOWED_ORIGIN: 'http://localhost', PASSWORD_PEPPER: 'test-pepper' },
      },
    },
  ],
})

before(async () => {
  await server.listen()
  const env = await server.getWorker().getEnv()
  const schema = readFileSync(join(root, 'worker/schema.sql'), 'utf8')
  await env.DB.batch(unstable_splitSqlQuery(schema).map((q: string) => env.DB.prepare(q)))
})

after(() => server.close())

const post = (path: string, body: unknown, token?: string) =>
  server.fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  })

// テストごとに新しいユーザーを作る。ジェムは初期値の 3000
async function register(): Promise<string> {
  const res = await post('/auth/register', { name: 'u' + Math.random().toString(36).slice(2, 12), password: 'password123' })
  assert.equal(res.status, 200)
  return ((await res.json()) as { result: { token: string } }).result.token
}

async function me(token: string) {
  const res = await server.fetch('/me', { headers: { Authorization: `Bearer ${token}` } })
  return (await res.json()) as { user: { gems: number; pity: number } }
}

test('同時に送った10連は、ジェムで払える1本だけが通る', async () => {
  const token = await register()
  const responses = await Promise.all(
    Array.from({ length: 8 }, () => post('/gacha/pull', { count: 10, banner: 'standard' }, token)),
  )
  assert.deepEqual(responses.map((r) => r.status).sort(), [200, 400, 400, 400, 400, 400, 400, 400])

  const { user } = await me(token)
  assert.equal(user.gems, 3000 - 2500, '1本ぶんだけジェムが減る')
  assert.equal(user.pity, 10, '1本ぶんだけ交換ptが増える')
})

test('単発召集は結果を返し、/me にも保存されている', async () => {
  const token = await register()
  const res = await post('/gacha/pull', { count: 1, banner: 'standard' }, token)
  assert.equal(res.status, 200)
  assert.equal(res.headers.get('Content-Type'), 'application/json')
  const body = (await res.json()) as { me: { user: { gems: number } }; result: unknown[] }
  assert.equal(body.result.length, 1)
  assert.equal(body.me.user.gems, 2700)
  assert.equal((await me(token)).user.gems, 2700)
})

test('resolve が投げた理由は 400 で返る', async () => {
  const token = await register()
  const res = await post('/gacha/pull', { count: 3, banner: 'standard' }, token)
  assert.equal(res.status, 400)
  assert.match(((await res.json()) as { error: string }).error, /召集の回数が不正/)
})

test('無いコマンドは 404', async () => {
  const token = await register()
  assert.equal((await post('/nope', {}, token)).status, 404)
})

test('POST 以外は 405', async () => {
  const token = await register()
  const res = await server.fetch('/gacha/pull', { headers: { Authorization: `Bearer ${token}` } })
  assert.equal(res.status, 405)
})

test('壊れた JSON は 400', async () => {
  const token = await register()
  const res = await server.fetch('/gacha/pull', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: '{',
  })
  assert.equal(res.status, 400)
})

test('トークンが無ければ 401', async () => {
  assert.equal((await post('/gacha/pull', { count: 1, banner: 'standard' })).status, 401)
})
