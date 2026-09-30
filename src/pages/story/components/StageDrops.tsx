import { dropTables } from '../../../data/drops'
import { items } from '../../../data/items'
import { useTranslations } from '../../../i18n'
import ItemIcon from '../../../components/common/ItemIcon'

const ITEM_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(items).map((i) => [i.nameKey, i.nameKey]),
)

export default function StageDrops({ stageId }: { stageId: string }) {
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)
  const rows = dropTables[stageId] ?? []
  const groups = [
    { label: '確定', rows: rows.filter((r) => r.rate === undefined) },
    { label: '確率', rows: rows.filter((r) => r.rate !== undefined) },
  ].filter((g) => g.rows.length > 0)

  return (
    <div className="story-map-stage-drops">
      {groups.map(({ label, rows }) => (
        <div key={label} className="story-map-stage-drop-group">
          <span className="story-map-stage-drop-group-label">{label}</span>
          <ul className="story-map-stage-drop-list">
            {rows.map((row, index) => {
              const item = items[row.itemId]
              return (
                <li key={`${row.itemId}-${index}`} className={`story-map-stage-drop is-rarity-${item.rarity}`}>
                  <ItemIcon item={item} className="story-map-stage-drop-icon" />
                  <span className="story-map-stage-drop-name">{tItem[item.nameKey]}</span>
                  <span className="story-map-stage-drop-count">×{row.count}</span>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
