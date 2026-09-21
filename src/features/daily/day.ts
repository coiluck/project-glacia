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
