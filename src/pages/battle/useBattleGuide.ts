import { useState } from 'react'
import { allowsGuide, isPhaseWait } from '../../features/tutorial/guide'
import type { BattleGuideDef, GuideAction } from '../../features/tutorial/guide'
import type { BattlePhase } from '../../features/battle/types'

// 戦闘中のガイドの進行。def が無ければ何も制限しない
export function useBattleGuide(def: BattleGuideDef | undefined, phase: BattlePhase | undefined) {
  const [index, setIndex] = useState(0)
  const [nudge, setNudge] = useState(0) // 違う操作が来た回数。表示側はこれが変わったら揺らす

  const step = def && index < def.steps.length ? def.steps[index] : null

  // 手番を待つステップは、その手番になったら次へ
  if (step && isPhaseWait(step.wait) && phase === step.wait.phase) setIndex(index + 1)

  // 操作はすべてここを通す
  const act = (action: GuideAction, run: () => void) => {
    if (step && !allowsGuide(step, action)) {
      setNudge((n) => n + 1)
      return
    }
    run()
    if (step) setIndex((i) => i + 1)
  }

  const next = () => setIndex((i) => i + 1)

  return { step, index, total: def?.steps.length ?? 0, nudge, act, next }
}
