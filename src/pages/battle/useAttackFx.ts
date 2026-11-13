import { useEffect, useRef, useState } from 'react'
import type { BattleAction } from '../../features/battle/replay'
import type { BattleStageData, BattleState } from '../../features/battle/types'
import { attackFxOf } from './attackFx'
import type { FxBatch } from './attackFx'

// state が変わるたびに直前の state と比べ、攻撃の演出を積む。演出が終わったものから外す
// 演出は CSS の animation-delay で時間差をつけるので、積むのは1回の行動につき1度だけ
export function useAttackFx(
  state: BattleState | null,
  stage: BattleStageData | null,
  log: BattleAction[],
): FxBatch[] {
  const [prev, setPrev] = useState(state)
  const [batches, setBatches] = useState<FxBatch[]>([])
  const [nextId, setNextId] = useState(0)

  // 決着の一撃は phase が変わった最初の描画で盤面を消させないよう、effect ではなく描画中に積む
  if (prev !== state) {
    setPrev(state)
    const last = log.at(-1)
    const fx =
      prev && state && stage
        ? attackFxOf(nextId, prev, state, stage, last?.type === 'skill' ? last.aim : undefined)
        : null
    if (fx) {
      setBatches([...batches, fx])
      setNextId(nextId + 1)
    }
  }

  const scheduled = useRef(new Set<number>())
  useEffect(() => {
    for (const batch of batches) {
      if (scheduled.current.has(batch.id)) continue
      scheduled.current.add(batch.id)
      setTimeout(() => setBatches((list) => list.filter((b) => b.id !== batch.id)), batch.end)
    }
  }, [batches])

  return batches
}
