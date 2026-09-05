import type { PartyPayload } from '../../../src/api/types'
import { resolveSaveParty } from '../../../src/features/characters/resolveParty'
import type { Command } from './types'

// POST /party
export const save: Command<null> = (me, body) => ({
  me: resolveSaveParty(me, body as PartyPayload),
  result: null,
})
