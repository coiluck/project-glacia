// ゼロから始めたプレイヤーの進み方を真似るシミュレーター
// ゲームのルールは src/features の関数をそのまま呼ぶ。ここに書くのはプレイヤーの判断だけ
import { characterMasters } from '../../src/data/characters'
import type { MaterialCost } from '../../src/data/characters/types'
import { items as itemDefs } from '../../src/data/items'
import { dropTables } from '../../src/data/drops'
import { chapters, isChapterCleared, isStagePlayable, type Stage } from '../../src/data/stages'
import { expToNextRank, staminaMaxFor } from '../../src/data/rank'
import { MULTI_PULL_COUNT, PULL_COST_MULTI, gachaPool, CEILING_PULLS } from '../../src/data/gacha'
import { battleStageRegistry } from '../../src/data/battleStages'
import { baseBuildings, type BaseBuildingKind } from '../../src/data/base'
import { baseTiles, TOWER_POS } from '../../src/data/baseTerrain'
import type { MeResponse } from '../../src/features/contract'
import { addItems } from '../../src/features/inventory/inventory'
import { bumpMission, claimAllDailyMissions } from '../../src/features/mission/daily'
import { claimAllPermanentMissions } from '../../src/features/mission/permanent'
import { currentStamina, refreshStamina, spendStamina } from '../../src/features/stamina/stamina'
import { rollDrops } from '../../src/features/battle/drops'
import { resolveBattleSkip } from '../../src/features/battle/resolveResult'
import { buildParty } from '../../src/features/characters/build'
import { levelUp, limitBreak, skillLevelUp } from '../../src/features/characters/enhance'
import { canLimitBreak, expToCap, expToNextLevel, maxLevel, effectiveLevel } from '../../src/features/characters/growth'
import { resolvePull, resolveCeilingExchange } from '../../src/features/gacha/resolve'
import { claimLoginBonus } from '../../src/features/daily/loginBonus'
import { claimDaily, trade } from '../../src/features/exchange/exchange'
import { lineupFor } from '../../src/features/exchange/lineup'
import { dayIndex } from '../../src/features/daily/day'
import { refine } from '../../src/features/base/refine'
import { analyzeBase } from '../../src/features/base/board'
import { buildBase, collectBase, placeMember, setBaseOutput, upgradeBase, upgradeTower, memberLimit } from '../../src/features/base/base'
import { axialKey, distance, type Axial } from '../../src/features/battle/hex'
import { playParty } from '../data/helpers/bot'

const allStages: Stage[] = chapters.flatMap((c) => c.stages)
const PARTY = 5

export interface Profile {
  name: string
  hours: number[] // ログインする JST の時刻
  gap: number // 基地の回収間隔の目安（時間）
}

export interface Options {
  profile: Profile
  seed: number
  days: number
  retrySum: number // 負けたステージに再挑戦するのは、編成の Lv 合計がこれだけ上がってから
  useBase: boolean
  continueAfterDone?: boolean
  verbose?: (line: string) => void
}

export interface ClearRecord {
  stageId: string
  day: number
  stamina: number // それまでに使ったスタミナ
  rank: number
  levels: string // 編成の Lv
  attempts: number // 負けた回数
  pulls: number // それまでにガチャを引いた回数
}

export interface RunResult {
  clears: ClearRecord[]
  pulls: number
  owned: string[]
  finalLevels: string
  staminaUsed: number
  staminaRegen: number // その期間に回復しうるスタミナ
  expFromBase: number
  expFromStages: number
  currencyLeft: number
  binding: { exp: number; currency: number } // レベル上げが何で止まったかの回数
  curve: { day: number; avg: number; min: number; max: number; owned: number; usedRatio: number }[] // 日ごとの編成の Lv
}

// ---- 乱数 ----
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const tryDo = <T>(f: () => T): T | undefined => {
  try {
    return f()
  } catch {
    return undefined
  }
}

// ---- 新規登録の状態（worker/src/db/users.ts と schema.sql の既定値）----
function newMe(now: number): MeResponse {
  return {
    user: {
      id: 'sim', username: 'sim',
      rank: 1, total_exp: 0, exp_in_rank: 0, exp_to_next: 100,
      stamina: 50, stamina_max: 50, stamina_updated_at: now,
      currency: 0, gems: 3000, pity: 0,
      chapter: 1, cleared_stage_ids: [], tutorial_steps: [], items: {},
      exchange_tokens: 0, exchange_claimed_day: 0, exchange_bought_day: 0, exchange_bought: [],
      login_claimed_day: 0, login_count: 0,
      mission_day: 0, mission_counts: {}, mission_claimed: [], mission_done: [],
      favorite_character_id: 'lapis',
      base_board: {}, base_members: {}, base_tower_level: 1, base_collected_at: now,
      settings_bgm: 80, settings_se: 80, settings_text_speed: 'normal', settings_text_size: 'normal', settings_lang: 'ja',
    },
    characters: [
      { masterId: 'lapis', level: 1, exp: 0, limitBreak: 0, dupe: 0, selectedSkillId: characterMasters.lapis.skills[0].def.id, skillLevels: {} },
    ],
    party: { 1: ['lapis'], 2: [], 3: [], 4: [] },
    now,
  }
}

// resolveResult.ts の settle と同じ処理（未クリアの勝利は resolveBattleSkip を通せないので写す）
function settle(me: MeResponse, stage: Stage, victory: boolean, now: number): MeResponse {
  const user = bumpMission(spendStamina(me.user, stage.stamina, now), 'staminaSpent', stage.stamina, now)
  if (!victory) return { ...me, user }
  user.currency += stage.reward.currency
  user.items = addItems(user.items, rollDrops(dropTables[stage.id]))
  user.total_exp += stage.reward.rankExp
  let expInRank = user.exp_in_rank + stage.reward.rankExp
  for (;;) {
    const need = expToNextRank(user.rank)
    if (need === 0 || expInRank < need) break
    expInRank -= need
    user.rank += 1
  }
  user.exp_in_rank = expInRank
  user.exp_to_next = expToNextRank(user.rank)
  user.stamina_max = staminaMaxFor(user.rank)
  if (!user.cleared_stage_ids.includes(stage.id)) {
    user.cleared_stage_ids = [...user.cleared_stage_ids, stage.id]
    const chapter = chapters.find((c) => c.stages.includes(stage))!
    if (isChapterCleared(chapter, user.cleared_stage_ids)) user.chapter = Math.max(user.chapter, chapter.id + 1)
  }
  const after = bumpMission(bumpMission(refreshStamina(user, now), 'battleWin', 1, now), 'battleWinManual', 1, now)
  return { ...me, user: after }
}

// ---- 素材 ----
const count = (me: MeResponse, id: string) => me.user.items[id] ?? 0

// itemId を n 個そろえる。足りなければ recipe で合成する。そろわなければ undefined（me は変えない）
function craftTo(me: MeResponse, itemId: string, n: number): MeResponse | undefined {
  const have = count(me, itemId)
  if (have >= n) return me
  const recipe = itemDefs[itemId].recipe
  if (!recipe) return undefined
  const make = n - have
  let next: MeResponse | undefined = me
  for (const c of recipe) {
    next = craftTo(next, c.itemId, c.count * make)
    if (!next) return undefined
  }
  return refine(next, itemId, make)
}

function craftAll(me: MeResponse, costs: MaterialCost[]): MeResponse | undefined {
  let next: MeResponse | undefined = me
  for (const c of costs) {
    next = craftTo(next, c.itemId, c.count)
    if (!next) return undefined
  }
  // 後の素材の合成で前の素材を使ってしまっていないか
  return costs.every((c) => count(next!, c.itemId) >= c.count) ? next : undefined
}

// costs をそろえるのに足りない★1素材（合成を展開して数える）
function deficit(me: MeResponse, costs: MaterialCost[]): Map<string, number> {
  const stock = new Map(Object.entries(me.user.items))
  const out = new Map<string, number>()
  const need = (id: string, n: number) => {
    const have = stock.get(id) ?? 0
    const use = Math.min(have, n)
    stock.set(id, have - use)
    const rest = n - use
    if (rest <= 0) return
    const recipe = itemDefs[id].recipe
    if (!recipe) out.set(id, (out.get(id) ?? 0) + rest)
    else for (const c of recipe) need(c.itemId, c.count * rest)
  }
  for (const c of costs) need(c.itemId, c.count)
  return out
}

// ---- 編成 ----
const owned = (me: MeResponse) => Object.fromEntries(me.characters.map((c) => [c.masterId, c]))

// レアリティの高い順、同じなら Lv の高い順に5人
function chooseParty(me: MeResponse): string[] {
  return [...me.characters]
    .sort((a, b) => characterMasters[b.masterId].rarity - characterMasters[a.masterId].rarity || b.level - a.level)
    .slice(0, PARTY)
    .map((c) => c.masterId)
}

const partyKey = (me: MeResponse, ids: string[]) =>
  ids.map((id) => { const c = owned(me)[id]; return `${id}:${c.level}:${c.limitBreak}:${c.dupe}:${JSON.stringify(c.skillLevels)}` }).sort().join('|')
const levelSum = (me: MeResponse, ids: string[]) => ids.reduce((s, id) => s + owned(me)[id].level, 0)
const levelsOf = (me: MeResponse, ids: string[]) =>
  ids.map((id) => `${id}${characterMasters[id].rarity}★${owned(me)[id].level}`).join(' ')

// ---- 育成 ----
const EXP_ITEMS = ['trainingRecordLarge', 'trainingRecordMedium', 'trainingRecordSmall']

// 上限解放の壁にいて、素材が足りないキャラの不足分
function lbNeeds(me: MeResponse, ids: string[]): Map<string, number> {
  const total = new Map<string, number>()
  for (const id of ids) {
    const c = owned(me)[id]
    const master = characterMasters[id]
    if (!canLimitBreak(master, c)) continue
    for (const [k, v] of deficit(me, master.limitBreakCosts[c.limitBreak])) total.set(k, (total.get(k) ?? 0) + v)
  }
  return total
}

function enhance(me: MeResponse, ids: string[], stats: RunResult): MeResponse {
  // 上限解放
  for (const id of ids) {
    const c = owned(me)[id]
    const master = characterMasters[id]
    if (!canLimitBreak(master, c)) continue
    const crafted = craftAll(me, master.limitBreakCosts[c.limitBreak])
    if (crafted) me = limitBreak(crafted, id)
  }
  // レベル上げ。いちばん Lv の低い人に1 Lv ぶんずつ入れる
  for (let guard = 0; guard < 2000; guard++) {
    const targets = ids
      .map((id) => owned(me)[id])
      .filter((c) => expToCap(characterMasters[c.masterId], c) > 0)
      .sort((a, b) => a.level - b.level)
    const c = targets[0]
    if (!c) break
    const master = characterMasters[c.masterId]
    const cap = maxLevel(master.rarity, c.limitBreak)
    const lv = effectiveLevel(master, c)
    let need = Math.min((expToNextLevel(lv, cap) ?? 0) - c.exp, expToCap(master, c))
    need = Math.min(need, me.user.currency) // 紙幣は経験値1につき1
    const use: MaterialCost[] = []
    let sum = 0
    // 大きい記録から、need を超えない範囲で使う。最後に小さいものを1つ足して超える
    for (const itemId of EXP_ITEMS) {
      const exp = itemDefs[itemId].exp!
      const n = Math.min(count(me, itemId), Math.floor((need - sum) / exp))
      if (n > 0) { use.push({ itemId, count: n }); sum += n * exp }
    }
    if (sum < need) {
      for (const itemId of [...EXP_ITEMS].reverse()) {
        const exp = itemDefs[itemId].exp!
        const used = use.find((u) => u.itemId === itemId)?.count ?? 0
        if (count(me, itemId) > used && sum + exp <= me.user.currency) {
          const u = use.find((x) => x.itemId === itemId)
          if (u) u.count += 1
          else use.push({ itemId, count: 1 })
          break
        }
      }
    }
    if (use.length === 0) {
      const anyExp = EXP_ITEMS.some((i) => count(me, i) > 0)
      if (anyExp) stats.binding.currency++
      else stats.binding.exp++
      break
    }
    const next = tryDo(() => levelUp(me, c.masterId, use, me.now))
    if (!next) { stats.binding.currency++; break }
    me = next
  }
  // スキル Lv。編成の選択中スキルを、上限解放の素材に手を付けない範囲で上げる
  const reserve = lbNeeds(me, ids)
  for (const id of ids) {
    for (;;) {
      const c = owned(me)[id]
      const skill = characterMasters[id].skills.find((s) => s.def.id === c.selectedSkillId)!
      const level = c.skillLevels[skill.def.id] ?? 1
      const costs = skill.levelUpCosts[level - 1]
      if (!costs) break
      if (costs.some((x) => reserve.has(x.itemId))) break
      const crafted = craftAll(me, costs)
      if (!crafted) break
      const next = tryDo(() => skillLevelUp(crafted, id, skill.def.id))
      if (!next) break
      me = next
    }
  }
  return me
}

// ---- 基地 ----
const P = (q: number, r: number): Axial => ({ q, r })
type BuildStep =
  | { kind: 'build'; pos: Axial; building: BaseBuildingKind; output?: string }
  | { kind: 'tower' }
// 暖房塔(4,3)のまわりに組む。熱は Lv1 で 10、Lv2 で 14
const BUILD_ORDER: BuildStep[] = [
  { kind: 'build', pos: P(4, 2), building: 'library', output: 'trainingRecordSmall' },
  { kind: 'build', pos: P(5, 2), building: 'pipe' },
  { kind: 'build', pos: P(6, 1), building: 'storage' },
  { kind: 'build', pos: P(5, 1), building: 'mine', output: 'iceCrystal' },
  { kind: 'build', pos: P(6, 2), building: 'mine', output: 'steelScrap' },
  { kind: 'build', pos: P(3, 3), building: 'library', output: 'trainingRecordSmall' },
  { kind: 'tower' },
  { kind: 'build', pos: P(3, 4), building: 'library', output: 'trainingRecordSmall' },
  { kind: 'build', pos: P(4, 4), building: 'library', output: 'trainingRecordSmall' },
]
const MEMBER_TILES = baseTiles.filter((t) => t.kind !== 'blocked' && t.kind !== 'tower' && distance(t.pos, TOWER_POS) <= 3).map((t) => t.pos)

function baseValue(me: MeResponse, gap: number): number {
  const a = analyzeBase(me.user, me.characters)
  let v = 0
  for (const s of Object.values(a.buildings)) {
    if (s.building.kind === 'library') v += s.rate * Math.min(s.hours, gap)
    if (s.building.kind === 'mine') v += s.rate * Math.min(s.hours, gap) * 50
  }
  return v
}

function placeMembers(me: MeResponse, gap: number, now: number): MeResponse {
  for (const id of Object.keys(me.user.base_members)) me = placeMember(me, id, null, now)
  const limit = memberLimit(me.user.cleared_stage_ids)
  for (let i = 0; i < limit; i++) {
    let best: { me: MeResponse; v: number } | undefined
    const base = baseValue(me, gap)
    for (const c of me.characters) {
      if (me.user.base_members[c.masterId]) continue
      for (const pos of MEMBER_TILES) {
        const next = tryDo(() => placeMember(me, c.masterId, pos, now))
        if (!next) continue
        const v = baseValue(next, gap)
        if (v > base && (!best || v > best.v)) best = { me: next, v }
      }
    }
    if (!best) break
    me = best.me
  }
  return me
}

function libraryExpPerHour(me: MeResponse) {
  const a = analyzeBase(me.user, me.characters)
  return Object.values(a.buildings).filter((s) => s.building.kind === 'library').reduce((s, b) => s + b.rate, 0)
}

// 建設は育成より先。強化は育成のあとの余りで
function buildBaseSteps(me: MeResponse, now: number): MeResponse {
  for (const step of BUILD_ORDER) {
    if (step.kind === 'tower') {
      if (me.user.base_tower_level >= 2) continue
      const next = tryDo(() => upgradeTower(me, now))
      if (!next) return me
      me = next
      continue
    }
    if (me.user.base_board[axialKey(step.pos)]) continue
    const next = tryDo(() => buildBase(me, step.pos, step.building, step.output, now))
    if (!next) return me
    me = next
  }
  return me
}

const RESERVE = 3000
function upgradeLibraries(me: MeResponse, now: number): MeResponse {
  for (;;) {
    const libs = Object.entries(me.user.base_board)
      .filter(([, b]) => b.kind === 'library' && b.level < baseBuildings.library.costs.length)
      .sort((a, b) => a[1].level - b[1].level)
    if (!libs.length) return me
    const [key, b] = libs[0]
    const cost = baseBuildings.library.costs[b.level]
    if (me.user.currency - cost < RESERVE) return me
    const [q, r] = key.split(',').map(Number)
    me = upgradeBase(me, { q, r }, now)
    // Lv3 から中の記録が作れる。cost 140 で 150 exp なので切り替える
    if (b.level + 1 >= 3) me = tryDo(() => setBaseOutput(me, { q, r }, 'trainingRecordMedium', now)) ?? me
  }
}

// 採掘場は上限解放で足りない★1素材を作る。足りなければ氷晶片と鋼の欠片（覚醒石の材料）
function chooseMineOutputs(me: MeResponse, needs: Map<string, number>, now: number): MeResponse {
  const wanted = [...needs].sort((a, b) => b[1] - a[1]).map(([k]) => k)
  for (const d of ['iceCrystal', 'steelScrap']) if (!wanted.includes(d)) wanted.push(d)
  const mines = Object.entries(me.user.base_board).filter(([, b]) => b.kind === 'mine')
  mines.forEach(([key, b], i) => {
    const out = wanted[i]
    if (!out || b.output === out) return
    const [q, r] = key.split(',').map(Number)
    me = tryDo(() => setBaseOutput(me, { q, r }, out, now)) ?? me
  })
  return me
}

// ---- 交換所 ----
function doExchange(me: MeResponse, needs: Map<string, number>, now: number): MeResponse {
  me = tryDo(() => claimDaily(me, now)) ?? me
  const lineup = lineupFor(dayIndex(now))
  const order = lineup
    .map((o, slot) => {
      const kind = itemDefs[o.itemId].kind
      const pri = kind === 'exp' ? 0 : needs.has(o.itemId) ? 1 : kind === 'book' ? 3 : 2
      return { slot, pri, price: o.price }
    })
    .sort((a, b) => a.pri - b.pri || a.price - b.price)
  for (const { slot, pri } of order) {
    if (pri >= 3) continue // 本は高いので買わない
    me = tryDo(() => trade(me, slot, now)) ?? me
  }
  return me
}

// ---- ガチャ ----
function doGacha(me: MeResponse, now: number, stats: RunResult): MeResponse {
  while (me.user.gems >= PULL_COST_MULTI) {
    me = resolvePull(me, MULTI_PULL_COUNT, 'pickup', now).me
    stats.pulls += MULTI_PULL_COUNT
  }
  while (me.user.pity >= CEILING_PULLS) {
    const ids = owned(me)
    const target = [...gachaPool[3]].sort((a, b) => (ids[a] ? ids[a].dupe + 1 : 0) - (ids[b] ? ids[b].dupe + 1 : 0))[0]
    me = resolveCeilingExchange(me, target).me
  }
  return me
}

// ---- 周回先 ----
const ITEM_VALUE: Record<number, number> = { 1: 15, 2: 70, 3: 250 }
function expectedDrops(stageId: string): Map<string, number> {
  const m = new Map<string, number>()
  for (const e of dropTables[stageId]) m.set(e.itemId, (m.get(e.itemId) ?? 0) + e.count * (e.rate ?? 1))
  return m
}
function farmValue(stage: Stage, needs: Map<string, number>, expBound: boolean): number {
  let v = stage.reward.currency
  for (const [id, n] of expectedDrops(stage.id)) {
    const def = itemDefs[id]
    if (def.kind === 'exp') v += n * def.exp! * (expBound ? 2 : 1)
    else if (def.kind === 'book') v += n * 40
    else v += n * ITEM_VALUE[def.rarity]
    // 足りない★1素材は高く見る。★2以上は合成を展開した★1の不足で見る
    if (def.kind === 'material') {
      const d = deficit({ user: { items: {} } } as unknown as MeResponse, [{ itemId: id, count: 1 }])
      for (const [k] of d) if (needs.has(k)) v += n * 120
    }
  }
  return v / stage.stamina
}

// ---- 1回のプレイ ----
export function simulate(opt: Options): RunResult {
  const rng = mulberry32(opt.seed)
  const realRandom = Math.random
  Math.random = rng
  try {
    return run(opt)
  } finally {
    Math.random = realRandom
  }
}

// JST の日付 d の0時（登録日が d=0）
const START = Date.UTC(2026, 10, 2, 11, 0, 0) / 1000 // 2026-11-02 20:00 JST に登録
const JST_MIDNIGHT0 = Date.UTC(2026, 10, 1, 15, 0, 0) / 1000 // 2026-11-02 0:00 JST

function run(opt: Options): RunResult {
  const log = opt.verbose ?? (() => {})
  const stats: RunResult = {
    clears: [], pulls: 0, owned: [], finalLevels: '', staminaUsed: 0, staminaRegen: 0,
    expFromBase: 0, expFromStages: 0, currencyLeft: 0, binding: { exp: 0, currency: 0 }, curve: [],
  }
  let me = newMe(START)
  const failed = new Map<string, number>() // stageId -> 負けたときの Lv 合計
  const attempts = new Map<string, number>()
  const botCache = new Map<string, boolean>()
  let lastPlaceDay = -1

  const clearStage = (stage: Stage, now: number, ids: string[]) => {
    me = settle(me, stage, true, now)
    stats.staminaUsed += stage.stamina
    stats.clears.push({
      stageId: stage.id,
      day: (now - START) / 86400,
      stamina: stats.staminaUsed,
      rank: me.user.rank,
      levels: levelsOf(me, ids),
      attempts: attempts.get(stage.id) ?? 0,
      pulls: stats.pulls,
    })
    log(`d${((now - START) / 86400).toFixed(1)} CLEAR ${stage.id} rank${me.user.rank} ${levelsOf(me, ids)}`)
  }

  // 登録直後: 1-1 はガイドの編成（ラピス Lv1）で戦うので勝ちとする
  me = { ...me, user: { ...me.user, tutorial_steps: ['intro', 'firstBattle'] } }
  clearStage(allStages[0], START + 600, ['lapis'])

  const sessions: number[] = []
  for (let d = 0; d < opt.days; d++) for (const h of opt.profile.hours) {
    const t = JST_MIDNIGHT0 + d * 86400 + h * 3600
    if (t > START + 900) sessions.push(t)
  }
  // 登録の直後にも1回遊ぶ
  sessions.unshift(START + 900)

  const isDone = () => me.user.cleared_stage_ids.includes(allStages[allStages.length - 1].id)

  let lastCurveDay = -1
  for (const now of sessions) {
    if (isDone() && !opt.continueAfterDone) break
    const d = Math.floor((now - START) / 86400)
    if (d !== lastCurveDay) {
      lastCurveDay = d
      const lv = chooseParty(me).map((id) => owned(me)[id].level)
      stats.curve.push({ day: d, avg: lv.reduce((a, b) => a + b, 0) / lv.length, min: Math.min(...lv), max: Math.max(...lv), owned: me.characters.length, usedRatio: stats.staminaUsed / Math.max(1, (now - START) / 300) })
    }
    me = { ...me, now }
    if (opt.useBase) {
      const before = { ...me.user.items }
      me = collectBase(me, now)
      for (const id of EXP_ITEMS) stats.expFromBase += ((me.user.items[id] ?? 0) - (before[id] ?? 0)) * itemDefs[id].exp!
    }
    me = tryDo(() => claimLoginBonus(me, now).me) ?? me
    me = tryDo(() => claimAllPermanentMissions(me)) ?? me
    me = doGacha(me, now, stats)

    let ids = chooseParty(me)
    me = { ...me, party: { ...me.party, 1: ids } }
    let needs = lbNeeds(me, ids)
    me = doExchange(me, needs, now)
    if (opt.useBase) {
      me = buildBaseSteps(me, now)
      me = chooseMineOutputs(me, needs, now)
    }
    me = enhance(me, ids, stats)

    // 戦闘
    for (let guard = 0; guard < 100; guard++) {
      const stamina = currentStamina(me.user, now).stamina
      const next = allStages.find((s) => !me.user.cleared_stage_ids.includes(s.id) && isStagePlayable(s.id, me.user.chapter, me.user.cleared_stage_ids))
      ids = chooseParty(me)
      me = { ...me, party: { ...me.party, 1: ids } }
      const sum = levelSum(me, ids)
      const canRetry = next && (failed.get(next.id) === undefined || sum >= failed.get(next.id)! + opt.retrySum)
      if (next && canRetry && stamina >= next.stamina) {
        const key = `${next.id}|${partyKey(me, ids)}`
        let win = botCache.get(key)
        if (win === undefined) {
          win = playParty(battleStageRegistry[next.id], buildParty(owned(me), ids)).victory
          botCache.set(key, win)
        }
        if (win) {
          clearStage(next, now, ids)
          me = tryDo(() => claimAllPermanentMissions(me)) ?? me
          me = doGacha(me, now, stats)
        } else {
          me = settle(me, next, false, now)
          stats.staminaUsed += next.stamina
          failed.set(next.id, sum)
          attempts.set(next.id, (attempts.get(next.id) ?? 0) + 1)
          log(`d${((now - START) / 86400).toFixed(1)} lose ${next.id} ${levelsOf(me, ids)}`)
        }
        me = enhance(me, chooseParty(me), stats)
        continue
      }
      // 周回
      needs = lbNeeds(me, ids)
      const expBound = !EXP_ITEMS.some((i) => count(me, i) > 0)
      const farm = allStages
        .filter((s) => me.user.cleared_stage_ids.includes(s.id) && s.stamina <= stamina)
        .sort((a, b) => farmValue(b, needs, expBound) - farmValue(a, needs, expBound))[0]
      if (!farm) break
      const before = { ...me.user.items }
      me = resolveBattleSkip(me, farm.id, now).me
      for (const id of EXP_ITEMS) stats.expFromStages += ((me.user.items[id] ?? 0) - (before[id] ?? 0)) * itemDefs[id].exp!
      stats.staminaUsed += farm.stamina
      me = enhance(me, ids, stats)
    }

    me = tryDo(() => claimAllDailyMissions(me, now)) ?? me
    me = tryDo(() => claimAllPermanentMissions(me)) ?? me
    me = doGacha(me, now, stats)
    ids = chooseParty(me)
    me = enhance(me, ids, stats)
    if (opt.useBase) {
      me = upgradeLibraries(me, now)
      const day = dayIndex(now)
      if (day !== lastPlaceDay) {
        me = placeMembers(me, opt.profile.gap, now)
        lastPlaceDay = day
      }
    }
  }

  const ids = chooseParty(me)
  stats.owned = me.characters.map((c) => `${c.masterId}${characterMasters[c.masterId].rarity}★+${c.dupe}`)
  stats.finalLevels = levelsOf(me, ids)
  stats.currencyLeft = me.user.currency
  const end = Math.min(sessions[sessions.length - 1], stats.clears[stats.clears.length - 1]?.day * 86400 + START)
  stats.staminaRegen = Math.floor((end - START) / 300)
  if (opt.useBase) log(`library exp/h ${libraryExpPerHour(me).toFixed(0)} tower${me.user.base_tower_level} board ${JSON.stringify(me.user.base_board)}`)
  return stats
}
