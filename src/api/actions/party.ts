import { apiPost } from '../client'
import { USE_MOCK, mockSaveParty } from '../mock'
import { distribute } from '../sync'
import { useCharacterStore } from '../../stores/characterStore'
import type { CommandResponse, PartyPayload } from '../types'

// 編成とスキル選択をまとめて保存する。変更が無ければ通信しない
export async function saveParty(): Promise<void> {
  const s = useCharacterStore.getState()
  if (!s.dirty) return

  const payload: PartyPayload = {
    party: s.party,
    selectedSkills: Object.fromEntries(
      Object.values(s.owned).map((c) => [c.masterId, c.selectedSkillId]),
    ),
  }

  const res = USE_MOCK
    ? await mockSaveParty(payload)
    : await apiPost<CommandResponse<null>>('/party', payload)
  distribute(res.me) // hydrate で dirty も戻る
}
