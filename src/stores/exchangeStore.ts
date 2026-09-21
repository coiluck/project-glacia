import { create } from 'zustand'
import type { UserRow } from '../api/types'
import type { ExchangeBase } from '../features/exchange/exchange'

// 取引所
export interface ExchangeState {
  base: ExchangeBase
  hydrate: (row: UserRow) => void
  reset: () => void
}

const initial = {
  base: {
    exchange_tokens: 0,
    exchange_claimed_day: 0,
    exchange_bought_day: 0,
    exchange_bought: [] as number[],
  },
}

export const useExchangeStore = create<ExchangeState>((set) => ({
  ...initial,
  hydrate: (row) =>
    set({
      base: {
        exchange_tokens: row.exchange_tokens,
        exchange_claimed_day: row.exchange_claimed_day,
        exchange_bought_day: row.exchange_bought_day,
        exchange_bought: row.exchange_bought,
      },
    }),
  reset: () => set(initial),
}))
