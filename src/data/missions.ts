// 任務の定義
// 数え方と受取は features/mission/ にある。
import { chapters, type Stage } from './stages'

// デイリー任務で数えるイベント
export type MissionEvent =
  | 'battleWin' // 戦闘に勝利（スキップを含む）
  | 'battleWinManual' // スキップせずに勝利
  | 'staminaSpent' // スタミナを消費（敗北を含む）
  | 'exchangeClaim' // 交換材料を受け取る
  | 'exchangeTrade' // 取引所で交換
  | 'currencySpent' // 紙幣を使う

export type MissionTier = 'light' | 'medium' | 'heavy'

// プールの1件。目標値は targets からその日の乱数で選ぶ
export interface DailyMissionDef {
  event: MissionEvent
  targets: number[]
}

// 1日の枠。段ごとのジェムは固定で、中身だけが日替わり。重い順に後ろへ並べる
export const DAILY_SLOTS: { tier: MissionTier; gems: number }[] = [
  { tier: 'light', gems: 10 },
  { tier: 'medium', gems: 15 },
  { tier: 'medium', gems: 15 },
  { tier: 'heavy', gems: 20 },
]

// 全枠を受け取ったときに追加で付く
export const DAILY_ALL_CLEAR_GEMS = 20

// 段ごとのプール
export const DAILY_POOL: Record<MissionTier, DailyMissionDef[]> = {
  light: [
    { event: 'battleWin', targets: [1] },
    { event: 'staminaSpent', targets: [20] },
    { event: 'exchangeClaim', targets: [1] },
    { event: 'exchangeTrade', targets: [1] },
  ],
  medium: [
    { event: 'battleWin', targets: [3] },
    { event: 'staminaSpent', targets: [40, 50] },
    { event: 'exchangeTrade', targets: [3] },
    { event: 'currencySpent', targets: [1000, 1500] },
  ],
  heavy: [
    { event: 'battleWin', targets: [5] },
    { event: 'staminaSpent', targets: [80, 100] },
    { event: 'battleWinManual', targets: [3] },
  ],
}

// 永続任務の達成条件。どれも MeResponse から判定できる
export type PermanentCondition =
  | { kind: 'stageClear'; stageId: string }
  | { kind: 'rank'; rank: number }
  | { kind: 'characterLevel'; level: number } // 誰か1人が到達
  | { kind: 'limitBreak'; count: number } // 誰か1人の上限解放の回数
  | { kind: 'skillLevel'; level: number } // どれか1つのスキルが到達
  | { kind: 'characterCount'; count: number }

export interface PermanentMissionDef {
  id: string
  condition: PermanentCondition
  gems: number
}

// ステージ初回クリアのジェム
function stageClearGems(stage: Stage): number {
  if (stage.id === '1-1') return 1000
  return stage.next?.length ? 50 : 150
}

// ステージのぶんは stages.ts から作るので、ステージを足せば任務も増える
const stageMissions: PermanentMissionDef[] = chapters
  .flatMap((c) => c.stages)
  .map((stage) => ({
    id: `stage-${stage.id}`,
    condition: { kind: 'stageClear', stageId: stage.id },
    gems: stageClearGems(stage),
  }))

export const PERMANENT_MISSIONS: PermanentMissionDef[] = [
  ...stageMissions,
  { id: 'rank-5', condition: { kind: 'rank', rank: 5 }, gems: 100 },
  { id: 'rank-10', condition: { kind: 'rank', rank: 10 }, gems: 100 },
  { id: 'rank-15', condition: { kind: 'rank', rank: 15 }, gems: 100 },
  { id: 'rank-20', condition: { kind: 'rank', rank: 20 }, gems: 100 },
  { id: 'rank-30', condition: { kind: 'rank', rank: 30 }, gems: 100 },
  { id: 'rank-40', condition: { kind: 'rank', rank: 40 }, gems: 100 },
  { id: 'rank-50', condition: { kind: 'rank', rank: 50 }, gems: 100 },
  { id: 'level-10', condition: { kind: 'characterLevel', level: 10 }, gems: 50 },
  { id: 'level-20', condition: { kind: 'characterLevel', level: 20 }, gems: 100 },
  { id: 'level-30', condition: { kind: 'characterLevel', level: 30 }, gems: 100 },
  { id: 'level-40', condition: { kind: 'characterLevel', level: 40 }, gems: 100 },
  { id: 'level-50', condition: { kind: 'characterLevel', level: 50 }, gems: 100 },
  { id: 'level-60', condition: { kind: 'characterLevel', level: 60 }, gems: 100 },
  { id: 'limit-break-1', condition: { kind: 'limitBreak', count: 1 }, gems: 100 },
  { id: 'skill-level-2', condition: { kind: 'skillLevel', level: 2 }, gems: 100 },
  { id: 'skill-level-5', condition: { kind: 'skillLevel', level: 5 }, gems: 100 },
  { id: 'skill-level-7', condition: { kind: 'skillLevel', level: 7 }, gems: 100 },
  { id: 'characters-4',  condition: { kind: 'characterCount', count: 4 }, gems: 100 },
  { id: 'characters-9',  condition: { kind: 'characterCount', count: 9 }, gems: 100 },
]
