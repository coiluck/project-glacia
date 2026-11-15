import { apiPost } from '../client'
import { distribute } from '../sync'
import type { CommandResponse, MailPayload } from '../../features/contract'

// メールの報酬を受け取る
export async function claimMail(payload: MailPayload): Promise<void> {
  const res = await apiPost<CommandResponse<null>>('/mail', payload)
  distribute(res.me)
}
