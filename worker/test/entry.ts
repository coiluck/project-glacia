// テスト用の入口。本物の Worker と UserQueue をそのまま使い、D1 だけ遅くする
// 本番の D1 はネットワーク越しなので、読んでから書くまでに間があり、その間に同じユーザーの別のコマンドが読める。
// ローカルの D1 はすぐ返るので、そのままでは同時に送っても1本ずつ処理されて競合が起きない
import worker, { UserQueue as RealUserQueue } from '../src/index'
import type { Env } from '../src/context'

const BATCH_DELAY_MS = 100

// worker が使うのは prepare と batch だけ
function slow(db: D1Database): D1Database {
  return {
    prepare: (query: string) => db.prepare(query),
    batch: async (statements: D1PreparedStatement[]) => {
      await scheduler.wait(BATCH_DELAY_MS)
      return db.batch(statements)
    },
  } as D1Database
}

export class UserQueue extends RealUserQueue {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, { ...env, DB: slow(env.DB) })
  }
}

export default {
  fetch: (request, env) => worker.fetch(request, { ...env, DB: slow(env.DB) }),
} satisfies ExportedHandler<Env>
