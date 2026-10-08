import { resolveCeilingExchange, resolvePull } from '../../../src/features/gacha/resolve'
import type { PullOutcome } from '../../../src/features/gacha/types'
import type { BannerId } from '../../../src/data/gacha'
import type { Command } from './types'

// POST /gacha/pull
export const pull: Command<PullOutcome[]> = (me, body) => {
  const { count, banner } = body as { count: number; banner: BannerId }
  const resolved = resolvePull(me, count, banner)
  return { me: resolved.me, result: resolved.pulls }
}

// POST /gacha/exchange
export const exchange: Command<PullOutcome> = (me, body) => {
  const { masterId } = body as { masterId: string }
  const resolved = resolveCeilingExchange(me, masterId)
  return { me: resolved.me, result: resolved.outcome }
}
