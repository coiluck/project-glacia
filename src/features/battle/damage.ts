import type { Unit } from './types';

export function calcDamage(attacker: Unit, defender: Unit, skillPower: number): number {
  const safeDefense = Math.max(defender.defense, 1);
  const damage = skillPower * attacker.attack / safeDefense;
  return Math.max(Math.floor(damage), 0);
}