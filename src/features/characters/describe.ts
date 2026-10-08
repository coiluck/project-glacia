// スキルの説明文の組み立て。
// 効果量はスキルレベルと凸で変わるので、i18n 側は数値を {0} {1} … で空けておき、
// 解決済みの ResolvedSkill から埋める。
import type { DupeBonus } from '../../data/characters/types'
import type { SkillEffect } from '../battle/types'
import type { ResolvedSkill } from './resolve'

// 効果量（damage は power、それ以外は amount）。resolve.ts の addPower と対になる
function effectValue(effect: SkillEffect): number {
  switch (effect.type) {
    case 'damage':
      return effect.power
    case 'healHp':
      return effect.amount
    case 'grantAp':
      return effect.amount
  }
}

// 説明文の {0} {1} … を def.effect の同じ添字の効果量で埋める。
// 添字の並びは effectGrowth と同じ（どちらも def.effect 基準）
export function formatSkillDescription(template: string, skill: ResolvedSkill): string {
  return template.replace(/\{(\d+)\}/g, (match, index: string) => {
    const effect = skill.def.effect[Number(index)]
    return effect ? String(effectValue(effect)) : match
  })
}

// 凸1つ分の効果を項目ごとの文にする
export function describeDupeBonus(bonus: DupeBonus): string[] {
  const parts: string[] = []
  if (bonus.status?.hp) parts.push(`HP +${bonus.status.hp}`)
  if (bonus.status?.attack) parts.push(`ATK +${bonus.status.attack}`)
  if (bonus.status?.defense) parts.push(`DEF +${bonus.status.defense}`)
  if (bonus.skillApCost) parts.push(`スキルAP ${bonus.skillApCost}`)
  return parts
}
