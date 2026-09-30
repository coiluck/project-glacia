import type { MeResponse, UserRow } from '../../api/types'
import { LOGIN_BONUS, type LoginReward } from '../../data/loginBonus'
import { addItems } from '../inventory/inventory'
import { dayIndex, monthIndex } from './day'

// ログインボーナスの判定に要る値
export type LoginBase = Pick<UserRow, 'login_claimed_day' | 'login_count'>

// 本日分を受け取ったか
export function loginClaimedToday(base: LoginBase, now: number): boolean {
  return base.login_claimed_day === dayIndex(now)
}

// 今月ここまでに受け取った回数。最後に受け取った日が今月でなければ 0
export function loginCountThisMonth(base: LoginBase, now: number): number {
  return monthIndex(base.login_claimed_day) === monthIndex(dayIndex(now)) ? base.login_count : 0
}

function grant(user: UserRow, reward: LoginReward): UserRow {
  switch (reward.kind) {
    case 'gems':
      return { ...user, gems: user.gems + reward.amount }
    case 'currency':
      return { ...user, currency: user.currency + reward.amount }
    case 'item':
      return { ...user, items: addItems(user.items, [{ itemId: reward.itemId, count: reward.amount }]) }
  }
}

// 本日分のログインボーナスを受け取る。count は今月何回目か（1 から）
export function claimLoginBonus(me: MeResponse, now: number): { me: MeResponse; count: number } {
  if (loginClaimedToday(me.user, now)) throw new Error('本日分は受取済み')

  const count = loginCountThisMonth(me.user, now) + 1
  const reward = LOGIN_BONUS[count - 1]
  if (!reward) throw new Error(`ログインボーナスが無い: ${count}回目`)

  const user = grant(
    { ...me.user, login_claimed_day: dayIndex(now), login_count: count },
    reward,
  )
  return { me: { ...me, user }, count }
}
