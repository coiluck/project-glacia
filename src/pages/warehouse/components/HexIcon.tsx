import type { ItemDef } from '../../../data/items'
import ItemIcon from '../../../components/common/ItemIcon'

// ★の色で縁取った六角形のアイコン枠
export default function HexIcon({ item, className = '' }: { item: ItemDef; className?: string }) {
  return (
    <span className={`warehouse-hex is-rarity-${item.rarity} ${className}`}>
      <ItemIcon item={item} />
    </span>
  )
}
