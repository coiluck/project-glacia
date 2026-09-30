import {
  EXP_TO_NEXT_LEVEL,
  LIMIT_BREAK_LEVELS,
  MAX_LEVEL,
  MAX_SKILL_LEVEL,
} from '../../data/characters/const'
import type { CharacterMaster, Rarity, UserCharacter } from '../../data/characters/types'

// 上限解放の回数 -> レベル上限
export function maxLevel(rarity: Rarity, limitBreak: number): number {
  return LIMIT_BREAK_LEVELS[rarity][limitBreak] ?? MAX_LEVEL[rarity]
}

export function effectiveLevel(master: CharacterMaster, user: UserCharacter): number {
  return Math.min(Math.max(user.level, 1), maxLevel(master.rarity, user.limitBreak))
}

export function effectiveSkillLevel(user: UserCharacter, skillId: string): number {
  return Math.min(Math.max(user.skillLevels[skillId] ?? 1, 1), MAX_SKILL_LEVEL)
}

// 次のレベルに上がるのに必要な経験値
export function expToNextLevel(level: number, levelCap: number): number | null {
  if (level >= levelCap) return null
  let exp = EXP_TO_NEXT_LEVEL[0].exp
  for (const band of EXP_TO_NEXT_LEVEL) {
    if (band.fromLevel > level) break
    exp = band.exp
  }
  return exp
}

// レベルアップ
export function gainExp(
  master: CharacterMaster,
  user: UserCharacter,
  amount: number,
): UserCharacter {
  const cap = maxLevel(master.rarity, user.limitBreak)
  let level = effectiveLevel(master, user)
  let exp = user.exp + amount

  for (;;) {
    const need = expToNextLevel(level, cap)
    if (need === null) return { ...user, level, exp: 0 }
    if (exp < need) break
    exp -= need
    level += 1
  }
  return { ...user, level, exp }
}

// レベル上限まで何経験値足りないか
export function expToCap(master: CharacterMaster, user: UserCharacter): number {
  const cap = maxLevel(master.rarity, user.limitBreak)
  let total = 0
  for (let level = effectiveLevel(master, user); level < cap; level++) {
    total += expToNextLevel(level, cap) ?? 0
  }
  return Math.max(0, total - user.exp)
}

// 次の上限解放ができるか。壁のレベルに達していて、まだ回数が残っていること
export function canLimitBreak(master: CharacterMaster, user: UserCharacter): boolean {
  const walls = LIMIT_BREAK_LEVELS[master.rarity]
  if (user.limitBreak >= walls.length) return false
  return user.level >= walls[user.limitBreak]
}
