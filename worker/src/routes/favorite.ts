import type { FavoritePayload } from '../../../src/api/types'
import { resolveFavorite } from '../../../src/features/characters/resolveFavorite'
import type { Command } from './types'

// POST /favorite
export const set: Command<null> = (me, body) => ({
  me: resolveFavorite(me, (body as FavoritePayload).masterId),
  result: null,
})
