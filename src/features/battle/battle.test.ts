import { describe, expect, it } from 'vitest';
import { movementRange } from './battle';
import { axialKey, type Axial } from './hex';
import type { BattleStageData, BattleState, ClassStats, Side, Unit } from './types';

// 1列に並んだ通路。回り道が無いので、通り抜けられるかどうかがそのまま結果に出る
const corridor: BattleStageData = {
  tiles: [0, 1, 2, 3, 4].map((q) => ({ pos: { q, r: 0 }, terrain: 'stone' as const })),
  deployableTiles: [],
  partyApPerTurn: 10,
  enemies: [],
};

const cls: ClassStats = { attackRange: { kind: 'range', max: 1 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 };
const unit = (id: string, side: Side, q: number): Unit => ({
  id,
  side,
  unitClass: cls,
  level: 1,
  pos: { q, r: 0 },
  hp: 100,
  maxHp: 100,
  attack: 10,
  defense: 10,
  ap: 3,
});
const battle = (units: Unit[]): BattleState => ({ phase: 'player', turn: 1, partyAp: 10, units });
const destinations = (state: BattleState, id: string) =>
  movementRange(state, corridor, state.units.find((u) => u.id === id)!).map((t) => `${axialKey(t.pos)}:${t.cost}`);
const at = (p: Axial, cost: number) => `${axialKey(p)}:${cost}`;

describe('移動', () => {
  it('味方は味方の居るマスを通り抜けて、その先へ歩数ぶんの AP で動ける', () => {
    const state = battle([unit('a', 'ally', 0), unit('b', 'ally', 1)]);
    expect(destinations(state, 'a')).toEqual([at({ q: 2, r: 0 }, 2), at({ q: 3, r: 0 }, 3)]);
  });

  it('味方の居るマスには止まれない', () => {
    const state = battle([unit('a', 'ally', 0), unit('b', 'ally', 1), unit('c', 'ally', 2)]);
    expect(destinations(state, 'a')).toEqual([at({ q: 3, r: 0 }, 3)]);
  });

  it('敵の居るマスは通り抜けられない', () => {
    const state = battle([unit('a', 'ally', 0), unit('e', 'enemy', 1)]);
    expect(destinations(state, 'a')).toEqual([]);
  });

  it('敵も敵の居るマスを通り抜けられ、味方の居るマスは通れない', () => {
    const state = battle([unit('e1', 'enemy', 0), unit('e2', 'enemy', 1), unit('a', 'ally', 3)]);
    expect(destinations(state, 'e1')).toEqual([at({ q: 2, r: 0 }, 2)]);
  });
});
