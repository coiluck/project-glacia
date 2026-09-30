// 戦闘中のチュートリアルガイド。台本（data/battleGuides）の型と、操作を通すかの判定
import type { UserCharacter } from '../../data/characters/types'
import type { Axial } from '../battle/hex'
import type { BattlePhase } from '../battle/types'

// BattlePage での入力の型
export type GuideAction =
  | { type: 'deploy'; charId: string; pos: Axial }
  | { type: 'undeploy'; unitId: string }
  | { type: 'startBattle' }
  | { type: 'select'; unitId: string }
  | { type: 'deselect' }
  | { type: 'move'; unitId: string; to: Axial }
  | { type: 'attackMode' }
  | { type: 'skillMode' }
  | { type: 'attack'; targetId: string }
  | { type: 'skill'; aim: Axial }
  | { type: 'undo' }
  | { type: 'endTurn' }

// 台本側の操作。type 以外の項目は省略ok
export type GuideActionPattern = {
  [K in GuideAction['type']]: { type: K } & Partial<Omit<Extract<GuideAction, { type: K }>, 'type'>>
}[GuideAction['type']]

// 注目させる場所
// tile: マス / unit: ユニット（マスと絵の両方） / ui: data-guide 属性の値
export type GuideFocus = { tile: Axial } | { unit: string } | { ui: string }

export interface GuideStep {
  speaker?: string // 喋るキャラの CharacterMaster.id。省略すると System
  textKey: string // tutorial.json のキー
  focus?: GuideFocus[] // 先頭に矢印が付く
  // tap: 説明（どこかをタップで次へ）/ 操作: その操作だけ通す / phase: その手番になるまで待つ
  wait: 'tap' | GuideActionPattern | { phase: BattlePhase }
  delay?: number // 出すまでの待ち時間（ms）。フェーズ告知と重ねないため
  dragHint?: boolean // 配置のドラッグのお手本を出すか。wait が deploy のときだけ使う
}

export interface BattleGuideDef {
  party: UserCharacter[]
  steps: GuideStep[]
}

// 操作を待つステップか
export function isActionWait(wait: GuideStep['wait']): wait is GuideActionPattern {
  return typeof wait === 'object' && 'type' in wait
}

// 手番を待つステップか
export function isPhaseWait(wait: GuideStep['wait']): wait is { phase: BattlePhase } {
  return typeof wait === 'object' && 'phase' in wait
}

// 操作が今のステップで許されるか。操作を待つステップで、書いてある項目がすべて一致するときだけ通す
export function allowsGuide(step: GuideStep, action: GuideAction): boolean {
  const wait = step.wait
  if (!isActionWait(wait) || wait.type !== action.type) return false
  const actual = action as Record<string, unknown>
  return Object.entries(wait).every(([key, expected]) => {
    if (key === 'type') return true
    const value = actual[key]
    if (typeof expected === 'object') {
      const pos = value as Axial | undefined
      return pos !== undefined && pos.q === expected.q && pos.r === expected.r
    }
    return value === expected
  })
}
