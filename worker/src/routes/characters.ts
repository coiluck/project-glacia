import type { EnhancePayload } from '../../../src/api/types'
import { levelUp, limitBreak, skillLevelUp } from '../../../src/features/characters/enhance'
import type { Command } from './types'

// POST /characters/enhance
export const enhance: Command<null> = (me, body) => {
  const b = body as EnhancePayload

  switch (b.kind) {
    case 'level':
      return { me: levelUp(me, b.masterId, b.use), result: null }
    case 'limitBreak':
      return { me: limitBreak(me, b.masterId), result: null }
    case 'skill':
      return { me: skillLevelUp(me, b.masterId, b.skillId), result: null }
    default:
      throw new Error('育成の種別が不正')
  }
}
