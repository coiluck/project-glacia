import type { MeResponse, StaminaRecoverPayload } from '../contract'
import { items } from '../../data/items'
import { hasItems, spendItems } from '../inventory/inventory'
import { refreshStamina } from './stamina'

// スタミナ回復アイテムを使う。上限を超えて回復する
export function recoverStamina(
  me: MeResponse,
  { itemId, count }: StaminaRecoverPayload,
  now: number,
): MeResponse {
  const amount = items[itemId]?.stamina
  if (!amount) throw new Error(`スタミナを回復できないアイテム: ${itemId}`)
  if (!Number.isInteger(count) || count <= 0) throw new Error(`個数が不正: ${count}`)

  const costs = [{ itemId, count }]
  if (!hasItems(me.user.items, costs)) throw new Error('アイテムが足りない')

  // 自然回復ぶんを先に入れてから足す
  const user = refreshStamina(me.user, now)
  return {
    ...me,
    user: refreshStamina(
      { ...user, items: spendItems(user.items, costs), stamina: user.stamina + amount * count },
      now,
    ),
  }
}
