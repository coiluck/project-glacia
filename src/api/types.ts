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

  // --- progress（progressStore）---
  chapter: number
  current_chapter: number
  cleared_stage_ids: string[]

  // --- tutorial（tutorialStore）---
  tutorial_steps: string[] // 完了済みステップID
}
