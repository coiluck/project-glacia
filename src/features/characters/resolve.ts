// マスターデータ（data/characters/）と所持データ（characterStore）を合成して、
// 全ページ共通の「解決済みキャラ」を作る。
// 成長・凸ボーナス・スキルレベルの計算はここだけに置く。
// 戦闘用の形（CharacterDef）への変換は build.ts が担当する。
import type { SkillDef, SkillEffect } from '../battle/types'
import type {
  CharacterMaster,
  CharacterSkillMaster,
  MaterialCost,
  Status,
  UserCharacter,
} from '../../data/characters/types'
import { characterMasters } from '../../data/characters'
import {
  canLimitBreak,
  effectiveLevel,
  effectiveSkillLevel,
  expToNextLevel,
  maxLevel,
} from './growth'

// スキル1つ分の解決結果
export interface ResolvedSkill {
  def: SkillDef // スキルレベルと凸を反映済み。戦闘はこれをそのまま使える
  descriptionKey: string
  level: number
  nextLevelCost: MaterialCost[] | null // null ならスキルレベル上限
}

// キャラ1体の解決結果。編成・メンバー詳細・強化・図鑑・戦闘が共通で参照する
export interface ResolvedCharacter {
  master: CharacterMaster // rarity / nameKey はここから引く
  user: UserCharacter
  level: number // 上限で丸めた実効レベル
  maxLevel: number // 今の上限解放で到達できるレベル
  expToNext: number | null // 次のレベルまでの必要経験値。null ならレベル上限
  status: Status
  skills: ResolvedSkill[]
  selectedSkill: ResolvedSkill // 出撃時に使うスキル
  canLimitBreak: boolean
  nextLimitBreakCost: MaterialCost[] | null // null なら上限解放を使い切っている
}

// レベルぶんの成長と、解放済みの凸のステータスボーナスを足す
function resolveStatus(master: CharacterMaster, user: UserCharacter, level: number): Status {
  const levels = level - 1
  let hp = master.base.hp + master.growth.hp * levels
  let attack = master.base.attack + master.growth.attack * levels
  let defense = master.base.defense + master.growth.defense * levels

  for (const bonus of master.dupeBonuses.slice(0, user.dupe)) {
    if (!bonus.status) continue
    hp += bonus.status.hp ?? 0
    attack += bonus.status.attack ?? 0
    defense += bonus.status.defense ?? 0
  }

  return { hp: Math.floor(hp), attack: Math.floor(attack), defense: Math.floor(defense) }
}

// 効果の威力（damage は power、それ以外は amount）に加算する
function addPower(effect: SkillEffect, add: number): SkillEffect {
  if (add === 0) return effect
  switch (effect.type) {
    case 'damage':
      return { ...effect, power: effect.power + add }
    case 'healHp':
      return { ...effect, amount: effect.amount + add }
    case 'grantAp':
      return { ...effect, amount: effect.amount + add }
  }
}

// スキルレベルぶんの上昇と、凸によるAP消費の軽減を反映する
function resolveSkill(
  master: CharacterMaster,
  skill: CharacterSkillMaster,
  user: UserCharacter,
): ResolvedSkill {
  const level = effectiveSkillLevel(user, skill.def.id)
  const gain = level - 1
  const apDelta = master.dupeBonuses
    .slice(0, user.dupe)
    .reduce((sum, b) => sum + (b.skillApCost ?? 0), 0)

  return {
    def: {
      ...skill.def,
      apCost: Math.max(1, skill.def.apCost + apDelta),
      effect: skill.def.effect.map((e, i) => addPower(e, (skill.effectGrowth[i] ?? 0) * gain)),
    },
    descriptionKey: skill.descriptionKey,
    level,
    // levelUpCosts の添字0が Lv1 -> 2 なので、次のレベルのコストは level - 1 番目
    nextLevelCost: skill.levelUpCosts[level - 1] ?? null,
  }
}

// キャラ1体を解決する
export function resolveCharacter(master: CharacterMaster, user: UserCharacter): ResolvedCharacter {
  const level = effectiveLevel(master, user)
  const cap = maxLevel(master.rarity, user.limitBreak)
  const skills = master.skills.map((s) => resolveSkill(master, s, user))

  return {
    master,
    user,
    level,
    maxLevel: cap,
    expToNext: expToNextLevel(level, cap),
    status: resolveStatus(master, user, level),
    skills,
    selectedSkill: skills.find((s) => s.def.id === user.selectedSkillId) ?? skills[0],
    canLimitBreak: canLimitBreak(master, user),
    // limitBreakCosts の添字0が1回目なので、次の解放のコストは limitBreak 番目
    nextLimitBreakCost: master.limitBreakCosts[user.limitBreak] ?? null,
  }
}

// 所持データからキャラを解決する。マスター未定義・未所持なら null
export function resolveOwned(
  owned: Record<string, UserCharacter>,
  id: string,
): ResolvedCharacter | null {
  const master = characterMasters[id]
  const user = owned[id]
  if (!master || !user) return null
  return resolveCharacter(master, user)
}
