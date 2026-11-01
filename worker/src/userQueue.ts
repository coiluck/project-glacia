import { DurableObject } from 'cloudflare:workers'
import { nowSeconds, type Context, type Env } from './context'
import { loadMe, saveMe } from './db/users'
import { COMMANDS } from './router'

// RPC では例外の型が落ちるので、ステータスを値で返す。body は JSON 文字列（unknown は RPC の型に通らない）
export interface QueueResult {
  status: number
  body: string
}

const reply = (status: number, body: unknown): QueueResult => ({ status, body: JSON.stringify(body) })

// ユーザー1人につき1つ。コマンドを1本ずつ順に流す
// 同時に来たコマンドが同じ before から計算すると、消費は1回ぶんなのに報酬が何回も入る
export class UserQueue extends DurableObject<Env> {
  async run(userId: string, path: string, body: unknown): Promise<QueueResult> {
    // 終わるまで次のリクエストを受け付けない。中で例外を投げると DO がリセットされるので全部ここで拾う
    return this.ctx.blockConcurrencyWhile(async () => {
      // 待たされたぶん時刻がずれるので、順番が来てから取る
      const ctx: Context = { db: this.env.DB, userId, now: nowSeconds(), pepper: this.env.PASSWORD_PEPPER }
      try {
        const before = await loadMe(ctx)
        let after
        try {
          after = COMMANDS[path](before, body, ctx)
        } catch (e) {
          // 正規の画面からはほとんど起きないので、改ざんの跡を探せるよう Workers Logs に残す
          const message = (e as Error).message
          console.warn({ event: 'rejected', userId, path, error: message })
          return reply(400, { error: message })
        }
        await saveMe(ctx, before, after.me)
        return reply(200, { me: after.me, result: after.result })
      } catch (e) {
        // D1のエラーとかだけのはず
        console.error(e)
        return reply(500, { error: 'internal error' })
      }
    })
  }
}
