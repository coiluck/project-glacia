import { items } from '../../../data/items'
import ItemIcon from '../../../components/common/ItemIcon'
import type { BaseView, Stock } from '../view'

type Props = {
  view: BaseView
  stocks: Map<string, Stock>
  onCollect: () => void
}

export default function CollectButton({ view, stocks, onCollect }: Props) {
  const { t } = view
  const list = [...stocks.values()]

  const totals = new Map<string, number>()
  for (const s of list) {
    if (s.count > 0) totals.set(s.itemId, (totals.get(s.itemId) ?? 0) + s.count)
  }
  const fullCount = list.filter((s) => s.full).length

  return (
    <button
      type="button"
      className="base-collect"
      disabled={view.pending || totals.size === 0}
      onClick={onCollect}
    >
      <span className="base-collect-items">
        {totals.size === 0 ? (
          <span className="base-collect-empty">{list.length === 0 ? t.noProducer : t.stockEmpty}</span>
        ) : (
          [...totals].map(([itemId, count]) => (
            <span key={itemId}>
              <ItemIcon item={items[itemId]} className="base-collect-icon" />
              <b>{count}</b>
            </span>
          ))
        )}
        {fullCount > 0 && (
          <span className="base-collect-full">
            {t.full} {fullCount}
          </span>
        )}
      </span>
      <span className="base-collect-label">{t.collect}</span>
    </button>
  )
}
