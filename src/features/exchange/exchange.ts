import type { MeResponse, UserRow } from '../../api/types'
import { DAILY_TOKENS, TOKEN_PRICE } from '../../data/exchange'
import { dayIndex } from '../daily/day'
import { addItems } from '../inventory/inventory'
import { lineupFor } from './lineup'

// 取引所の判定に要る値
export type ExchangeBase = Pick<
  UserRow,
  'exchange_tokens' | 'exchange_claimed_day' | 'exchange_bought_day' | 'exchange_bought'
>

// 今日ぶんの状態
export function exchangeToday(base: ExchangeBase, now: number): { claimed: boolean; bought: number[] } {
  const day = dayIndex(now)
  return {
    claimed: base.exchange_claimed_day === day,
    bought: base.exchange_bought_day === day ? base.exchange_bought : [],
  }
}

// 本日分の交換材料を受け取る
export function claimDaily(me: MeResponse, now: number): MeResponse {
  if (exchangeToday(me.user, now).claimed) throw new Error('本日分は受取済み')

  return {
    ...me,
    user: {
      ...me.user,
      exchange_tokens: me.user.exchange_tokens + DAILY_TOKENS,
      exchange_claimed_day: dayIndex(now),
    },
  }
}

// 紙幣で交換材料を買う
export function buyTokens(me: MeResponse, count: number): MeResponse {
  if (!Number.isInteger(count) || count <= 0) throw new Error(`個数が不正: ${count}`)

  const cost = count * TOKEN_PRICE
  if (me.user.currency < cost) throw new Error('通貨が足りない')

  return {
    ...me,
    user: {
      ...me.user,
      currency: me.user.currency - cost,
      exchange_tokens: me.user.exchange_tokens + count,
    },
  }
}

// 今日の枠を1つ交換する
export function trade(me: MeResponse, slot: number, now: number): MeResponse {
  const offer = Number.isInteger(slot) ? lineupFor(dayIndex(now))[slot] : undefined
  if (!offer) throw new Error(`枠が不正: ${slot}`)

  const { bought } = exchangeToday(me.user, now)
  if (bought.includes(slot)) throw new Error('交換済み')
  if (me.user.exchange_tokens < offer.price) throw new Error('交換材料が足りない')

  return {
    ...me,
    user: {
      ...me.user,
      exchange_tokens: me.user.exchange_tokens - offer.price,
      exchange_bought_day: dayIndex(now),
      exchange_bought: [...bought, slot],
      items: addItems(me.user.items, [{ itemId: offer.itemId, count: 1 }]),
    },
  }
}
