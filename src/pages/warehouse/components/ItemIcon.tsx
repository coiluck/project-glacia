import type { ItemDef } from '../../../data/items'

export default function ItemIcon({ item, className }: { item: ItemDef; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d={item.icon} />
    </svg>
  )
}
