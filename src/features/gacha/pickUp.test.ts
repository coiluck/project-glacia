import { describe, expect, it } from 'vitest'
import { characterMasters } from '../../data/characters'
import { RARITIES } from '../../data/characters/const'
import { pickUpEndsAt, pickUpIdsOf, pickUpPeriod } from './pickUp'

const TOP = RARITIES[RARITIES.length - 1]
const topIds = Object.values(characterMasters)
  .filter((c) => c.rarity === TOP)
  .map((c) => c.id)

// JST の日時を unix 秒にする
const jst = (y: number, m: number, d: number, h: number, min = 0, s = 0) =>
  Date.UTC(y, m - 1, d, h - 9, min, s) / 1000

describe('ピックアップの入れ替え', () => {
  it('木曜の朝5時から次の木曜の朝5時までが同じ期になる', () => {
    // 2026-11-12 と 11-19 は木曜
    const period = pickUpPeriod(jst(2026, 11, 12, 5))
    expect(pickUpPeriod(jst(2026, 11, 12, 4, 59, 59))).toBe(period - 1)
    expect(pickUpPeriod(jst(2026, 11, 19, 4, 59, 59))).toBe(period)
    expect(pickUpPeriod(jst(2026, 11, 19, 5))).toBe(period + 1)
  })

  it('終了時刻は次の期の始まり', () => {
    // 上から、期が始まる瞬間、期の途中、期が終わる1秒前
    const nows = [jst(2026, 11, 12, 5), jst(2026, 11, 15, 23), jst(2026, 11, 19, 4, 59, 59)]
    for (const now of nows) {
      const endsAt = pickUpEndsAt(now)
      expect(pickUpPeriod(endsAt - 1), `${now}`).toBe(pickUpPeriod(now))
      expect(pickUpPeriod(endsAt), `${now}`).toBe(pickUpPeriod(now) + 1)
    }
  })

  it('最高レアのキャラを1人ずつ、全員を一巡してから最初に戻る', () => {
    const round = topIds.map((_, i) => pickUpIdsOf(i))
    expect(round.every((ids) => ids.length === 1)).toBe(true)
    expect(round.map((ids) => ids[0]).sort()).toEqual([...topIds].sort())
    expect(pickUpIdsOf(topIds.length)).toEqual(pickUpIdsOf(0))
  })
})
