// レベル・経験値・上限解放のルール。data/characters/types.ts の定数だけを見る純粋な算術で、
// ストアやマスターデータの構造には依存しない。強化画面もここを呼ぶ。
import {
  EXP_TO_NEXT_LEVEL,
  LIMIT_BREAK_LEVELS,
  MAX_LEVEL,
  MAX_SKILL_LEVEL,
} from '../../data/characters/types'
import type { CharacterMaster, Rarity, UserCharacter } from '../../data/characters/types'

// 済んだ上限解放の回数から、今の到達可能なレベル上限を返す。
// 解放が済んでいない最初の壁がその時点の上限。全部済んでいればレアリティ上限
export function maxLevel(rarity: Rarity, limitBreak: number): number {
  return LIMIT_BREAK_LEVELS[rarity][limitBreak] ?? MAX_LEVEL[rarity]
}

// 所持データのレベルを、実際に到達できる範囲へ丸める。
// ステータス計算はこの値を使う（不正なレベルがそのまま計算に乗るのを防ぐ）
export function effectiveLevel(master: CharacterMaster, user: UserCharacter): number {
  return Math.min(Math.max(user.level, 1), maxLevel(master.rarity, user.limitBreak))
}

// スキルレベルも同様に 1 〜 MAX_SKILL_LEVEL へ丸める
export function effectiveSkillLevel(user: UserCharacter, skillId: string): number {
  return Math.min(Math.max(user.skillLevels[skillId] ?? 1, 1), MAX_SKILL_LEVEL)
}

// 次のレベルに上がるのに必要な経験値。上限に達していれば null
export function expToNextLevel(level: number, levelCap: number): number | null {
  if (level >= levelCap) return null
  // fromLevel が現在レベル以下の帯のうち、いちばん後ろのものが適用される
  let exp = EXP_TO_NEXT_LEVEL[0].exp
  for (const band of EXP_TO_NEXT_LEVEL) {
    if (band.fromLevel > level) break
    exp = band.exp
  }
  return exp
}

// 次の上限解放ができるか。壁のレベルに達していて、まだ回数が残っていること
export function canLimitBreak(master: CharacterMaster, user: UserCharacter): boolean {
  const walls = LIMIT_BREAK_LEVELS[master.rarity]
  if (user.limitBreak >= walls.length) return false
  return user.level >= walls[user.limitBreak]
}
