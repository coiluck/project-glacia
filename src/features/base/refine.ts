import type { MeResponse } from '../../api/types'
import { items } from '../../data/items'
import { addItems, hasItems, spendItems } from '../inventory/inventory'

// 精錬所で手持ちの素材を recipe どおりに合成する
export function refine(me: MeResponse, itemId: string, count: number): MeResponse {
  const recipe = items[itemId]?.recipe
  if (!recipe) throw new Error(`合成できないアイテム: ${itemId}`)
  if (!Number.isInteger(count) || count <= 0) throw new Error(`個数が不正: ${count}`)

  const costs = recipe.map((c) => ({ itemId: c.itemId, count: c.count * count }))
  if (!hasItems(me.user.items, costs)) throw new Error('素材が足りない')

  return {
    ...me,
    user: { ...me.user, items: addItems(spendItems(me.user.items, costs), [{ itemId, count }]) },
  }
}
