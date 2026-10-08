import { useState, type CSSProperties } from 'react'
import type { ItemDef } from '../../../data/items'
import ItemIcon from '../../../components/common/ItemIcon'
import TokenIcon from './TokenIcon'

// 相場との差がこれ未満なら相場どおり
const MARKET_EVEN = 5

type Props = {
  index: number // 表示順
  item: ItemDef
  name: string
  count: number // 1枠で手に入る個数
  price: number
  market: number // 相場との差（%）
  owned: number
  sold: boolean // もう交換したか
  short: boolean // 交換材料が足りないか
  disabled: boolean
  labels: { owned: string; trade: string; traded: string; short: string; market: string; marketEven: string }
  onTrade: () => void
}

export default function OfferCard({
  index,
  item,
  name,
  count,
  price,
  market,
  owned,
  sold,
  short,
  disabled,
  labels,
  onTrade,
}: Props) {
  const [soldOnOpen] = useState(sold)
  const className = `exchange-offer${sold ? ' is-sold' : ''}${short ? ' is-short' : ''}`
  const marketClass = Math.abs(market) < MARKET_EVEN ? '' : market < 0 ? ' is-cheap' : ' is-dear'

  return (
    <li className={className} style={{ '--i': index } as CSSProperties}>
      <span className="exchange-offer-owned">
        {labels.owned} <b>{owned}</b>
      </span>

      <div className="exchange-offer-tag">
        <svg className="exchange-offer-eyelet" viewBox="0 0 34 34" aria-hidden>
          <path d="M17 1.5 30.5 9.2v15.6L17 32.5 3.5 24.8V9.2Z" />
        </svg>

        <span className="exchange-offer-figure">
          <ItemIcon item={item} className="exchange-offer-icon" />
          <span className="exchange-offer-count">
            <i>×</i>
            {count}
          </span>
        </span>
        <span className="exchange-offer-name">{name}</span>

        <span className={`exchange-offer-market${marketClass}`}>
          {marketClass ? (
            <>
              {labels.market}
              <b>
                {market < 0 ? '−' : '+'}
                {Math.abs(market)}%
              </b>
            </>
          ) : (
            labels.marketEven
          )}
        </span>

        <span className="exchange-offer-price">
          <TokenIcon />
          <b>{price}</b>
        </span>

        {sold ? (
          <span className={`exchange-offer-stamp${soldOnOpen ? '' : ' is-fresh'}`}>
            {labels.traded}
          </span>
        ) : (
          <button
            type="button"
            className="exchange-offer-button"
            disabled={disabled || short}
            onClick={onTrade}
          >
            {short ? labels.short : labels.trade}
          </button>
        )}
      </div>
    </li>
  )
}
