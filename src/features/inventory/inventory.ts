import type { MaterialCost } from '../../data/characters/types'

// アイテムを加える
export function addItems(
  items: Record<string, number>,
  gains: MaterialCost[],
): Record<string, number> {
  const next = { ...items }
  for (const gain of gains) next[gain.itemId] = (next[gain.itemId] ?? 0) + gain.count
  return next
}

// 素材が足りているか
export function hasItems(items: Record<string, number>, costs: MaterialCost[]): boolean {
  return costs.every((cost) => (items[cost.itemId] ?? 0) >= cost.count)
}

// 素材を引く
export function spendItems(
  items: Record<string, number>,
  costs: MaterialCost[],
): Record<string, number> {
  const next = { ...items }
  for (const cost of costs) {
    const rest = (next[cost.itemId] ?? 0) - cost.count
    if (rest > 0) next[cost.itemId] = rest
    else delete next[cost.itemId]
  }
  return next
}
