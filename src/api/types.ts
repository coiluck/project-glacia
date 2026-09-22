import type { MaterialCost, UserCharacter } from '../data/characters/types'

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
  stamina_updated_at: number

  // --- resources（resourceStore）---
  currency: number
  gems: number

  // --- gacha（gachaStore）---
  pity: number

  // --- progress（progressStore）---
  chapter: number
  cleared_stage_ids: string[]

  // --- tutorial（tutorialStore）---
  tutorial_steps: string[] // 完了済みステップID

  // --- inventory（inventoryStore）---
  items: Record<string, number> // itemId -> 個数。0個になったキーは残さない

  // --- exchange（exchangeStore）---
  exchange_tokens: number // 交換材料
  exchange_claimed_day: number // 本日分の交換材料を受け取った日（features/daily/day.ts の dayIndex）
  exchange_bought_day: number // exchange_bought がどの日のものか
  exchange_bought: number[] // その日に交換済みの枠（lineupFor の添字）

  // --- loginBonus（loginBonusStore）---
  login_claimed_day: number // 最後にログインボーナスを受け取った日（dayIndex）
  login_count: number // その日の月に受け取った回数
}

export interface MeResponse {
  user: UserRow
  characters: UserCharacter[]
  party: Record<number, string[]> // キーは1 ~ 4。valueはCharacterMaster.id[]
  now: number // サーバーのUnix秒。フロントはこれを基準にスタミナの回復を表示する
}

export interface CommandResponse<T> {
  me: MeResponse
  result: T // そのコマンド固有の結果
}

// /auth/register と /auth/login の result。
export interface AuthResult {
  token: string
}

// POST /party のリクエスト
export interface PartyPayload {
  party: Record<number, string[]>
  selectedSkills: Record<string, string> // CharacterMaster.id -> SkillDef.id
}

// POST /characters/enhance のリクエスト
export type EnhancePayload =
  | { kind: 'level'; masterId: string; use: MaterialCost[] } // use は消費する育成記録
  | { kind: 'limitBreak'; masterId: string }
  | { kind: 'skill'; masterId: string; skillId: string }

// POST /login-bonus の result
export interface LoginBonusResult {
  count: number // 今月何回目か
}

// POST /exchange のリクエスト
export type ExchangePayload =
  | { kind: 'claim' } // 本日分の交換材料を受け取る
  | { kind: 'buyTokens'; count: number } // 紙幣で交換材料を買う
  | { kind: 'trade'; slot: number } // 今日のラインナップの枠を交換する
