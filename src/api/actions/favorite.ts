import { apiPost } from '../client'
import { distribute } from '../sync'
import type { CommandResponse, FavoritePayload } from '../types'

// お気に入りキャラを変える
export async function setFavoriteCharacter(masterId: string): Promise<void> {
  const payload: FavoritePayload = { masterId }
  const res = await apiPost<CommandResponse<null>>('/favorite', payload)
  distribute(res.me)
}
