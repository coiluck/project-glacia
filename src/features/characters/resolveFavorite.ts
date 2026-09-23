// お気に入りキャラ変更のサーバー側の処理。所持していないキャラは弾く
import type { MeResponse } from '../../api/types'

export function resolveFavorite(me: MeResponse, masterId: string): MeResponse {
  if (!me.characters.some((c) => c.masterId === masterId)) {
    throw new Error(`所持していないキャラ: ${masterId}`)
  }
  return { ...me, user: { ...me.user, favorite_character_id: masterId } }
}
