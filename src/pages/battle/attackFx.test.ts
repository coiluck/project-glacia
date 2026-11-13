import { describe, expect, it } from 'vitest';
import { battleStageRegistry } from '../../data/battleStages';
import { enemyDefs } from '../../data/enemies';
import { castSkill, createBattleState, deployAlly, endTurn, moveUnit, startBattle } from '../../features/battle/battle';
import { axialKey } from '../../features/battle/hex';
import type { Axial } from '../../features/battle/hex';
import { battlePartyFor } from '../../features/battle/replay';
import type { BattleState, Unit } from '../../features/battle/types';
import { attackFxOf } from './attackFx';

// 判定に要るのは陣営・位置・HP・AP・兵科だけなので、それ以外は適当な値で埋める
function unit(id: string, side: Unit['side'], pos: Axial, extra: Partial<Unit> = {}): Unit {
  return {
    id,
    side,
    unitClass: { attackRange: { kind: 'range', max: 1 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 },
    level: 1,
    pos,
    hp: 100,
    maxHp: 100,
    attack: 10,
    defense: 0,
    ap: 4,
    ...extra,
  };
}
const board = (units: Unit[]): BattleState => ({ phase: 'enemy', turn: 1, partyAp: 10, units });
const stage = battleStageRegistry['1-1'];

describe('attackFxOf', () => {
  it('敵が隣の味方を攻撃すると、踏み込んで斬る', () => {
    const prev = board([unit('e', 'enemy', { q: 0, r: 0 }), unit('a', 'ally', { q: 1, r: 0 })]);
    const next = board([unit('e', 'enemy', { q: 0, r: 0 }, { ap: 2 }), unit('a', 'ally', { q: 1, r: 0 }, { hp: 80 })]);
    const fx = attackFxOf(0, prev, next, stage)!;
    expect(fx.motion).toBe('lunge');
    expect(fx.projectile).toBeUndefined();
    expect(fx.hits).toEqual([{ unitId: 'a', pos: { q: 1, r: 0 }, value: -20, impact: 'slash' }]);
  });

  it('敵が離れた味方を攻撃すると、矢を撃つ', () => {
    const prev = board([unit('e', 'enemy', { q: 0, r: 0 }), unit('a', 'ally', { q: 3, r: 0 })]);
    const next = board([unit('e', 'enemy', { q: 0, r: 0 }, { ap: 2 }), unit('a', 'ally', { q: 3, r: 0 }, { hp: 80 })]);
    const fx = attackFxOf(0, prev, next, stage)!;
    expect(fx.motion).toBe('cast');
    expect(fx.projectile?.type).toBe('arrow');
    expect(fx.hits[0].impact).toBe('spark');
  });

  it('味方は距離ではなく兵科で決まる（魔導士は隣でも魔弾）', () => {
    const prev = board([unit('a', 'ally', { q: 0, r: 0 }, { classId: 'mage' }), unit('e', 'enemy', { q: 1, r: 0 })]);
    const next = board([
      unit('a', 'ally', { q: 0, r: 0 }, { classId: 'mage', ap: 1 }),
      unit('e', 'enemy', { q: 1, r: 0 }, { hp: 70 }),
    ]);
    const fx = attackFxOf(0, prev, next, stage)!;
    expect(fx.projectile?.type).toBe('orb');
    expect(fx.hits[0].impact).toBe('burst');
  });

  it('移動してから攻撃したときは、移動が終わってから動き出す', () => {
    const prev = board([unit('e', 'enemy', { q: 0, r: 0 }), unit('a', 'ally', { q: 2, r: 0 })]);
    const next = board([unit('e', 'enemy', { q: 1, r: 0 }, { ap: 0 }), unit('a', 'ally', { q: 2, r: 0 }, { hp: 80 })]);
    const fx = attackFxOf(0, prev, next, stage)!;
    expect(fx.start).toBeGreaterThan(0);
    expect(fx.actorPos).toEqual({ q: 1, r: 0 });
    expect(fx.hitAt).toBeGreaterThan(fx.start);
  });

  it('回復だけのスキルは、回復の着弾になる', () => {
    const prev = board([unit('h', 'ally', { q: 0, r: 0 }, { classId: 'mage' }), unit('a', 'ally', { q: 1, r: 0 }, { hp: 50 })]);
    const next = board([
      unit('h', 'ally', { q: 0, r: 0 }, { classId: 'mage', ap: 1 }),
      unit('a', 'ally', { q: 1, r: 0 }, { hp: 80 }),
    ]);
    const fx = attackFxOf(0, prev, next, stage)!;
    expect(fx.projectile).toBeUndefined();
    expect(fx.hits).toEqual([{ unitId: 'a', pos: { q: 1, r: 0 }, value: 30, impact: 'heal' }]);
  });

  it('倒したユニットは倒れ終わるまで残す', () => {
    const prev = board([unit('e', 'enemy', { q: 0, r: 0 }), unit('a', 'ally', { q: 1, r: 0 }, { hp: 10 })]);
    const next = board([unit('e', 'enemy', { q: 0, r: 0 }, { ap: 2 })]);
    const fx = attackFxOf(0, prev, next, stage)!;
    expect(fx.ghosts.map((g) => [g.id, g.hp])).toEqual([['a', 0]]);
    expect(fx.end).toBeGreaterThan(fx.dieAt);
  });

  describe('1-1 の実際の盤面', () => {
    const party = battlePartyFor({}, {}, [], '1-1', 1);
    const deployed = deployAlly(createBattleState(stage, enemyDefs), stage, party[0].character, party[0].skill, { q: -2, r: 0 });
    const started = startBattle(deployed, stage);
    const moved = moveUnit(started, stage, 'ally-lapis', { q: -1, r: 0 });
    const aim = { q: 2, r: -1 };
    const casted = castSkill(moved, stage, 'ally-lapis', aim);

    it('移動だけでは演出を出さない', () => {
      expect(attackFxOf(0, started, moved, stage)).toBeNull();
    });

    it('ターン送りとやり直しでは演出を出さない', () => {
      expect(attackFxOf(0, casted, endTurn(casted, stage), stage)).toBeNull();
      expect(attackFxOf(0, casted, moved, stage)).toBeNull();
    });

    it('範囲スキルの効果範囲は、狙ったマスと当たったユニットのマスを含む', () => {
      const fx = attackFxOf(0, moved, casted, stage, aim)!;
      const area = new Set(fx.area.map(axialKey));
      const missing = [aim, ...fx.hits.map((h) => h.pos)].filter((p) => !area.has(axialKey(p)));
      expect(missing).toEqual([]);
    });

    it('スキルで倒れた敵は倒れる演出に回る', () => {
      const fx = attackFxOf(0, moved, casted, stage, aim)!;
      const gone = moved.units.filter((u) => !casted.units.some((c) => c.id === u.id)).map((u) => u.id);
      expect(gone.length).toBeGreaterThan(0);
      expect(fx.ghosts.map((g) => g.id)).toEqual(gone);
    });
  });
});
