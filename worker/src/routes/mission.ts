import type { MeResponse, MissionPayload, MissionResult } from '../../../src/api/types'
import { claimAllDailyMissions, claimDailyMission } from '../../../src/features/mission/daily'
import {
  claimAllPermanentMissions,
  claimPermanentMission,
} from '../../../src/features/mission/permanent'
import type { Command } from './types'

// POST /mission
export const claim: Command<MissionResult> = (me, body, ctx) => {
  const b = body as MissionPayload
  const done = (next: MeResponse) => ({ me: next, result: { gems: next.user.gems - me.user.gems } })

  switch (b.kind) {
    case 'daily':
      return done(claimDailyMission(me, b.slot, ctx.now))
    case 'dailyAll':
      return done(claimAllDailyMissions(me, ctx.now))
    case 'permanent':
      return done(claimPermanentMission(me, b.id))
    case 'permanentAll':
      return done(claimAllPermanentMissions(me))
    default:
      throw new Error('任務の種別が不正')
  }
}
