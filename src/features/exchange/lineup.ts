// 日替わりラインナップ
import {
  BASE_PRICE,
  LINEUP_SIZE,
  PRICE_MAX,
  PRICE_MIN,
  PRICE_STEP,
  exchangePool,
} from '../../data/exchange'

// 1枠ぶん
export interface ExchangeOffer {
  itemId: string
  price: number
}

// シード付きの乱数
function seededRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// dayIndex のラインナップ
export function lineupFor(day: number): ExchangeOffer[] {
  const rand = seededRandom(day)
  const offers: ExchangeOffer[] = []

  for (let i = 0; i < LINEUP_SIZE; i++) {
    const item = exchangePool[Math.floor(rand() * exchangePool.length)]
    const rate = PRICE_MIN + rand() * (PRICE_MAX - PRICE_MIN)
    const price = Math.round((BASE_PRICE[item.kind] * rate) / PRICE_STEP) * PRICE_STEP
    offers.push({ itemId: item.id, price })
  }

  return offers
}
