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

  const itemRows = (list: typeof rows) =>
    list.map((row, index) => {
      const item = items[row.itemId]
      return (
        <li key={`${row.itemId}-${index}`} className={`story-map-stage-drop is-rarity-${item.rarity}`}>
          <ItemIcon item={item} className="story-map-stage-drop-icon" />
          <span className="story-map-stage-drop-name">{tItem[item.nameKey]}</span>
          <span className="story-map-stage-drop-count">×{row.count}</span>
        </li>
      )
    })

  return (
    <div className="story-map-stage-drops">
      <div className="story-map-stage-drop-group">
        <span className="story-map-stage-drop-group-label">確定</span>
        <ul className="story-map-stage-drop-list">
          <li className="story-map-stage-drop">
            <span className="story-map-stage-drop-icon">
              <BillIcon className="story-map-stage-drop-bill" />
            </span>
            <span className="story-map-stage-drop-name">紙幣</span>
            <span className="story-map-stage-drop-count">×{reward.currency}</span>
          </li>
          {itemRows(guaranteed)}
        </ul>
      </div>
      {chance.length > 0 && (
        <div className="story-map-stage-drop-group">
          <span className="story-map-stage-drop-group-label">確率</span>
          <ul className="story-map-stage-drop-list">{itemRows(chance)}</ul>
        </div>
      )}
    </div>
  )
}
