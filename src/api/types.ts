import type { MaterialCost, UserCharacter } from '../data/characters/types'
import type { MissionEvent } from '../data/missions'
import type { BaseBuildingKind } from '../data/base'
import type { BaseBuilding } from '../features/base/types'
import type { Axial } from '../features/battle/hex'
import type { Lang, TextSize, TextSpeed } from '../data/settings'

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

  // --- mission（missionStore）---
  mission_day: number // mission_counts と mission_claimed がどの日のものか（dayIndex）
  mission_counts: Partial<Record<MissionEvent, number>> // その日に数えたイベントの回数
  mission_claimed: number[] // その日に受け取ったデイリーの枠（dailyMissionsFor の添字）
  mission_done: string[] // 受け取った永続任務の id

  // --- お気に入りキャラ（characterStore）---
  favorite_character_id: string // CharacterMaster.id

  // --- 基地 ---
  base_board: Record<string, BaseBuilding> // axialKey -> 建物。配管もここに入る
  base_members: Record<string, string> // CharacterMaster.id -> 立っているマスの axialKey
  base_tower_level: number // 暖房塔の Lv
  base_collected_at: number // 最後に回収した時刻（Unix秒）

  // --- 設定（settingsStore）---
  settings_bgm: number // 0〜100
  settings_se: number // 0〜100
  settings_text_speed: TextSpeed
  settings_text_size: TextSize
  settings_lang: Lang
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

// POST /favorite のリクエスト
export interface FavoritePayload {
  masterId: string // CharacterMaster.id
}

// POST /settings のリクエスト。全項目をまとめて送る
export interface SettingsPayload {
  bgm: number
  se: number
  textSpeed: TextSpeed
  textSize: TextSize
  lang: Lang
}

// POST /login-bonus の result
export interface LoginBonusResult {
  count: number // 今月何回目か
}

// POST /exchange のリクエスト
export type ExchangePayload =
  | { kind: 'claim' } // 本日分の交換材料を受け取る
  | { kind: 'buyTokens'; count: number } // 紙幣で交換材料を買う
  | { kind: 'trade'; slot: number } // 今日のラインナップの枠を交換する

// POST /mission のリクエスト
export type MissionPayload =
  | { kind: 'daily'; slot: number } // 今日のデイリーの枠
  | { kind: 'dailyAll' } // 受け取れるデイリーを全部
  | { kind: 'permanent'; id: string } // 永続任務の id
  | { kind: 'permanentAll' } // 受け取れる永続任務を全部

// POST /mission の result
export interface MissionResult {
  gems: number // 受け取ったジェム。全達成ボーナスを含む
}

// POST /base のリクエスト。pos は盤面の axial 座標
export type BasePayload =
  | { kind: 'collect' } // 貯まった物を回収する
  | { kind: 'build'; pos: Axial; building: BaseBuildingKind; output?: string } // output は採掘場と書庫だけ
  | { kind: 'remove'; pos: Axial }
  | { kind: 'upgrade'; pos: Axial }
  | { kind: 'output'; pos: Axial; output: string } // 作る物を変える
  | { kind: 'place'; characterId: string; pos: Axial | null } // null で外す
  | { kind: 'upgradeTower' }
  | { kind: 'refine'; itemId: string; count: number } // 精錬所で合成する
