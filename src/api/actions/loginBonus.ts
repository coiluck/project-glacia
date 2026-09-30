import { apiPost } from '../client'
import { distribute } from '../sync'
import type { CommandResponse, LoginBonusResult } from '../types'

// 本日分のログインボーナスを受け取る
export async function claimLoginBonus(): Promise<number> {
  const res = await apiPost<CommandResponse<LoginBonusResult>>('/login-bonus', {})
  distribute(res.me)
  return res.result.count
}
