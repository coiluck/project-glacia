// 攻撃演出の組み立て。見た目だけのデータで、戦闘の結果には関わらない
// 操作の前後の BattleState を比べて、誰が誰に何をしたかを読み取る。エンジンは何も知らせない
import { aimableTilesOnBoard } from '../../features/battle/battle'
import { axialKey, distance, effectTiles } from '../../features/battle/hex'
import type { Axial } from '../../features/battle/hex'
import type { BattleStageData, BattleState, Unit } from '../../features/battle/types'

// 部品は3つ。攻撃側の動き・飛び道具・着弾
export type FxMotion = 'lunge' | 'cast'
export type FxProjectile = 'arrow' | 'orb'
export type FxImpact = 'slash' | 'spark' | 'burst' | 'heal'

// 演出の種類は部品の組み合わせだけで決まる
type FxKind = 'slash' | 'shoot' | 'magic' | 'heal'
const FX_KINDS: Record<FxKind, { motion: FxMotion; projectile?: FxProjectile; impact: FxImpact }> = {
  slash: { motion: 'lunge', impact: 'slash' },
  shoot: { motion: 'cast', projectile: 'arrow', impact: 'spark' },
  magic: { motion: 'cast', projectile: 'orb', impact: 'burst' },
  heal: { motion: 'cast', impact: 'heal' },
}

// 味方は兵科で決める。敵は兵科を持たないので距離で決める（隣なら斬る、離れていれば撃つ）
const CLASS_FX: Record<string, FxKind> = { soldier: 'slash', archer: 'shoot', mage: 'magic' }

// 時間（ms）。動きの長さは fx.css の keyframes と揃える
const MOVE_WAIT = 320 // 移動してから攻撃したときは、ユニット移動の transition（0.3s）を待つ
const LUNGE_HIT = 135 // 踏み込みが届く時刻。fx-lunge（380ms）の 35%
const CAST_HIT = 150 // 構えてから撃つまで
const FLY_PER_TILE = 100 // 飛び道具が1マス進む時間
const FLY_MIN = 140
const NUMBER_MS = 820 // 数字が消えるまで。fx-number と同じ
const DIE_AFTER = 220 // 着弾から倒れ始めるまで
const DIE_MS = 520 // fx-die と同じ

export interface FxHit {
  unitId: string
  pos: Axial
  value: number // 負ならダメージ、正なら回復
  impact: FxImpact
}

// 1回の行動の演出。時刻はどれも演出の開始からの ms
export interface FxBatch {
  id: number
  side: Unit['side'] // 色を陣営で分ける
  actorId: string
  actorPos: Axial
  motion: FxMotion
  toward: Axial // 攻撃側が向く先。範囲スキルなら狙ったマス
  start: number
  projectile?: { type: FxProjectile; dur: number } // start + 構えの後に飛ぶ
  hitAt: number
  hits: FxHit[]
  area: Axial[] // 範囲スキルの効果範囲（味方のスキルだけ。敵の狙ったマスは state に残らない）
  ghosts: Unit[] // 倒れたユニット。state からは消えているので、倒れる演出のあいだだけ描く
  dieAt: number
  end: number
}

// 味方のスキルの効果範囲。狙ったマスから castSkill と同じ形で出す
function skillArea(stage: BattleStageData, user: Unit, aim: Axial): Axial[] {
  if (!user.skill) return []
  const aimKey = axialKey(aim)
  const target = aimableTilesOnBoard(stage, user.pos, user.skill).find((a) => axialKey(a.pos) === aimKey)
  if (!target) return []
  const onBoard = new Set(stage.tiles.map((t) => axialKey(t.pos)))
  const area = new Map<string, Axial>()
  for (const effect of user.skill.effect) {
    for (const pos of effectTiles(target.pos, effect.area, target.direction)) {
      if (onBoard.has(axialKey(pos))) area.set(axialKey(pos), pos)
    }
  }
  return [...area.values()]
}

// 前後の state から演出を組み立てる。HP が動いていなければ（移動・ターン送り・やり直し）null
// 行動したのは AP が減ったユニット。移動・通常攻撃・スキルのどれも使用者の AP だけを減らす
// aim は味方がスキルを撃ったときの狙ったマス
export function attackFxOf(
  id: number,
  prev: BattleState,
  next: BattleState,
  stage: BattleStageData,
  aim?: Axial,
): FxBatch | null {
  const after = new Map(next.units.map((u) => [u.id, u]))
  const actor = prev.units.find((u) => {
    const n = after.get(u.id)
    return n !== undefined && n.ap < u.ap
  })
  if (!actor) return null
  const actorNow = after.get(actor.id)!

  const changes = prev.units.flatMap((u) => {
    const n = after.get(u.id)
    const value = (n?.hp ?? 0) - u.hp
    return value === 0 ? [] : [{ unitId: u.id, pos: (n ?? u).pos, value }]
  })
  if (changes.length === 0) return null

  const firstDamage = changes.find((c) => c.value < 0)
  const kindName: FxKind = !firstDamage
    ? 'heal'
    : (actor.classId ? CLASS_FX[actor.classId] : undefined) ??
      (distance(actorNow.pos, firstDamage.pos) <= 1 ? 'slash' : 'shoot')
  const kind = FX_KINDS[kindName]
  const toward = aim ?? (firstDamage ?? changes[0]).pos

  const start = axialKey(actor.pos) === axialKey(actorNow.pos) ? 0 : MOVE_WAIT
  const windup = kind.motion === 'lunge' ? LUNGE_HIT : CAST_HIT
  const projectile = kind.projectile && {
    type: kind.projectile,
    dur: Math.max(FLY_MIN, distance(actorNow.pos, toward) * FLY_PER_TILE),
  }
  const hitAt = start + windup + (projectile?.dur ?? 0)
  const ghosts = prev.units.filter((u) => !after.has(u.id)).map((u) => ({ ...u, hp: 0 }))
  const dieAt = hitAt + DIE_AFTER

  return {
    id,
    side: actor.side,
    actorId: actor.id,
    actorPos: actorNow.pos,
    motion: kind.motion,
    toward,
    start,
    projectile,
    hitAt,
    hits: changes.map((c) => ({ ...c, impact: c.value > 0 ? 'heal' : kind.impact })),
    area: aim ? skillArea(stage, actor, aim) : [],
    ghosts,
    dieAt,
    end: Math.max(hitAt + NUMBER_MS, ghosts.length > 0 ? dieAt + DIE_MS : 0),
  }
}
