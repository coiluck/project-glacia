import type { MaterialCost } from '../../../data/characters/types'
import { items } from '../../../data/items'
import { useTranslations } from '../../../i18n'

const ITEM_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(items).map((i) => [i.nameKey, i.nameKey]),
)

// 強化に必要な素材の一覧
// costsがnullなのは最大までアップデートしてるとき
export default function MaterialCostList({ costs }: { costs: MaterialCost[] | null }) {
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)

  if (!costs) return <span className="member-detail-cost-empty">上限</span>

  return (
    <ul className="member-detail-cost-list">
      {costs.map((cost) => {
        const item = items[cost.itemId]

        return (
          <li key={cost.itemId} className="member-detail-cost-item">
            {item && (
              <svg className="member-detail-cost-icon" viewBox="0 0 24 24" aria-hidden>
                <path d={item.icon} />
              </svg>
            )}
            <span className="member-detail-cost-name">
              {item ? tItem[item.nameKey] : cost.itemId}
            </span>
            <span className="member-detail-cost-count">×{cost.count}</span>
          </li>
        )
      })}
    </ul>
  )
}
