import { useCallback, useRef, useState } from 'react'
import type { BattleResult, BattleReward } from '../features/battle/resolveResult'
import { useRankStore } from '../stores/rankStore'

export interface RankSnapshot {
  rank: number
  expInRank: number
  expToNext: number
}

export interface BattleResultSubmission {
  stageId: string
  result: BattleResult
  reward: BattleReward | null
  rankBefore: RankSnapshot
  failed: boolean
}

type RewardRequest = () => Promise<BattleReward>

// 結果送信の状態を管理し、リザルト表示からAPI呼び出しを分離する
export function useBattleResultSubmission() {
  const [submission, setSubmission] = useState<BattleResultSubmission | null>(null)
  const requestRef = useRef<RewardRequest | null>(null)
  const requestIdRef = useRef(0)

  const run = useCallback((request: RewardRequest, initial?: BattleResultSubmission) => {
    const requestId = ++requestIdRef.current
    if (initial) {
      setSubmission(initial)
    } else {
      setSubmission((current) => current && { ...current, reward: null, failed: false })
    }

    void request()
      .then((reward) => {
        if (requestIdRef.current !== requestId) return
        setSubmission((current) => current && { ...current, reward })
      })
      .catch((error: unknown) => {
        console.error(error)
        if (requestIdRef.current !== requestId) return
        setSubmission((current) => current && { ...current, failed: true })
      })
  }, [])

  const submit = useCallback(
    (stageId: string, result: BattleResult, request: RewardRequest) => {
      const rank = useRankStore.getState()
      const initial: BattleResultSubmission = {
        stageId,
        result,
        reward: null,
        rankBefore: {
          rank: rank.rank,
          expInRank: rank.expInRank,
          expToNext: rank.expToNext,
        },
        failed: false,
      }
      requestRef.current = request
      run(request, initial)
    },
    [run],
  )

  const retry = useCallback(() => {
    if (requestRef.current) run(requestRef.current)
  }, [run])

  const clear = useCallback(() => {
    requestIdRef.current += 1
    requestRef.current = null
    setSubmission(null)
  }, [])

  return { submission, submit, retry, clear }
}
