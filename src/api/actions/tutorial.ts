import { apiPost } from '../client'
import { distribute } from '../sync'
import type { TutorialStep } from '../../features/tutorial/resolve'
import type { CommandResponse, TutorialPayload } from '../types'

// チュートリアルを完了済みにする
export async function finishTutorial(step: TutorialStep): Promise<void> {
  const payload: TutorialPayload = { step }
  const res = await apiPost<CommandResponse<null>>('/tutorial', payload)
  distribute(res.me)
}
