import type { BasePayload } from '../../../src/api/types'
import {
  buildBase,
  collectBase,
  placeMember,
  removeBase,
  setBaseOutput,
  upgradeBase,
  upgradeTower,
} from '../../../src/features/base/base'
import { refine } from '../../../src/features/base/refine'
import type { Command } from './types'

// POST /base
export const run: Command<null> = (me, body, ctx) => {
  const b = body as BasePayload

  switch (b.kind) {
    case 'collect':
      return { me: collectBase(me, ctx.now), result: null }
    case 'build':
      return { me: buildBase(me, b.pos, b.building, b.output, ctx.now), result: null }
    case 'remove':
      return { me: removeBase(me, b.pos, ctx.now), result: null }
    case 'upgrade':
      return { me: upgradeBase(me, b.pos, ctx.now), result: null }
    case 'output':
      return { me: setBaseOutput(me, b.pos, b.output, ctx.now), result: null }
    case 'place':
      return { me: placeMember(me, b.characterId, b.pos, ctx.now), result: null }
    case 'upgradeTower':
      return { me: upgradeTower(me, ctx.now), result: null }
    case 'refine':
      return { me: refine(me, b.itemId, b.count), result: null }
    default:
      throw new Error('基地の種別が不正')
  }
}
