// ステージのドロップ抽選
import type { MaterialCost } from '../../data/characters/types'
import type { DropEntry } from '../../data/drops'

// 同じアイテムが分かれているのでidでまとめてから返す
export function rollDrops(table: DropEntry[]): MaterialCost[] {
  const counts = new Map<string, number>()

  for (const entry of table) {
    if (entry.rate !== undefined && Math.random() >= entry.rate) continue
    counts.set(entry.itemId, (counts.get(entry.itemId) ?? 0) + entry.count)
  }

  return [...counts].map(([itemId, count]) => ({ itemId, count }))
}
