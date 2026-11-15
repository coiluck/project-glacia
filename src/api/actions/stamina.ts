import { apiPost } from '../client'
import { distribute } from '../sync'
import type { CommandResponse, StaminaRecoverPayload } from '../../features/contract'

// スタミナ回復アイテムを使う
export async function recoverStamina(payload: StaminaRecoverPayload): Promise<void> {
  const res = await apiPost<CommandResponse<null>>('/stamina/recover', payload)
  distribute(res.me)
}
