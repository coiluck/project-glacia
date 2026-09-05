// 1リクエストぶんの環境。各ルートはこれだけを受け取る
export interface Env {
  DB: D1Database
  ALLOWED_ORIGIN: string
  PASSWORD_PEPPER: string // wrangler secret put で入れる。ローカルは .dev.vars
}

export interface Context {
  db: D1Database
  userId: string // セッションから引く。クライアントの申告は一切使わない
  now: number    // Unix秒。リクエスト中は固定する（スタミナの計算がぶれないように）
  pepper: string // パスワードハッシュ用。Env.PASSWORD_PEPPER をそのまま持ち回る
}

export const nowSeconds = () => Math.floor(Date.now() / 1000)

// Authorization: Bearer <token> からトークンを取り出す
export function readToken(request: Request): string | null {
  const header = request.headers.get('Authorization')
  if (!header?.startsWith('Bearer ')) return null
  return header.slice('Bearer '.length) || null
}
