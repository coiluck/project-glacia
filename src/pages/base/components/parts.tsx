import type { BaseBuildingKind } from '../../../data/base'
import { items } from '../../../data/items'
import { outputsOf } from '../../../features/base/board'
import ItemIcon from '../../../components/common/ItemIcon'
import { fill } from '../../../i18n'
import type { BaseView } from '../view'

// 採掘場と書庫で作る物を選ぶ
export function OutputPicker({
  view,
  kind,
  level,
  value,
  onPick,
}: {
  view: BaseView
  kind: BaseBuildingKind
  level: number
  value: string | undefined
  onPick: (itemId: string) => void
}) {
  const { t, tItem } = view
  return (
    <div className="base-outputs">
      <div className="base-subtitle">{t.output}</div>
      <ul className={`base-output-grid is-${kind}`}>
        {outputsOf(kind).map((o) => {
          const item = items[o.itemId]
          const locked = o.unlockLevel > level
          const active = o.itemId === value
          return (
            <li key={o.itemId}>
              <button
                type="button"
                className={`base-output is-rarity-${item.rarity}${active ? ' is-active' : ''}`}
                disabled={view.pending || locked}
                onClick={() => !active && onPick(o.itemId)}
              >
                <ItemIcon item={item} className="base-item-icon" />
                <span>{locked ? fill(t.unlockAt, o.unlockLevel) : tItem[o.itemId]}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
