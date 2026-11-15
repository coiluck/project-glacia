import type { StaminaRecoverPayload } from '../../../src/features/contract'
import { recoverStamina } from '../../../src/features/stamina/recover'
import type { Command } from './types'

// POST /stamina/recover
export const recover: Command<null> = (me, body, ctx) => ({
  me: recoverStamina(me, body as StaminaRecoverPayload, ctx.now),
  result: null,
})
