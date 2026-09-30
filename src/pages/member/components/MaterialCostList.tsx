import type { MaterialCost } from '../../../data/characters/types'
import { items } from '../../../data/items'
import { useTranslations } from '../../../i18n'
import { useInventoryStore } from '../../../stores/inventoryStore'

const ITEM_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(items).map((i) => [i.nameKey, i.nameKey]),
)

// 強化に必要な素材の一覧。所持数／必要数を出し、足りない行に is-short を付ける
// costsがnullなのは最大までアップデートしてるとき
export default function MaterialCostList({ costs }: { costs: MaterialCost[] | null }) {
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)
  const owned = useInventoryStore((s) => s.items)

  if (!costs) return <span className="member-detail-cost-empty">上限</span>

  return (
    <ul className="member-detail-cost-list">
      {costs.map((cost) => {
        const item = items[cost.itemId]
        const have = owned[cost.itemId] ?? 0

        return (
          <li
            key={cost.itemId}
            className={`member-detail-cost-item${have < cost.count ? ' is-short' : ''}`}
          >
            {item && (
              <svg className="member-detail-cost-icon" viewBox="0 0 24 24" aria-hidden>
                <path d={item.icon} />
              </svg>
            )}
            <span className="member-detail-cost-name">
              {item ? tItem[item.nameKey] : cost.itemId}
            </span>
            <span className="member-detail-cost-count">
              {have} / {cost.count}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
