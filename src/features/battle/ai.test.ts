import { describe, expect, it } from 'vitest';
import { isSkillDue } from './ai';
import type { BattleState, ClassStats, SkillDef, Unit } from './types';

const cls: ClassStats = { attackRange: { kind: 'range', max: 1 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 };
const skill: SkillDef = { id: 's', nameKey: 's', apCost: 2, range: { kind: 'range', max: 0 }, effect: [] };
const enemy = (extra: Partial<Unit>): Unit => ({
  id: 'enemy-0-x', side: 'enemy', unitClass: cls, level: 1, pos: { q: 0, r: 0 }, hp: 10, maxHp: 10, attack: 1, defense: 1, ap: 4, ...extra,
});
const at = (turn: number): BattleState => ({ phase: 'player', turn, partyAp: 10, units: [] });

describe('敵のスキルの番', () => {
  it('スキルを持たない敵は番が来ない', () => {
    expect(isSkillDue(at(9), enemy({}))).toBe(false);
  });

  it('2ターンごとなら、2ターン目に番が来て、使ったターンと次のターンは来ない', () => {
    const e = enemy({ skill, skillEveryNTurns: 2 });
    expect([1, 2, 3].map((t) => isSkillDue(at(t), e))).toEqual([false, true, true]);
    expect([2, 3, 4].map((t) => isSkillDue(at(t), { ...e, lastSkillTurn: 2 }))).toEqual([false, false, true]);
  });
});
