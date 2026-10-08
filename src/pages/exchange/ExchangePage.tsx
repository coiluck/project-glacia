import { useEffect, useRef, useState } from 'react'
import Screen from '../../layouts/Screen'
import { useTranslations } from '../../i18n'
import { useBackHandler } from '../../hooks/useBackHandler'
import { exchange } from '../../api/actions/exchange'
import { characterMasters } from '../../data/characters'
import { items } from '../../data/items'
import { dayIndex, secondsUntilReset } from '../../features/daily/day'
import { exchangeToday } from '../../features/exchange/exchange'
import { lineupFor, marketRate } from '../../features/exchange/lineup'
import { useExchangeStore } from '../../stores/exchangeStore'
import { useInventoryStore } from '../../stores/inventoryStore'
import { useResourceStore } from '../../stores/resourceStore'
import { useStaminaStore } from '../../stores/staminaStore'
import { formatHms } from '../../utils/format'
import DailySupply from './components/DailySupply'
import ExchangeStage from './components/ExchangeStage'
import OfferCard from './components/OfferCard'
import TokenIcon from './components/TokenIcon'
import TokenShop from './components/TokenShop'

const ITEM_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(items).map((i) => [i.nameKey, i.nameKey]),
)

const EXCHANGE_TRANSLATION_MAPPING = {
  lineup: 'lineup',
  supply: 'supply',
  token: 'token',
  reset: 'reset',
  owned: 'owned',
  trade: 'trade',
  traded: 'traded',
  short: 'short',
  market: 'market',
  marketEven: 'marketEven',
  purchase: 'purchase',
  cost: 'cost',
  buy: 'buy',
}

// 左に立つのはラピス固定。セリフは状況で変わる
const LAPIS = characterMasters.lapis
const CHARACTER_TRANSLATION_MAPPING = {
  name: LAPIS.nameKey,
  start: 'exchangeLapisStart',
  traded: 'exchangeLapisTraded',
  short: 'exchangeLapisShort',
  done: 'exchangeLapisDone',
}

export default function ExchangePage() {
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)
  const t = useTranslations('exchange', EXCHANGE_TRANSLATION_MAPPING)
  const tChar = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)

  const base = useExchangeStore((s) => s.base)
  const owned = useInventoryStore((s) => s.items)
  const currency = useResourceStore((s) => s.currency)
  const now = useStaminaStore((s) => s.now)

  const day = dayIndex(now)
  const lineup = lineupFor(day)
  const { claimed, bought } = exchangeToday(base, now)
  const tokens = base.exchange_tokens

  const [pending, setPending] = useState(false) // 応答待ち
  const [shopOpen, setShopOpen] = useState(false)
  const [supplyShown, setSupplyShown] = useState(false) // 本日分を受け取ったオーバーレイ

  // 開いたときに本日分を受け取る
  const claimedDay = useRef<number | null>(null)
  useEffect(() => {
    if (claimed || claimedDay.current === day) return
    claimedDay.current = day
    exchange({ kind: 'claim' })
      .then(() => setSupplyShown(true))
      .catch(console.error)
  }, [claimed, day])

  // 戻る
  useBackHandler(() => {
    if (supplyShown) {
      setSupplyShown(false)
      return true
    }
    if (shopOpen) {
      setShopOpen(false)
      return true
    }
    return false
  })

  const run = async (payload: Parameters<typeof exchange>[0]) => {
    if (pending) return
    setPending(true)
    try {
      await exchange(payload)
    } catch (e) {
      console.error(e)
    } finally {
      setPending(false)
    }
  }

  const remaining = lineup.filter((_, slot) => !bought.includes(slot))
  const line =
    remaining.length === 0
      ? tChar.done
      : claimed && remaining.every((offer) => offer.price > tokens)
        ? tChar.short
        : bought.length > 0
          ? tChar.traded
          : tChar.start

  return (
    <>
      <div className="page page-exchange">
        <ExchangeStage name={tChar.name} line={line} />

        <section className="exchange-panel">
          <div className="exchange-head">
            <span className="exchange-title">{t.lineup}</span>
            <span className="exchange-reset">
              {t.reset} <b>{formatHms(secondsUntilReset(now))}</b>
            </span>

            <div className="exchange-wallet">
              <button
                type="button"
                className={`exchange-wallet-purchase${shopOpen ? ' is-open' : ''}`}
                aria-label={t.purchase}
                onClick={() => setShopOpen(!shopOpen)}
              />
              <div className="exchange-wallet-balance">
                <TokenIcon />
                <b className="exchange-wallet-value">{tokens.toLocaleString('en-US')}</b>
              </div>

              <TokenShop
                open={shopOpen}
                currency={currency}
                pending={pending}
                labels={t}
                onBuy={(count) => run({ kind: 'buyTokens', count })}
              />
            </div>
          </div>

          <ul className="exchange-list">
            {lineup.map((offer, slot) => {
              const item = items[offer.itemId]
              const sold = bought.includes(slot)
              return (
                <OfferCard
                  key={`${day}-${slot}`}
                  index={slot}
                  item={item}
                  name={tItem[item.nameKey]}
                  count={offer.count}
                  price={offer.price}
                  market={marketRate(offer)}
                  owned={owned[item.id] ?? 0}
                  sold={sold}
                  short={!sold && tokens < offer.price}
                  disabled={pending}
                  labels={t}
                  onTrade={() => run({ kind: 'trade', slot })}
                />
              )
            })}
          </ul>
        </section>

        {supplyShown && (
          <DailySupply balance={tokens} labels={t} onClose={() => setSupplyShown(false)} />
        )}
      </div>

      <Screen background="images/start/hex-frame.jpg" />
    </>
  )
}
