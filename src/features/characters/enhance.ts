import type { MeResponse } from '../../api/types'
import { characterMasters } from '../../data/characters'
import { CURRENCY_PER_EXP, MAX_SKILL_LEVEL } from '../../data/characters/types'
import type { CharacterMaster, MaterialCost, UserCharacter } from '../../data/characters/types'
import { items as itemDefs } from '../../data/items'
import { hasItems, spendItems } from '../inventory/inventory'
import { canLimitBreak, effectiveSkillLevel, expToCap, gainExp } from './growth'

function find(me: MeResponse, masterId: string): { master: CharacterMaster; user: UserCharacter } {
  const master = characterMasters[masterId]
  const user = me.characters.find((c) => c.masterId === masterId)
  if (!master || !user) throw new Error(`キャラが無い: ${masterId}`)
  return { master, user }
}

// 消費を引いて、更新したキャラで差し替える。足りなければ何も変えずに例外
function apply(
  me: MeResponse,
  next: UserCharacter,
  costs: MaterialCost[],
  currency: number,
): MeResponse {
  if (!hasItems(me.user.items, costs)) throw new Error('アイテムが足りない')
  if (me.user.currency < currency) throw new Error('通貨が足りない')

  return {
    ...me,
    user: {
      ...me.user,
      currency: me.user.currency - currency,
      items: spendItems(me.user.items, costs),
    },
    characters: me.characters.map((c) => (c.masterId === next.masterId ? next : c)),
  }
}

// レベルアップ
export function levelUp(me: MeResponse, masterId: string, use: MaterialCost[]): MeResponse {
  const { master, user } = find(me, masterId)
  if (use.length === 0) throw new Error('使うアイテムが無い')
  // hasItems は同じ itemId を個別に判定するので、重複は先に弾く
  if (new Set(use.map((u) => u.itemId)).size !== use.length) {
    throw new Error('同じアイテムが重複している')
  }

  let exp = 0
  for (const u of use) {
    const def = itemDefs[u.itemId]
    if (!def?.exp || def.kind !== 'exp') throw new Error(`経験値アイテムでない: ${u.itemId}`)
    if (!Number.isInteger(u.count) || u.count <= 0) throw new Error(`個数が不正: ${u.count}`)
    exp += def.exp * u.count
  }

  const room = expToCap(master, user)
  if (room === 0) throw new Error('レベル上限に達している')
  if (exp > room) throw new Error('レベル上限を超える')

  return apply(me, gainExp(master, user, exp), use, exp * CURRENCY_PER_EXP)
}

// 上限解放
export function limitBreak(me: MeResponse, masterId: string): MeResponse {
  const { master, user } = find(me, masterId)
  if (!canLimitBreak(master, user)) throw new Error('上限解放できない')

  return apply(
    me,
    { ...user, limitBreak: user.limitBreak + 1 },
    master.limitBreakCosts[user.limitBreak],
    0,
  )
}

// スキルレベル上げ
export function skillLevelUp(me: MeResponse, masterId: string, skillId: string): MeResponse {
  const { master, user } = find(me, masterId)
  const skill = master.skills.find((s) => s.def.id === skillId)
  if (!skill) throw new Error(`スキルが無い: ${skillId}`)

  const level = effectiveSkillLevel(user, skillId)
  if (level >= MAX_SKILL_LEVEL) throw new Error('スキルレベルが上限')

  const costs = skill.levelUpCosts[level - 1]
  if (!costs) throw new Error(`コスト定義が無い: ${skillId} Lv${level}`)

  return apply(
    me,
    { ...user, skillLevels: { ...user.skillLevels, [skillId]: level + 1 } },
    costs,
    0,
  )
}
