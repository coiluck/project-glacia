// 解決済みキャラ（resolve.ts）を戦闘用の形（CharacterDef / SkillDef）に変換する。
// 成長・凸ボーナス・スキルレベルの計算は resolve.ts 側にある。
import type { CharacterDef, SkillDef } from '../battle/types'
import type { UserCharacter } from '../../data/characters/types'
import type { ResolvedCharacter } from './resolve'
import { resolveOwned } from './resolve'

// 出撃1人分。キャラと、編成画面で選んだスキル1つ
export interface PartyMember {
  character: CharacterDef
  skill: SkillDef
}

// 解決済みキャラを戦闘用データに変換する
export function toCharacterDef(resolved: ResolvedCharacter): CharacterDef {
  const { master, status, skills } = resolved
  return {
    id: master.id,
    nameKey: master.nameKey,
    classId: master.classId,
    attack: status.attack,
    defense: status.defense,
    hp: status.hp,
    maxHp: status.hp,
    skills: skills.map((s) => s.def),
  }
}

// 編成を戦闘用データに変換する。BattlePage はこれを呼ぶ。
// ストアは読まないので、呼び出し側が所持データと編成を渡す
// 未所持・マスター未定義の ID は落とす
export function buildParty(
  owned: Record<string, UserCharacter>,
  partyIds: string[],
): PartyMember[] {
  return partyIds.flatMap((id) => {
    const resolved = resolveOwned(owned, id)
    if (!resolved) return []
    return [{ character: toCharacterDef(resolved), skill: resolved.selectedSkill.def }]
  })
}
