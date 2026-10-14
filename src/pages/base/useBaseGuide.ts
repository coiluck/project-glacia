import { useState } from 'react'
import { finishTutorial } from '../../api/actions/tutorial'
import { axialKey } from '../../features/battle/hex'
import type { BaseGuideStep } from '../../features/tutorial/guide'

// 画面の状態のうち、操作を待つステップが見るもの
interface GuideWatch {
  selectedKey: string | null
  membersOpen: boolean
  members: Record<string, string> // キャラの id -> 立っているマスの axialKey
}

// 操作を待つステップで、その操作が済んだか
function reached(wait: BaseGuideStep['wait'], watch: GuideWatch): boolean {
  if (wait === 'tap') return false
  if (wait === 'members') return watch.membersOpen
  if ('place' in wait) return watch.members[wait.place] === axialKey(wait.at)
  return watch.selectedKey === axialKey(wait.select)
}

// 基地のガイドの進行
export function useBaseGuide(steps: BaseGuideStep[] | null, watch: GuideWatch) {
  const [index, setIndex] = useState(0)
  const [nudge, setNudge] = useState(0) // 注目箇所の外を押した回数。表示側はこれが変わったら揺らす

  const step = steps && index < steps.length ? steps[index] : null

  if (step && reached(step.wait, watch)) setIndex(index + 1)

  const next = () => {
    if (steps && index === steps.length - 1) finishTutorial('base').catch(console.error)
    setIndex(index + 1)
  }

  return { step, index, total: steps?.length ?? 0, nudge, miss: () => setNudge((n) => n + 1), next }
}
