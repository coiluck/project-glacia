import type { Unit } from './types';

// 通常攻撃の威力。兵科によらず攻撃力の100%
export const NORMAL_ATTACK_POWER = 100;

// power は攻撃力に対する%（通常攻撃は NORMAL_ATTACK_POWER、スキルは SkillEffect.power）
export function calcDamage(attacker: Unit, defender: Unit, power: number): number {
  const safeDefense = Math.max(defender.defense, 1);
  const damage = power * attacker.attack / safeDefense;
  return Math.max(Math.floor(damage), 0);
}

// amount は術者の攻撃力に対する%。防御の影響は受けない
export function calcHeal(caster: Unit, amount: number): number {
  return Math.max(Math.floor(amount * caster.attack / 100), 0);
}