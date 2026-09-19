import type { UserRow } from '../../api/types'

// スタミナ1回復にかかる秒数
export const REGEN_INTERVAL_SECONDS = 300

// 回復計算の基準になる値。これと now だけで現在のスタミナが決まる
export type StaminaBase = Pick<UserRow, 'stamina' | 'stamina_max' | 'stamina_updated_at'>

// 経過時間ぶん回復させる
function regenerate(user: StaminaBase, now: number): { stamina: number; updatedAt: number } {
  // 満タンの間は回復しない
  // 減った瞬間から数え始められるよう時刻だけ進めておく
  if (user.stamina >= user.stamina_max) {
    return { stamina: user.stamina_max, updatedAt: now }
  }

  const elapsed = Math.max(0, now - user.stamina_updated_at)
  const recovered = Math.floor(elapsed / REGEN_INTERVAL_SECONDS)
  const stamina = Math.min(user.stamina_max, user.stamina + recovered)

  return {
    stamina,
    updatedAt:
      stamina >= user.stamina_max
        ? now
        : user.stamina_updated_at + recovered * REGEN_INTERVAL_SECONDS,
  }
}

// 基準値を now まで進めた現在値。サーバーもフロントの表示もこれを使う
export function currentStamina(base: StaminaBase, now: number) {
  const { stamina, updatedAt } = regenerate(base, now)
  const full = stamina >= base.stamina_max

  const toNext = full
    ? 0
    : REGEN_INTERVAL_SECONDS - ((now - updatedAt) % REGEN_INTERVAL_SECONDS)
  const toFull = full ? 0 : (base.stamina_max - stamina - 1) * REGEN_INTERVAL_SECONDS + toNext

  return {
    stamina,
    stamina_updated_at: updatedAt,
    stamina_recovering_seconds: toNext,
    stamina_recovering_seconds_max: toFull,
  }
}

export function refreshStamina(user: UserRow, now: number): UserRow {
  const { stamina, stamina_updated_at } = currentStamina(user, now)
  return { ...user, stamina, stamina_updated_at }
}

// costを消費
export function spendStamina(user: UserRow, cost: number, now: number): UserRow {
  const current = refreshStamina(user, now)
  if (current.stamina < cost) throw new Error('スタミナが足りない')

  return refreshStamina(
    {
      ...current,
      stamina: current.stamina - cost,
      stamina_updated_at: current.stamina >= current.stamina_max ? now : current.stamina_updated_at,
    },
    now,
  )
}
