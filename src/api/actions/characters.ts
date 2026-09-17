import { apiPost } from '../client'
import { distribute } from '../sync'
import type { CommandResponse, EnhancePayload } from '../types'

// 育成（レベルアップ・上限解放・スキルレベル上げ）。結果は全状態の hydrate で反映される
export async function enhanceCharacter(payload: EnhancePayload): Promise<void> {
  const res = await apiPost<CommandResponse<null>>('/characters/enhance', payload)
  distribute(res.me)
}
