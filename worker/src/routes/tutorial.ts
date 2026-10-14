import type { TutorialPayload } from '../../../src/api/types'
import { completeTutorial } from '../../../src/features/tutorial/resolve'
import type { Command } from './types'

// POST /tutorial
export const complete: Command<null> = (me, body) => ({
  me: completeTutorial(me, (body as TutorialPayload).step),
  result: null,
})
