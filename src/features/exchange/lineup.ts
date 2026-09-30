// 日替わりラインナップ
import {
  BASE_PRICE,
  LINEUP_SIZE,
  PRICE_MAX,
  PRICE_MIN,
  PRICE_STEP,
  exchangePool,
} from '../../data/exchange'
import { seededRandom } from '../daily/random'

// 1枠ぶん
export interface ExchangeOffer {
  itemId: string
  price: number
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
