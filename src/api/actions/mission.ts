import { apiPost } from '../client'
import { distribute } from '../sync'
import type { CommandResponse, MissionPayload, MissionResult } from '../types'

// 任務の報酬を受け取る。受け取ったジェムの数を返す
export async function claimMission(payload: MissionPayload): Promise<number> {
  const res = await apiPost<CommandResponse<MissionResult>>('/mission', payload)
  distribute(res.me)
  return res.result.gems
}
