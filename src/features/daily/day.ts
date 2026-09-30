export const RESET_HOUR = 5 // JSTの朝5時

const JST_OFFSET = 9 * 3600
const DAY = 24 * 3600

// 日のindex。よくわからん数だけど日が変われば変わるのでこれでいい
export function dayIndex(now: number): number {
  return Math.floor((now + JST_OFFSET - RESET_HOUR * 3600) / DAY)
}

// 次の日替わりまでの秒数
export function secondsUntilReset(now: number): number {
  return (dayIndex(now) + 1) * DAY - (now + JST_OFFSET - RESET_HOUR * 3600)
}

// dayIndex を暦（05:00 区切りの JST）に戻す。dayIndex * DAY を UTC として読むとその日付になる
export function calendarOf(day: number): { year: number; month: number; date: number } {
  const d = new Date(day * DAY * 1000)
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, date: d.getUTCDate() }
}

// 月のindex。dayIndex と同じく、月が変われば変わる
export function monthIndex(day: number): number {
  const { year, month } = calendarOf(day)
  return year * 12 + month - 1
}

// その日が属する月の日数
export function daysInMonth(day: number): number {
  const { year, month } = calendarOf(day)
  return new Date(Date.UTC(year, month, 0)).getUTCDate()
}
