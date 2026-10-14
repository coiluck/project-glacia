import { useMemo } from 'react'
import { items } from '../../../data/items'
import { RARITIES } from '../../../data/characters/const'
import { fill, useTranslations } from '../../../i18n'
import { treeSections } from '../treeLayout'
import HexIcon from './HexIcon'

// 盤面の寸法（設計座標）
const COL_X = [40, 440, 840]
const CELL_W = 300
const CELL_H = 60
const ROW_H = 70
const TOP = 76 // ★の列見出しの下
const BAND_H = 36 // 強化書・育成記録の区切り

// 区切りと各品の位置
const bands: { kind: string; y: number }[] = []
const positions = new Map<string, { x: number; y: number }>()
{
  let y = TOP
  treeSections.forEach((section, i) => {
    if (i > 0) {
      bands.push({ kind: section.kind, y })
      y += BAND_H
    }
    for (const cell of section.cells) positions.set(cell.item.id, { x: COL_X[cell.col], y: y + cell.row * ROW_H })
    y += section.rows * ROW_H
  })
}

// 材料 -> 合成品の線
const edges = Object.values(items).flatMap((it) =>
  (it.recipe ?? []).map((cost) => ({ from: cost.itemId, to: it.id, count: cost.count })),
)

const materials = treeSections[0].cells.map((c) => c.item)

// 選んだ品の材料をさかのぼった集合と、合成先をたどった集合
function lineage(id: string) {
  const up = new Set<string>([id])
  const down = new Set<string>([id])
  const walkUp = (x: string) => {
    for (const e of edges.filter((e) => e.to === x)) {
      up.add(e.from)
      walkUp(e.from)
    }
  }
  const walkDown = (x: string) => {
    for (const e of edges.filter((e) => e.from === x)) {
      down.add(e.to)
      walkDown(e.to)
    }
  }
  walkUp(id)
  walkDown(id)
  return { up, down }
}

const KIND_LABEL: Record<string, string> = { material: 'kindMaterial', book: 'kindBook', exp: 'kindExp' }

const ITEM_TRANSLATION_MAPPING = Object.fromEntries([
  ...Object.values(items).map((i) => [i.nameKey, i.nameKey]),
  ...Object.values(KIND_LABEL).map((k) => [k, k]),
])

const WAREHOUSE_TRANSLATION_MAPPING = { kindCount: 'kindCount', expGain: 'expGain' }

type Props = {
  selectedId: string
  owned: Record<string, number>
  onSelect: (id: string) => void
}

// ★を列にした素材の系統図。選んだ品の系統の線を光らせる
export default function RecipeTree({ selectedId, owned, onSelect }: Props) {
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)
  const t = useTranslations('warehouse', WAREHOUSE_TRANSLATION_MAPPING)
  const { up, down } = useMemo(() => lineage(selectedId), [selectedId])
  const isHot = (id: string) => up.has(id) || down.has(id)

  return (
    <div className="warehouse-tree">
      {RARITIES.map((r, i) => {
        const list = materials.filter((it) => it.rarity === r)
        return (
          <div key={r} className={`warehouse-tree-col is-rarity-${r}`} style={{ left: COL_X[i] + 4 }}>
            <span className="warehouse-stars">
              {'★'.repeat(r)}
              <i>{'★'.repeat(RARITIES.length - r)}</i>
            </span>
            <small>
              <b>{list.filter((it) => (owned[it.id] ?? 0) > 0).length}</b>/{fill(t.kindCount, list.length)}
            </small>
          </div>
        )
      })}

      {bands.map((b) => (
        <div key={b.kind} className="warehouse-tree-band" style={{ top: b.y }}>
          {tItem[KIND_LABEL[b.kind]]}
        </div>
      ))}

      <svg className="warehouse-tree-lines">
        {edges.map((e) => {
          const from = positions.get(e.from)!
          const to = positions.get(e.to)!
          const x1 = from.x + CELL_W
          const y1 = from.y + CELL_H / 2
          const x2 = to.x
          const y2 = to.y + CELL_H / 2
          const mx = (x1 + x2) / 2
          const hot = (up.has(e.from) && up.has(e.to)) || (down.has(e.from) && down.has(e.to))
          return (
            <g key={`${e.from}-${e.to}`} className={hot ? 'is-hot' : undefined}>
              <path d={`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`} />
              <text x={mx} y={(y1 + y2) / 2 + 7}>
                ×{e.count}
              </text>
            </g>
          )
        })}
      </svg>

      {[...positions].map(([id, p]) => {
        const item = items[id]
        const count = owned[id] ?? 0
        const className = [
          'warehouse-cell',
          `is-rarity-${item.rarity}`,
          count === 0 && 'is-zero',
          isHot(id) && 'is-hot',
          id === selectedId && 'is-active',
        ]
          .filter(Boolean)
          .join(' ')
        return (
          <button
            key={id}
            type="button"
            className={className}
            style={{ left: p.x, top: p.y }}
            aria-pressed={id === selectedId}
            onClick={() => onSelect(id)}
          >
            <HexIcon item={item} />
            <span className="warehouse-cell-name">
              {tItem[item.nameKey]}
              {item.exp !== undefined && <small>{fill(t.expGain, item.exp)}</small>}
            </span>
            <span className="warehouse-cell-count">{count}</span>
          </button>
        )
      })}
    </div>
  )
}
