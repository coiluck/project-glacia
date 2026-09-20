import { useState, type CSSProperties } from 'react'
import Screen from '../../layouts/Screen'
import { useTranslations } from '../../i18n'
import { items, type ItemKind } from '../../data/items'
import { useInventoryStore } from '../../stores/inventoryStore'
import ItemIcon from '../../components/common/ItemIcon'
import ItemDetail from './components/ItemDetail'

const KINDS: { kind: ItemKind; labelKey: string; caption: string }[] = [
  { kind: 'material', labelKey: 'kindMaterial', caption: 'MATERIAL' },
  { kind: 'book', labelKey: 'kindBook', caption: 'MANUAL' },
  { kind: 'exp', labelKey: 'kindExp', caption: 'RECORD' },
]

const ITEM_TRANSLATION_MAPPING = Object.fromEntries([
  ...Object.values(items).map((i) => [i.nameKey, i.nameKey]),
  ...KINDS.map((k) => [k.labelKey, k.labelKey]),
])

const WAREHOUSE_TRANSLATION_MAPPING = { empty: 'empty' }

export default function WarehousePage() {
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)
  const t = useTranslations('warehouse', WAREHOUSE_TRANSLATION_MAPPING)
  const owned = useInventoryStore((s) => s.items)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // 持っているものだけ
  const sections = KINDS.map((k) => ({
    ...k,
    list: Object.values(items)
      .filter((it) => it.kind === k.kind && (owned[it.id] ?? 0) > 0)
      .sort((a, b) => a.rarity - b.rarity),
  }))

  const all = sections.flatMap((s) => s.list)
  const selected = all.find((it) => it.id === selectedId) ?? all[0] ?? null

  let cellIndex = 0

  return (
    <>
      <div className="page page-warehouse">
        <div className="warehouse-sections">
          {sections.map((s) => (
            <section key={s.kind} className="warehouse-section">
              <div className="warehouse-section-head">
                <span className="warehouse-section-label">{tItem[s.labelKey]}</span>
                <span className="warehouse-section-caption">{s.caption}</span>
                <span className="warehouse-section-count">{s.list.length}</span>
              </div>

              {s.list.length === 0 ? (
                <p className="warehouse-section-empty">{t.empty}</p>
              ) : (
                <ul className="warehouse-grid">
                  {s.list.map((it) => (
                    <li key={it.id}>
                      <button
                        type="button"
                        className={`warehouse-cell is-rarity-${it.rarity}${selected?.id === it.id ? ' is-active' : ''}`}
                        style={{ '--i': cellIndex++ } as CSSProperties}
                        onClick={() => setSelectedId(it.id)}
                      >
                        <span className="warehouse-cell-rarity">{'★'.repeat(it.rarity)}</span>
                        <ItemIcon item={it} className="warehouse-cell-icon" />
                        <span className="warehouse-cell-name">{tItem[it.nameKey]}</span>
                        <span className="warehouse-cell-count">{owned[it.id]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <ItemDetail item={selected} owned={owned} />
      </div>

      <Screen background="images/start/hex-frame.jpg" />
    </>
  )
}
