import type { MeResponse } from '../../api/types'
import {
  BASE_MEMBERS,
  BASE_MEMBERS_AFTER_CHAPTER_1,
  baseBuildings,
  baseClassEffects,
  TOWER_LEVELS,
} from '../../data/base'
import type { BaseBuildingKind } from '../../data/base'
import { baseTileMap, TOWER_POS } from '../../data/baseTerrain'
import type { BaseTile } from '../../data/baseTerrain'
import { characterMasters } from '../../data/characters'
import type { MaterialCost } from '../../data/characters/types'
import { chapters, isChapterCleared } from '../../data/stages'
import { axialKey, neighbors } from '../battle/hex'
import type { Axial } from '../battle/hex'
import { addItems } from '../inventory/inventory'
import { analyzeBase, connectedPipes, outputsOf, storedOf } from './board'
import type { BaseBuilding } from './types'

// 基地に立たせられるキャラの数
export function memberLimit(clearedStageIds: string[]): number {
  return isChapterCleared(chapters[0], clearedStageIds) ? BASE_MEMBERS_AFTER_CHAPTER_1 : BASE_MEMBERS
}

// 盤面にあるマス
function tileAt(pos: Axial): { key: string; tile: BaseTile } {
  if (!Number.isInteger(pos?.q) || !Number.isInteger(pos?.r)) throw new Error('座標が不正')
  const key = axialKey(pos)
  const tile = baseTileMap.get(key)
  if (!tile) throw new Error(`盤面の外: ${key}`)
  return { key, tile }
}

// 建物を置けるマスの axialKey
function buildableKey(pos: Axial): string {
  const { key, tile } = tileAt(pos)
  if (tile.kind !== 'ice' && tile.kind !== 'resource') throw new Error(`建物を置けないマス: ${key}`)
  return key
}

function buildingAt(me: MeResponse, pos: Axial): { key: string; building: BaseBuilding } {
  const key = buildableKey(pos)
  const building = me.user.base_board[key]
  if (!building) throw new Error(`建物が無い: ${key}`)
  return { key, building }
}

// 作る物がその建物と Lv で選べるか
function checkOutput(kind: BaseBuildingKind, level: number, output: string | undefined): void {
  const outputs = outputsOf(kind)
  const ok =
    outputs.length > 0
      ? outputs.some((o) => o.itemId === output && o.unlockLevel <= level)
      : output === undefined
  if (!ok) throw new Error(`作る物が不正: ${kind} ${output}`)
}

function spendCurrency(me: MeResponse, cost: number): MeResponse {
  if (me.user.currency < cost) throw new Error('通貨が足りない')
  return { ...me, user: { ...me.user, currency: me.user.currency - cost } }
}

function withBoard(me: MeResponse, board: Record<string, BaseBuilding>): MeResponse {
  return { ...me, user: { ...me.user, base_board: board } }
}

// 貯まっている分を所持品に足す。1個に満たない端数は建物の progress に残す
export function collectBase(me: MeResponse, now: number): MeResponse {
  const elapsedHours = Math.max(0, now - me.user.base_collected_at) / 3600
  const gains: MaterialCost[] = []
  const board: Record<string, BaseBuilding> = {}
  for (const [key, status] of Object.entries(analyzeBase(me.user, me.characters).buildings)) {
    const { building } = status
    if (building.output === undefined) {
      board[key] = building
      continue
    }
    const { count, progress } = storedOf(status, elapsedHours)
    if (count > 0) gains.push({ itemId: building.output, count })
    board[key] = { ...building, progress }
  }
  return {
    ...me,
    user: {
      ...me.user,
      items: addItems(me.user.items, gains),
      base_board: board,
      base_collected_at: now,
    },
  }
}

// 盤面を変える操作
function changeBase(me: MeResponse, now: number, change: (me: MeResponse) => MeResponse): MeResponse {
  const collected = collectBase(me, now)
  const before = analyzeBase(collected.user, collected.characters).heatUsed
  const next = change(collected)
  const { heatUsed, heatOutput } = analyzeBase(next.user, next.characters)
  if (heatUsed > before && heatUsed > heatOutput) throw new Error(`熱が足りない: ${heatUsed}/${heatOutput}`)
  return next
}

// 建てる
export function buildBase(
  me: MeResponse,
  pos: Axial,
  kind: BaseBuildingKind,
  output: string | undefined,
  now: number,
): MeResponse {
  const def = baseBuildings[kind]
  if (!def) throw new Error(`建物の種類が不正: ${kind}`)
  const key = buildableKey(pos)
  const board = me.user.base_board
  if (board[key]) throw new Error(`建物がある: ${key}`)
  if (kind === 'mine' && baseTileMap.get(key)!.kind !== 'resource') throw new Error('資源のあるマスではない')
  if (kind === 'pipe') {
    const pipes = connectedPipes(board)
    const connects = neighbors(pos).some((n) => axialKey(n) === axialKey(TOWER_POS) || pipes.has(axialKey(n)))
    if (!connects) throw new Error('暖房塔につながらない')
  }
  if (kind === 'storage') {
    const count = Object.values(board).filter((b) => b.kind === 'storage').length
    if (count >= TOWER_LEVELS[me.user.base_tower_level - 1].storages) throw new Error('貯蔵庫の数が上限')
  }
  checkOutput(kind, 1, output)

  return changeBase(me, now, (me) =>
    withBoard(spendCurrency(me, def.costs[0]), { ...board, [key]: { kind, level: 1, output } }),
  )
}

// 撤去する。建設と強化に使った紙幣は全額返す
export function removeBase(me: MeResponse, pos: Axial, now: number): MeResponse {
  const { key, building } = buildingAt(me, pos)
  const refund = baseBuildings[building.kind].costs.slice(0, building.level).reduce((a, b) => a + b, 0)

  return changeBase(me, now, (me) => {
    const { [key]: _removed, ...board } = me.user.base_board
    return withBoard({ ...me, user: { ...me.user, currency: me.user.currency + refund } }, board)
  })
}

// 強化する
export function upgradeBase(me: MeResponse, pos: Axial, now: number): MeResponse {
  const { key, building } = buildingAt(me, pos)
  const cost = baseBuildings[building.kind].costs[building.level]
  if (cost === undefined) throw new Error('これ以上強化できない')

  // 回収で progress が変わるので、回収後の建物から作る
  return changeBase(me, now, (me) =>
    withBoard(spendCurrency(me, cost), {
      ...me.user.base_board,
      [key]: { ...me.user.base_board[key], level: building.level + 1 },
    }),
  )
}

// 作る物を変える
export function setBaseOutput(me: MeResponse, pos: Axial, output: string, now: number): MeResponse {
  const { key, building } = buildingAt(me, pos)
  if (building.kind !== 'mine' && building.kind !== 'library') throw new Error('作る物を選べない建物')
  checkOutput(building.kind, building.level, output)

  // progress は引き継ぐ。回収で変わるので、回収後の建物から作る
  return changeBase(me, now, (me) =>
    withBoard(me, { ...me.user.base_board, [key]: { ...me.user.base_board[key], output } }),
  )
}

// キャラを立たせる・動かす
export function placeMember(me: MeResponse, characterId: string, pos: Axial | null, now: number): MeResponse {
  const { [characterId]: _current, ...others } = me.user.base_members
  let members = others
  if (pos !== null) {
    if (!me.characters.some((c) => c.masterId === characterId)) throw new Error(`所持していない: ${characterId}`)
    if (!baseClassEffects[characterMasters[characterId]?.classId]) throw new Error('基地に立たせられないクラス')
    const { key, tile } = tileAt(pos)
    if (tile.kind === 'blocked' || tile.kind === 'tower') throw new Error(`立てないマス: ${key}`)
    if (Object.values(others).includes(key)) throw new Error(`ほかのキャラが立っている: ${key}`)
    members = { ...others, [characterId]: key }
    if (Object.keys(members).length > memberLimit(me.user.cleared_stage_ids)) throw new Error('立たせられる人数が上限')
  }

  return changeBase(me, now, (me) => ({ ...me, user: { ...me.user, base_members: members } }))
}

// 暖房塔を強化する
export function upgradeTower(me: MeResponse, now: number): MeResponse {
  const next = TOWER_LEVELS[me.user.base_tower_level]
  if (!next) throw new Error('これ以上強化できない')
  if (next.clearedChapter !== undefined) {
    const chapter = chapters.find((c) => c.id === next.clearedChapter)
    if (!chapter || !isChapterCleared(chapter, me.user.cleared_stage_ids)) throw new Error('章をクリアしていない')
  }
  if (next.rank !== undefined && me.user.rank < next.rank) throw new Error('ランクが足りない')

  return changeBase(me, now, (me) => {
    const spent = spendCurrency(me, next.cost)
    return { ...spent, user: { ...spent.user, base_tower_level: me.user.base_tower_level + 1 } }
  })
}
