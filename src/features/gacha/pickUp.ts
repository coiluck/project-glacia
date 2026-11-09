import { RARITIES } from '../../data/characters/const'
import { PICK_UP_DAYS, gachaPool } from '../../data/gacha'
import { dayIndex, secondsUntilReset } from '../daily/day'

const DAY = 24 * 60 * 60

// now がピックアップの何期目か。dayIndex が0の日（JST 1970-01-01、木曜）から PICK_UP_DAYS 日ずつ区切る
// 入れ替わりは木曜の朝5時になる
export function pickUpPeriod(now: number): number {
  return Math.floor(dayIndex(now) / PICK_UP_DAYS)
}

// period 期目のピックアップ対象
export function pickUpIdsOf(period: number): string[] {
  const top = gachaPool[RARITIES[RARITIES.length - 1]]
  return [top[period % top.length]]
}

// now を含む期が終わって次の期に替わる時刻（unix 秒）
export function pickUpEndsAt(now: number): number {
  const daysLeft = (pickUpPeriod(now) + 1) * PICK_UP_DAYS - dayIndex(now) - 1
  return now + secondsUntilReset(now) + daysLeft * DAY
}
