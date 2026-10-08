import { useState } from 'react'
import Screen from '../../layouts/Screen'
import { items } from '../../data/items'
import { useInventoryStore } from '../../stores/inventoryStore'
import RecipeTree from './components/RecipeTree'
import ItemDetail from './components/ItemDetail'

export default function WarehousePage() {
  const owned = useInventoryStore((s) => s.items)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const all = Object.values(items)
  const selected = (selectedId && items[selectedId]) || all.find((it) => (owned[it.id] ?? 0) > 0) || all[0]

  return (
    <>
      <div className="page page-warehouse">
        <RecipeTree selectedId={selected.id} owned={owned} onSelect={setSelectedId} />
        <ItemDetail item={selected} owned={owned} onSelect={setSelectedId} />
      </div>

      <Screen background="images/start/hex-frame.jpg" />
    </>
  )
}
