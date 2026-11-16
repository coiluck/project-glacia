import type { ItemDef } from '../../data/items'
import { ITEM_ICONS } from '../../data/items/icons'

// アイテムの線画。線は親の color、面はレア度の色（item-icon.css）
export default function ItemIcon({ item, className }: { item: ItemDef; className?: string }) {
  const icon = ITEM_ICONS[item.id]
  return (
    <svg
      className={`item-icon is-rarity-${item.rarity}${className ? ` ${className}` : ''}`}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <g transform={icon.transform}>
        {icon.tint && <path className="item-icon-tint" d={icon.tint} fillRule={icon.tintRule} />}
        {icon.thin && <path className="item-icon-thin" d={icon.thin} />}
        {icon.dash && <path className="item-icon-dash" d={icon.dash} />}
        <path className="item-icon-line" d={icon.line} />
        {icon.cord && <path className="item-icon-cord" d={icon.cord} />}
        {icon.solid && <path className="item-icon-solid" d={icon.solid} />}
      </g>
    </svg>
  )
}
