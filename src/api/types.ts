import type { UserCharacter } from '../data/characters/types'

// Cloudflare Workers (D1) が返すユーザーデータ
export interface UserRow {
  // --- account（accountStore）---
  id: string
  username: string

  // --- rank（rankStore）---
  rank: number
  total_exp: number
  exp_in_rank: number
  exp_to_next: number

  // --- stamina（staminaStore）---
  stamina: number
  stamina_max: number
  stamina_recovering_seconds: number
  stamina_recovering_seconds_max: number

  // --- resources（resourceStore）---
  currency: number
  gems: number

  // --- gacha（gachaStore）---
  pity: number

  // --- progress（progressStore）---
  chapter: number
  current_chapter: number
  cleared_stage_ids: string[]

  // --- tutorial（tutorialStore）---
  tutorial_steps: string[] // 完了済みステップID
}

export interface MeResponse {
  user: UserRow
  characters: UserCharacter[]
  party: Record<number, string[]> // キーは1 ~ 4。valueはCharacterMaster.id[]
}

export interface CommandResponse<T> {
  me: MeResponse
  result: T // そのコマンド固有の結果
}

// PUT /party のリクエスト。編成画面を出るときにまとめて送る
export interface PartyPayload {
  party: Record<number, string[]>
  selectedSkills: Record<string, string> // CharacterMaster.id -> SkillDef.id
}
