// 編成保存のサーバー側の処理。所持していないキャラや持っていないスキルは弾く
import type { MeResponse, PartyPayload } from '../../api/types'
import { characterMasters } from '../../data/characters'

export function resolveSaveParty(me: MeResponse, payload: PartyPayload): MeResponse {
  const owned = new Set(me.characters.map((c) => c.masterId))

  const party: Record<number, string[]> = {}
  for (const [slot, ids] of Object.entries(payload.party)) {
    party[Number(slot)] = ids.filter((id) => owned.has(id))
  }

  const characters = me.characters.map((c) => {
    const skillId = payload.selectedSkills[c.masterId]
    const has = characterMasters[c.masterId]?.skills.some((s) => s.def.id === skillId)
    return has ? { ...c, selectedSkillId: skillId } : c
  })

  return { ...me, party, characters }
}
