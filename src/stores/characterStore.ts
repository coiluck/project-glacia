import { create } from 'zustand'
import type { UserCharacter } from '../data/characters/types'

// 所持キャラと編成。マスターデータ（data/characters/）は持たず、可変分だけを保存する
export interface CharacterState {
  owned: Record<string, UserCharacter> // キーは CharacterMaster.id
  party: Record<number, string[]> // キーは1 ~ 4。valueはCharacterMaster.id[]
  currentPartySlotIndex: number // 選択中の編成スロット。1〜4
  setCurrentPartySlotIndex: (index: number) => void
  reset: () => void
}

// TODO: 編成画面とガチャができるまでの仮データ。サーバーから hydrate する形に差し替える
const initial = {
  owned: {
    alma: {
      masterId: 'alma',
      level: 20,
      exp: 0,
      limitBreak: 0,
      dupe: 1,
      selectedSkillId: 'almaPiercingThrust',
      skillLevels: { almaPiercingThrust: 3, almaSilverBanner: 1 },
    },
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

export const useCharacterStore = create<CharacterState>((set) => ({
  ...initial,
  setCurrentPartySlotIndex: (index) => set({ currentPartySlotIndex: index }),
  reset: () => set(initial),
}))
