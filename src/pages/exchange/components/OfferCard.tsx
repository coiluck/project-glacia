import type { CSSProperties } from 'react'
import type { ItemDef, ItemKind } from '../../../data/items'
import ItemIcon from '../../../components/common/ItemIcon'
import TokenIcon from './TokenIcon'

const KIND_CAPTION: Record<ItemKind, string> = {
  material: 'MATERIAL',
  book: 'MANUAL',
  exp: 'RECORD',
}

type Props = {
  index: number // 表示順
  item: ItemDef
  name: string
  price: number
  owned: number
  sold: boolean // もう交換したか
  short: boolean // 交換材料が足りないか
  disabled: boolean
  labels: { owned: string; trade: string; traded: string; short: string }
  onTrade: () => void
}

// 本日のラインナップ1枠
export default function OfferCard({
  index,
  item,
  name,
  price,
  owned,
  sold,
  short,
  disabled,
  labels,
  onTrade,
}: Props) {
  const className = `exchange-offer is-rarity-${item.rarity}${sold ? ' is-sold' : ''}${short ? ' is-short' : ''}`

  return (
    <li className={className} style={{ '--i': index } as CSSProperties}>
      <span className="exchange-offer-rarity">{'★'.repeat(item.rarity)}</span>
      <span className="exchange-offer-kind">{KIND_CAPTION[item.kind]}</span>

      <div className="exchange-offer-body">
        <span className="exchange-offer-figure">
          <ItemIcon item={item} className="exchange-offer-icon" />
          {sold && <span className="exchange-offer-stamp">SOLD</span>}
        </span>
        <span className="exchange-offer-name">{name}</span>
        <span className="exchange-offer-owned">
          {labels.owned} <b>{owned}</b>
        </span>
      </div>

      <span className="exchange-offer-price">
        <TokenIcon />
        <b>{price}</b>
      </span>

      <button
        type="button"
        className="exchange-offer-button"
        disabled={disabled || sold || short}
        onClick={onTrade}
      >
        {sold ? labels.traded : short ? labels.short : labels.trade}
      </button>
    </li>
  )
}
