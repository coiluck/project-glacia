import type { MaterialCost } from '../../../data/characters/types'

// 強化に必要な素材の一覧。costs が null なら上限に達している。
// data/items.ts がまだ無いので itemId をそのまま出す（実装計画 工程5でアイテム名に差し替える）
export default function MaterialCostList({ costs }: { costs: MaterialCost[] | null }) {
  if (!costs) return <span className="member-detail-cost-empty">上限</span>

  return (
    <ul className="member-detail-cost-list">
      {costs.map((cost) => (
        <li key={cost.itemId} className="member-detail-cost-item">
          <span className="member-detail-cost-name">{cost.itemId}</span>
          <span className="member-detail-cost-count">×{cost.count}</span>
        </li>
      ))}
    </ul>
  )
}
