import { create } from 'zustand'
import { characterMasters } from '../data/characters'
import { MAX_DUPE, type UserCharacter } from '../data/characters/types'

// 召集で1体手に入れたときの結果。
// convert は凸が上限に達していて重ねられなかった場合で、変換先の付与は呼び出し側が行う
export type AcquireResult = 'new' | 'dupe' | 'convert'

// 所持キャラと編成。マスターデータ（data/characters/）は持たず、可変分だけを保存する
// （acquire で初期値を組み立てるときだけマスターを参照する）
export interface CharacterState {
  owned: Record<string, UserCharacter> // キーは CharacterMaster.id
  party: Record<number, string[]> // キーは1 ~ 4。valueはCharacterMaster.id[]
  currentPartySlotIndex: number // 選択中の編成スロット。1〜4
  setCurrentPartySlotIndex: (index: number) => void
  // 編成の characterIndex 番目を masterId に差し替える。null なら外す
  setPartyMember: (partySlotIndex: number, characterIndex: number, masterId: string | null) => void
  // 出撃時に使うスキルを差し替える。skillId は CharacterMaster.skills のいずれかの def.id
  setSelectedSkill: (masterId: string, skillId: string) => void
  // 召集で1体手に入れる。未所持なら追加、所持済みなら凸を+1する
  acquire: (masterId: string) => AcquireResult
  reset: () => void
}

// TODO: 編成画面とガチャができるまでの仮データ。サーバーから hydrate する形に差し替える
const initial = {
  owned: {
    lapis: {
      masterId: 'lapis',
      level: 15,
      exp: 0,
      limitBreak: 0,
      dupe: 0,
      selectedSkillId: 'lapisFrostBolt',
      skillLevels: { lapisFrostBolt: 2, lapisMendingLight: 1 },
    },
    vermilia: {
      masterId: 'vermilia',
      level: 10,
      exp: 0,
      limitBreak: 0,
      dupe: 0,
      selectedSkillId: 'vermiliaHeavyCleave',
      skillLevels: {},
    },
  } as Record<string, UserCharacter>,
  party: {
    1: ['alma', 'lapis', 'vermilia'],
    2: [],
    3: [],
    4: [],
  } as Record<number, string[]>,
  currentPartySlotIndex: 1,
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  ...initial,
  setCurrentPartySlotIndex: (index) => set({ currentPartySlotIndex: index }),
  setPartyMember: (partySlotIndex, characterIndex, masterId) =>
    set((s) => {
      const next = [...(s.party[partySlotIndex] ?? [])]
      // 長さが短くなりうる配列で詰めて保存
      if (masterId === null) next.splice(characterIndex, 1)
      else next[Math.min(characterIndex, next.length)] = masterId
      return { party: { ...s.party, [partySlotIndex]: next } }
    }),
  setSelectedSkill: (masterId, skillId) =>
    set((s) => {
      const character = s.owned[masterId]
      if (!character) return s
      return { owned: { ...s.owned, [masterId]: { ...character, selectedSkillId: skillId } } }
    }),
  acquire: (masterId) => {
    const master = characterMasters[masterId]
    const owned = get().owned
    const current = owned[masterId]
    if (!master) return 'convert'

    // 未所持。Lv1・凸0で加える。出撃スキルは1つ目を既定にする
    if (!current) {
      const character: UserCharacter = {
        masterId,
        level: 1,
        exp: 0,
        limitBreak: 0,
        dupe: 0,
        selectedSkillId: master.skills[0].def.id,
        skillLevels: {},
      }
      set({ owned: { ...owned, [masterId]: character } })
      return 'new'
    }

    // 凸が上限。所持データは変えず、呼び出し側で変換してもらう
    if (current.dupe >= MAX_DUPE) return 'convert'

    set({ owned: { ...owned, [masterId]: { ...current, dupe: current.dupe + 1 } } })
    return 'dupe'
  },
  reset: () => set(initial),
}))
