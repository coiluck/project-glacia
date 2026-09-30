import { apiPost } from '../client'
import { distribute } from '../sync'
import { useCharacterStore } from '../../stores/characterStore'
import type { CommandResponse, PartyPayload } from '../types'

// 編成とスキル選択をまとめて保存
export async function saveParty(): Promise<void> {
  const s = useCharacterStore.getState()
  if (!s.dirty) return

  const payload: PartyPayload = {
    party: s.party,
    selectedSkills: Object.fromEntries(
      Object.values(s.owned).map((c) => [c.masterId, c.selectedSkillId]),
    ),
  }

  const res = await apiPost<CommandResponse<null>>('/party', payload)
  distribute(res.me) // hydrate で dirty も戻る
}
