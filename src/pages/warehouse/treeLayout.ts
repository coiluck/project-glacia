import { items, type ItemDef, type ItemKind } from '../../data/items'
import { RARITIES } from '../../data/characters/const'

export interface TreeCell {
  item: ItemDef
  col: number // ★ - 1
  row: number // 種類の中での段。合成品は材料の間に入るので小数になる
}

export interface TreeSection {
  kind: ItemKind
  cells: TreeCell[]
  rows: number
}

const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length

// ★を列にして、レシピでつながる品が近くに来るように段を決める
function layoutKind(kind: ItemKind): TreeSection {
  const list = Object.values(items).filter((it) => it.kind === kind)
  const column = (rarity: number) => list.filter((it) => it.rarity === rarity)
  const rowOf = new Map<string, number>()

  // ★1 は合成先（★2の列）の並びの平均で並べる。合成先がなければ後ろ
  const next = column(2)
  const order = (it: ItemDef) => {
    const at = next.flatMap((p, i) => (p.recipe?.some((c) => c.itemId === it.id) ? [i] : []))
    return at.length ? avg(at) : next.length
  }
  column(1)
    .sort((a, b) => order(a) - order(b))
    .forEach((it, i) => rowOf.set(it.id, i))

  // ★2 以上は材料の段の平均に置き、重なるぶんは下へずらす
  for (const rarity of RARITIES.slice(1)) {
    const placed = column(rarity)
      .map((it) => {
        const from = (it.recipe ?? []).flatMap((c) => rowOf.get(c.itemId) ?? [])
        return { it, ideal: from.length ? avg(from) : 0 }
      })
      .sort((a, b) => a.ideal - b.ideal)
    let prev = -1
    for (const { it, ideal } of placed) {
      prev = Math.max(ideal, prev + 1)
      rowOf.set(it.id, prev)
    }
  }

  const cells = list.map((it) => ({ item: it, col: it.rarity - 1, row: rowOf.get(it.id) ?? 0 }))
  return { kind, cells, rows: Math.max(...cells.map((c) => c.row)) + 1 }
}

export const treeSections: TreeSection[] = (['material', 'book', 'exp'] as ItemKind[]).map(layoutKind)
