import { items } from '../../data/items'
import { characterMasters } from '../../data/characters'
import type { UserCharacter } from '../../data/characters/types'
import { effectiveSkillLevel } from '../../features/characters/growth'

// 手持ちキャラの次の育成1段で使う数
export interface GrowthUse {
  characterId: string
  skillId: string | null // null は上限解放
  level: number // スキルの上がった後のレベル
  count: number
}

export function growthUses(itemId: string, characters: UserCharacter[]): GrowthUse[] {
  const uses: GrowthUse[] = []
  for (const user of characters) {
    const master = characterMasters[user.masterId]
    const limitBreak = master.limitBreakCosts[user.limitBreak]?.find((c) => c.itemId === itemId)
    if (limitBreak) uses.push({ characterId: master.id, skillId: null, level: 0, count: limitBreak.count })
    for (const skill of master.skills) {
      const level = effectiveSkillLevel(user, skill.def.id)
      const cost = skill.levelUpCosts[level - 1]?.find((c) => c.itemId === itemId)
      if (cost) uses.push({ characterId: master.id, skillId: skill.def.id, level: level + 1, count: cost.count })
    }
  }
  return uses
}

// この品を材料にする品
export const productsOf = (itemId: string) =>
  Object.values(items).filter((it) => it.recipe?.some((c) => c.itemId === itemId))
