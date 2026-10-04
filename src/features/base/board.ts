import type { UserRow } from '../../api/types'
import {
  baseBuildings,
  baseClassEffects,
  LIBRARY_OUTPUTS,
  LIBRARY_RATES,
  MINE_OUTPUTS,
  MINE_RATES,
  RESOURCE_GRADES,
  SELF_STORAGE_HOURS,
  STORAGE_HOURS,
  TOWER_LEVELS,
} from '../../data/base'
import type { BaseBuildingKind, BaseClassEffect, BaseOutputDef } from '../../data/base'
import { baseTileMap, TOWER_POS } from '../../data/baseTerrain'
import { characterMasters } from '../../data/characters'
import type { UserCharacter } from '../../data/characters/types'
import { axialKey, distance, neighbors } from '../battle/hex'
import type { Axial } from '../battle/hex'
import type { BaseBuilding } from './types'

// 基地の判定に要る値。サーバーは me.user を、画面は baseStore の値を渡す
export type BaseRow = Pick<UserRow, 'base_board' | 'base_members' | 'base_tower_level' | 'base_collected_at'>

// 建物1つの状態
export interface BuildingStatus {
  building: BaseBuilding
  active: boolean // 動いているか。配管は暖房塔につながっているか
  rate: number // 1時間あたりの生産量。作る物の cost で割ると個数。動いていない建物と、採掘場・書庫以外は 0
  hours: number // 貯められる時間
  workerIds: string[] // 速さを上げているキャラ。作業範囲に入っている全員
  carrierId?: string // 貯蔵庫へ運んでいるキャラ
}

export interface BaseAnalysis {
  warm: Set<string> // 暖かいマスの axialKey
  heatUsed: number
  heatOutput: number
  buildings: Record<string, BuildingStatus> // axialKey -> 建物の状態
}

// 盤面に立っているキャラ
interface Member {
  id: string
  pos: Axial
  level: number
  effect: BaseClassEffect
}

export function keyToAxial(key: string): Axial {
  const [q, r] = key.split(',').map(Number)
  return { q, r }
}

// 暖房塔につながった配管の axialKey
export function connectedPipes(board: Record<string, BaseBuilding>): Set<string> {
  const connected = new Set<string>()
  const queue = neighbors(TOWER_POS)
  while (queue.length > 0) {
    const pos = queue.pop()!
    const key = axialKey(pos)
    if (connected.has(key) || board[key]?.kind !== 'pipe') continue
    connected.add(key)
    queue.push(...neighbors(pos))
  }
  return connected
}

// 作業による速さの上昇（0.05 なら +5%）
export function workBoost(level: number, effect: BaseClassEffect): number {
  return ((5 + Math.floor((level * 25) / 60)) / 100) * effect.multiplier
}

// 資源のマスの等級
export function resourceGrade(pos: Axial): number {
  return RESOURCE_GRADES[Math.min(distance(pos, TOWER_POS), RESOURCE_GRADES.length - 1)]
}

// 作業による上昇を掛ける前の、1時間あたりの生産量
function baseRate(pos: Axial, building: BaseBuilding): number {
  if (building.kind === 'mine') return MINE_RATES[building.level - 1] * resourceGrade(pos)
  if (building.kind === 'library') return LIBRARY_RATES[building.level - 1]
  return 0
}

// その建物で作れる物
export function outputsOf(kind: BaseBuildingKind): BaseOutputDef[] {
  if (kind === 'mine') return MINE_OUTPUTS
  if (kind === 'library') return LIBRARY_OUTPUTS
  return []
}

function membersOf(base: BaseRow, characters: UserCharacter[]): Member[] {
  return Object.entries(base.base_members).flatMap(([id, key]) => {
    const owned = characters.find((c) => c.masterId === id)
    const effect = baseClassEffects[characterMasters[id]?.classId]
    if (!owned || !effect) return []
    return [{ id, pos: keyToAxial(key), level: owned.level, effect }]
  })
}

const inRange = (member: Member, pos: Axial) => distance(member.pos, pos) <= member.effect.range

// 盤面を解析する
export function analyzeBase(base: BaseRow, characters: UserCharacter[]): BaseAnalysis {
  const board = base.base_board
  const members = membersOf(base, characters)

  // 暖房塔につながった配管
  const pipes = connectedPipes(board)

  // 暖かいマス
  const warm = new Set<string>()
  const warmAround = (pos: Axial) => {
    for (const p of [pos, ...neighbors(pos)]) {
      const key = axialKey(p)
      const kind = baseTileMap.get(key)?.kind
      if (kind && kind !== 'tower') warm.add(key)
    }
  }
  warmAround(TOWER_POS)
  for (const key of pipes) warmAround(keyToAxial(key))
  for (const m of members) if (m.effect.warms) warmAround(m.pos)

  // 動いている建物
  const entries = Object.entries(board).map(([key, building]) => ({
    key,
    pos: keyToAxial(key),
    building,
    active: building.kind === 'pipe' ? pipes.has(key) : warm.has(key),
  }))
  const storages = entries.filter((e) => e.building.kind === 'storage' && e.active)

  // 熱の使用量
  const heatUsed = entries
    .filter((e) => e.active)
    .reduce((sum, e) => sum + baseBuildings[e.building.kind].heat, 0)

  const buildings: Record<string, BuildingStatus> = {}
  for (const { key, pos, building, active } of entries) {
    const covering = members.filter((m) => inRange(m, pos))

    // 作業範囲のキャラ全員の効果を足した分だけ速くなる
    const boost = covering.reduce((sum, m) => sum + workBoost(m.level, m.effect), 0)

    // 範囲に動いている貯蔵庫もあるキャラがいれば、その貯蔵庫の上限時間まで貯められる
    let hours = SELF_STORAGE_HOURS
    let carrierId: string | undefined
    for (const m of covering) {
      for (const s of storages) {
        const h = STORAGE_HOURS[s.building.level - 1]
        if (inRange(m, s.pos) && h > hours) {
          hours = h
          carrierId = m.id
        }
      }
    }

    buildings[key] = {
      building,
      active,
      rate: active ? baseRate(pos, building) * (1 + boost) : 0,
      hours,
      workerIds: covering.map((m) => m.id),
      carrierId,
    }
  }

  return { warm, heatUsed, heatOutput: TOWER_LEVELS[base.base_tower_level - 1].heat, buildings }
}

// 最後の回収から elapsedHours で建物に貯まった量
// count は受け取れる個数、progress は1個に満たない生産量
export function storedOf(status: BuildingStatus, elapsedHours: number): { count: number; progress: number } {
  const { building } = status
  const cost = outputsOf(building.kind).find((o) => o.itemId === building.output)!.cost
  const amount = (building.progress ?? 0) + status.rate * Math.min(elapsedHours, status.hours)
  const count = Math.floor(amount / cost)
  return { count, progress: amount - count * cost }
}
