import { create } from 'zustand'
import type { MeResponse } from '../api/types'
import type { UserCharacter } from '../data/characters/types'

// お気に入りキャラの初期値
const DEFAULT_FAVORITE_CHARACTER_ID = 'lapis'

// 所持キャラ・編成・お気に入りキャラ
export interface CharacterState {
  owned: Record<string, UserCharacter> // キーは CharacterMaster.id
  favoriteCharacterId: string // トップとリソースバーに出すキャラ。空にはならない
  party: Record<number, string[]> // キーは1 ~ 4。valueはCharacterMaster.id[]
  currentPartySlotIndex: number // 1〜4。画面の選択状態なので保存しない
  dirty: boolean // 未保存の編成・スキル変更があるか。api/actions/party.ts が見る
  setCurrentPartySlotIndex: (index: number) => void
  setPartyMember: (partySlotIndex: number, characterIndex: number, masterId: string | null) => void
  setSelectedSkill: (masterId: string, skillId: string) => void
  hydrate: (me: MeResponse) => void
  reset: () => void
}

const initial = {
  owned: {} as Record<string, UserCharacter>,
  favoriteCharacterId: DEFAULT_FAVORITE_CHARACTER_ID,
  party: {
    1: [],
    2: [],
    3: [],
    4: [],
  } as Record<number, string[]>,
  currentPartySlotIndex: 1,
  dirty: false,
}

export const useCharacterStore = create<CharacterState>((set) => ({
  ...initial,
  setCurrentPartySlotIndex: (index) => set({ currentPartySlotIndex: index }),
  setPartyMember: (partySlotIndex, characterIndex, masterId) =>
    set((s) => {
      const next = [...(s.party[partySlotIndex] ?? [])]
      // 長さが短くなりうる配列で詰めて保存
      if (masterId === null) next.splice(characterIndex, 1)
      else next[Math.min(characterIndex, next.length)] = masterId
      return { party: { ...s.party, [partySlotIndex]: next }, dirty: true }
    }),
  setSelectedSkill: (masterId, skillId) =>
    set((s) => {
      const character = s.owned[masterId]
      if (!character) return s
      return {
        owned: { ...s.owned, [masterId]: { ...character, selectedSkillId: skillId } },
        dirty: true,
      }
    }),
  hydrate: (me) =>
    set({
      owned: Object.fromEntries(me.characters.map((c) => [c.masterId, c])),
      favoriteCharacterId: me.user.favorite_character_id,
      party: me.party,
      dirty: false,
    }),
  reset: () => set(initial),
}))
