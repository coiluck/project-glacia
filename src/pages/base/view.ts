import type { BasePayload } from '../../api/types'
import { baseClassEffects, RESOURCE_GRADES, STORAGE_HOURS } from '../../data/base'
import { baseTileMap } from '../../data/baseTerrain'
import { characterMasters } from '../../data/characters'
import type { UserCharacter } from '../../data/characters/types'
import { memberLimit } from '../../features/base/base'
import { analyzeBase, keyToAxial, outputsOf, storedOf, workBoost } from '../../features/base/board'
import type { BaseAnalysis, BaseRow, BuildingStatus } from '../../features/base/board'
import { axialKey, coordsInRange, distance } from '../../features/battle/hex'

export type Labels = Record<string, string>

// パネルが共通で使う値。BasePage で作って配る
export interface BaseView {
  base: BaseRow
  analysis: BaseAnalysis
  characters: UserCharacter[]
  currency: number
  inventory: Record<string, number>
  rank: number
  clearedStageIds: string[]
  t: Labels // base.json
  tItem: Labels // itemId -> 名前
  tName: Labels // CharacterMaster.id -> 名前
  tClass: Labels // classId -> 名前
  pending: boolean
  run: (payload: BasePayload) => void
}

// i18n の {0} {1} … を埋める
export const fill = (template: string, ...values: (string | number)[]) =>
  template.replace(/\{(\d+)\}/g, (match, index: string) => String(values[Number(index)] ?? match))

// 1時間あたりの個数の表示
export const formatPerHour = (n: number) => n.toFixed(1)

export const faceUrl = (id: string) => `${import.meta.env.BASE_URL}images/character/face/${id}.avif`
export const chibiUrl = (id: string) => `${import.meta.env.BASE_URL}images/character/chibi/${id}.avif`

// 採掘場と書庫1つの貯まり具合
export interface Stock {
  key: string
  status: BuildingStatus
  itemId: string
  count: number // 今回収すると受け取れる個数
  next: number // 次の1個が貯まるまでの割合（0〜1）。満杯なら 1
  perHour: number // 1時間あたりの個数
  full: boolean
}

// 動いている採掘場と書庫の貯まり具合
export function stocksOf(analysis: BaseAnalysis, elapsedHours: number): Map<string, Stock> {
  const stocks = new Map<string, Stock>()
  for (const [key, status] of Object.entries(analysis.buildings)) {
    const itemId = status.building.output
    if (!status.active || itemId === undefined) continue
    const cost = outputsOf(status.building.kind).find((o) => o.itemId === itemId)!.cost
    const stored = storedOf(status, elapsedHours)
    const full = elapsedHours >= status.hours
    stocks.set(key, {
      key,
      status,
      itemId,
      count: stored.count,
      next: full ? 1 : stored.progress / cost,
      perHour: status.rate / cost,
      full,
    })
  }
  return stocks
}

// 盤面を書き換えたときの解析
export function previewWith(view: BaseView, patch: Partial<BaseRow>): BaseAnalysis {
  return analyzeBase({ ...view.base, ...patch }, view.characters)
}

// 熱が足りないので操作できないか
export function heatBlocked(before: BaseAnalysis, after: BaseAnalysis): boolean {
  return after.heatUsed > before.heatUsed && after.heatUsed > after.heatOutput
}

// 資源のマスの等級を 1 から数えた段階にする
const GRADE_STEPS = [...new Set(RESOURCE_GRADES)].sort((a, b) => a - b)
export const gradeStep = (grade: number) => GRADE_STEPS.indexOf(grade) + 1

// キャラが作業範囲の建物を速くする割合
export function boostOf(view: BaseView, characterId: string): number {
  const owned = view.characters.find((c) => c.masterId === characterId)
  const effect = baseClassEffects[characterMasters[characterId]?.classId]
  return owned && effect ? workBoost(owned.level, effect) : 0
}

// そのマスに立っているキャラ
export function memberAt(base: BaseRow, key: string): string | undefined {
  return Object.entries(base.base_members).find(([, k]) => k === key)?.[0]
}

// キャラが center に立ったときの作業範囲
export function rangeKeysOf(center: string, characterId: string): Set<string> {
  const effect = baseClassEffects[characterMasters[characterId]?.classId]
  if (!effect) return new Set()
  return new Set(
    coordsInRange(keyToAxial(center), effect.range)
      .map(axialKey)
      .filter((k) => baseTileMap.has(k)),
  )
}

// キャラを key に立たせられるか。動かすときは今のマスを空けたものとして見る
export function canStand(view: BaseView, characterId: string, key: string): boolean {
  const tile = baseTileMap.get(key)
  if (!tile || tile.kind === 'blocked' || tile.kind === 'tower') return false
  const members = view.base.base_members
  const other = memberAt(view.base, key)
  if (other !== undefined && other !== characterId) return false
  if (members[characterId] === undefined && Object.keys(members).length >= memberLimit(view.clearedStageIds)) return false
  const { [characterId]: _current, ...others } = members
  return !heatBlocked(view.analysis, previewWith(view, { base_members: { ...others, [characterId]: key } }))
}

// キャラを key に立たせたときに変わる建物1つ分の見込み
export interface BuildingForecast {
  key: string
  speed?: number // 作業効率の上昇（割合）
  hours?: [number, number] // 貯められる時間。立たせる前 → 後
  wakes?: boolean // 暖まって動き出す
}

// キャラを key に立たせたときの見込み。比べる相手はそのキャラがいない盤面
export function forecastAt(view: BaseView, characterId: string, key: string): BuildingForecast[] {
  const { [characterId]: _current, ...others } = view.base.base_members
  const before = previewWith(view, { base_members: others })
  const after = previewWith(view, { base_members: { ...others, [characterId]: key } })
  return Object.entries(after.buildings).flatMap(([k, s]) => {
    if (!s.active || s.building.kind === 'pipe') return []
    const f: BuildingForecast = { key: k }
    if (s.building.output !== undefined && s.workerIds.includes(characterId)) f.speed = boostOf(view, characterId)
    if (s.building.output !== undefined && s.carrierId === characterId) f.hours = [before.buildings[k].hours, s.hours]
    if (!before.buildings[k].active) f.wakes = true
    return f.speed !== undefined || f.hours || f.wakes ? [f] : []
  })
}

// 立っているキャラが速くしている・運んでいる・暖めて動かしている建物の数
export function memberWork(view: BaseView, characterId: string): { speed: number; carry: number; warm: number } {
  const statuses = Object.entries(view.analysis.buildings)
  const producing = statuses.filter(([, s]) => s.active && s.building.output !== undefined)
  const { [characterId]: _current, ...others } = view.base.base_members
  const without = previewWith(view, { base_members: others })
  return {
    speed: producing.filter(([, s]) => s.workerIds.includes(characterId)).length,
    carry: producing.filter(([, s]) => s.carrierId === characterId).length,
    warm: statuses.filter(([k, s]) => s.active && s.building.kind !== 'pipe' && !without.buildings[k].active).length,
  }
}

// 盤面に立っているキャラ。運ぶ先があるキャラは、建物と貯蔵庫の間を行き来する
export interface BoardMember {
  id: string
  key: string
  carry?: { from: string; to: string; itemId: string }
}

export function boardMembers(base: BaseRow, analysis: BaseAnalysis): BoardMember[] {
  const entries = Object.entries(analysis.buildings)
  return Object.entries(base.base_members).map(([id, key]) => {
    const effect = baseClassEffects[characterMasters[id]?.classId]
    const from = entries.find(([, s]) => s.carrierId === id && s.building.output !== undefined)
    if (!effect || !from) return { id, key }

    // 範囲の中で一番長く貯められる貯蔵庫へ運ぶ
    const pos = keyToAxial(key)
    const storage = entries
      .filter(
        ([k, s]) =>
          s.building.kind === 'storage' && s.active && distance(pos, keyToAxial(k)) <= effect.range,
      )
      .sort(([, a], [, b]) => STORAGE_HOURS[b.building.level - 1] - STORAGE_HOURS[a.building.level - 1])[0]
    if (!storage) return { id, key }
    return { id, key, carry: { from: from[0], to: storage[0], itemId: from[1].building.output! } }
  })
}
