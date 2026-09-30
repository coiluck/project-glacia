import { resolvePull } from '../../../src/features/gacha/resolve'
import type { PullOutcome } from '../../../src/features/gacha/types'
import type { Command } from './types'

// POST /gacha/pull
export const pull: Command<PullOutcome[]> = (me, body) => {
  const { count } = body as { count: number }
  const resolved = resolvePull(me, count)
  return { me: resolved.me, result: resolved.pulls }
}
