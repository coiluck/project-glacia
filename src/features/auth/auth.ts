export const NAME_MIN = 1
export const NAME_MAX = 12
export const PASSWORD_MIN = 8
export const PASSWORD_MAX = 72

// 認証エラーコード
export const AUTH_ERROR = {
  nameLength: 'auth/name-length',
  passwordLength: 'auth/password-length',
  nameTaken: 'auth/name-taken',
  badCredentials: 'auth/bad-credentials',
} as const

// セッションの有効期間（秒） = 30日
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30

const encoder = new TextEncoder()

const toHex = (bytes: ArrayBuffer) =>
  [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('')

// 乱数
export function randomHex(byteLength: number): string {
  return toHex(crypto.getRandomValues(new Uint8Array(byteLength)).buffer)
}

export async function sha256Hex(text: string): Promise<string> {
  return toHex(await crypto.subtle.digest('SHA-256', encoder.encode(text)))
}

export async function hashPassword(
  password: string,
  salt: string,
  pepper: string,
): Promise<string> {
  // secretの設定漏れ
  if (!pepper) throw new Error('PASSWORD_PEPPER が設定されていません')

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(pepper),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(`${salt}:${password}`)))
}

// ハッシュの比較
export function equalsConstantTime(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

// 登録時の入力チェック
export function validateCredentials(name: string, password: string): void {
  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    throw new Error(AUTH_ERROR.nameLength)
  }
  if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
    throw new Error(AUTH_ERROR.passwordLength)
  }
}
