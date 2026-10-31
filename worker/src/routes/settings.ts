import type { SettingsPayload } from '../../../src/features/contract'
import { resolveSettings } from '../../../src/features/settings/resolveSettings'
import type { Command } from './types'

// POST /settings
export const save: Command<null> = (me, body) => ({
  me: resolveSettings(me, body as SettingsPayload),
  result: null,
})
