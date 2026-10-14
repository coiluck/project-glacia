import type { ReactNode } from 'react'
import { dropTables } from '../../../data/drops'
import { items } from '../../../data/items'
import type { Stage } from '../../../data/stages'
import { useTranslations } from '../../../i18n'
import ItemIcon from '../../../components/common/ItemIcon'
import BillIcon from '../../../components/common/BillIcon'

const ITEM_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(items).map((i) => [i.nameKey, i.nameKey]),
)

export default function StageDrops({ stageId, reward }: { stageId: string; reward: Stage['reward'] }) {
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)
  const rows = dropTables[stageId] ?? []
  const guaranteed = rows.filter((r) => r.rate === undefined)
  const chance = rows.filter((r) => r.rate !== undefined)

  // 六角のセル1つ。縁の色はレアリティ
  const cell = (key: string, rarity: number, icon: ReactNode, name: string, count: number) => (
    <li key={key} className={`story-map-stage-drop is-rarity-${rarity}`}>
      <span className="story-map-stage-hex">
        <span className="story-map-stage-hex-rim" />
        <span className="story-map-stage-hex-face">{icon}</span>
        <span className="story-map-stage-hex-count">×{count}</span>
      </span>
      <span className="story-map-stage-drop-name">{name}</span>
    </li>
  )

  const itemCells = (list: typeof rows) =>
    list.map((row, index) => {
      const item = items[row.itemId]
      return cell(
        `${row.itemId}-${index}`,
        item.rarity,
        <ItemIcon item={item} className="story-map-stage-drop-icon" />,
        tItem[item.nameKey],
        row.count,
      )
    })

  return (
    <div className="story-map-stage-drops">
      <div className="story-map-stage-drop-group">
        <span className="story-map-stage-drop-group-label">確定</span>
        <ul className="story-map-stage-drop-list">
          {cell('currency', 1, <BillIcon className="story-map-stage-drop-bill" />, '紙幣', reward.currency)}
          {itemCells(guaranteed)}
        </ul>
      </div>
      {chance.length > 0 && (
        <div className="story-map-stage-drop-group">
          <span className="story-map-stage-drop-group-label">確率</span>
          <ul className="story-map-stage-drop-list">{itemCells(chance)}</ul>
        </div>
      )}
    </div>
  )
}
