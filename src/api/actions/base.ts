import { apiPost } from '../client'
import { distribute } from '../sync'
import type { BasePayload, CommandResponse } from '../types'

// 基地の操作（回収・建設・撤去・強化・作る物の変更・配置・暖房塔の強化・精錬）。結果は全状態の hydrate で反映される
export async function operateBase(payload: BasePayload): Promise<void> {
  const res = await apiPost<CommandResponse<null>>('/base', payload)
  distribute(res.me)
}
