// チュートリアル完了のサーバー側の処理
import type { MeResponse } from '../../api/types'

// チュートリアルのステップ
export const TUTORIAL_STEPS = ['intro', 'firstBattle', 'gacha', 'base'] as const
export type TutorialStep = (typeof TUTORIAL_STEPS)[number]

// ステップを完了済みにする。済んでいれば何もしない
export function completeTutorial(me: MeResponse, step: string): MeResponse {
  if (!(TUTORIAL_STEPS as readonly string[]).includes(step)) {
    throw new Error(`チュートリアルのステップが不正: ${step}`)
  }
  if (me.user.tutorial_steps.includes(step)) return me
  return { ...me, user: { ...me.user, tutorial_steps: [...me.user.tutorial_steps, step] } }
}
