import type { PartyPayload } from '../../../src/features/contract'
import { resolveSaveParty } from '../../../src/features/characters/resolveParty'
import type { Command } from './types'

// POST /party
export const save: Command<null> = (me, body) => ({
  me: resolveSaveParty(me, body as PartyPayload),
  result: null,
})
