// 編成保存のサーバー側の処理。所持していないキャラや持っていないスキルは弾く
import type { MeResponse, PartyPayload } from '../contract'
import { characterMasters } from '../../data/characters'
import { PARTY_SIZE } from '../../data/characters/const'

export function resolveSaveParty(me: MeResponse, payload: PartyPayload): MeResponse {
  const owned = new Set(me.characters.map((c) => c.masterId))

  const party: Record<number, string[]> = {}
  for (const [slot, ids] of Object.entries(payload.party)) {
    // 戦闘の再生は保存済みの編成で組み立てるので、人数の上限はここで守る
    if (ids.length > PARTY_SIZE) throw new Error(`編成の人数が多すぎる: ${ids.length}`)
    party[Number(slot)] = ids.filter((id) => owned.has(id))
  }

  const characters = me.characters.map((c) => {
    const skillId = payload.selectedSkills[c.masterId]
    const has = characterMasters[c.masterId]?.skills.some((s) => s.def.id === skillId)
    return has ? { ...c, selectedSkillId: skillId } : c
  })

  return { ...me, party, characters }
}
