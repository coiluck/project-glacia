import { describe, expect, it } from 'vitest';
import { battleStageRegistry } from '../../src/data/battleStages';
import { characterMasters } from '../../src/data/characters';
import { LIMIT_BREAK_LEVELS, MAX_LEVEL } from '../../src/data/characters/const';
import { enemyDefs } from '../../src/data/enemies';
import { NORMAL_ATTACK_POWER, calcDamage } from '../../src/features/battle/damage';
import type { ClassStats, Unit } from '../../src/features/battle/types';
import { toCharacterDef } from '../../src/features/characters/build';
import { resolveCharacter, statusAtLevel } from '../../src/features/characters/resolve';

// 敵の数値は「同じ Lv の味方と殴り合ったときの発数」で決めてある（src/data/enemies.ts の先頭）
// ここでは、どちらの通常攻撃も1発で相手を倒さないことだけを見る。味方は凸0、Lv はその敵と同じ

// calcDamage が見るのは攻撃と防御だけなので、それ以外は埋めておく
const unit = (side: Unit['side'], unitClass: ClassStats, level: number, hp: number, attack: number, defense: number): Unit => ({
  id: side,
  side,
  unitClass,
  level,
  pos: { q: 0, r: 0 },
  hp,
  maxHp: hp,
  attack,
  defense,
  ap: 0,
});

const allyAt = (masterId: string, level: number) => {
  const master = characterMasters[masterId];
  const lv = Math.min(level, MAX_LEVEL[master.rarity]);
  const resolved = resolveCharacter(master, {
    masterId,
    level: lv,
    exp: 0,
    limitBreak: LIMIT_BREAK_LEVELS[master.rarity].filter((wall) => lv > wall).length,
    dupe: 0,
    selectedSkillId: master.skills[0].def.id,
    skillLevels: {},
  });
  const def = toCharacterDef(resolved);
  return unit('ally', def.unitClass, def.level, def.hp, def.attack, def.defense);
};

const enemyAt = (enemyId: string, level: number) => {
  const def = enemyDefs[enemyId];
  const s = statusAtLevel(def.base, def.growth, level);
  return unit('enemy', def.unitClass, level, Math.floor(s.hp), Math.floor(s.attack), Math.floor(s.defense));
};

// ステージに出てくる敵と Lv の組み合わせ（重複なし）
const spawns = [
  ...new Map(
    Object.entries(battleStageRegistry).flatMap(([stageId, stage]) =>
      stage.enemies.map((e) => [`${e.enemyId}@${e.level}`, { stageId, enemyId: e.enemyId, level: e.level }] as const),
    ),
  ).values(),
];

describe('同じ Lv の味方との殴り合い', () => {
  it('どの敵も、同じ Lv のどの味方の通常攻撃1発でも倒れない', () => {
    const oneShots = spawns.flatMap(({ stageId, enemyId, level }) => {
      const enemy = enemyAt(enemyId, level);
      return Object.keys(characterMasters)
        .filter((id) => calcDamage(allyAt(id, level), enemy, NORMAL_ATTACK_POWER) >= enemy.hp)
        .map((id) => `${stageId} ${enemyId} Lv${level} <- ${id}`);
    });
    expect(oneShots).toEqual([]);
  });

  it('どの敵の通常攻撃1発でも、同じ Lv のどの味方も倒れない', () => {
    const oneShots = spawns.flatMap(({ stageId, enemyId, level }) => {
      const enemy = enemyAt(enemyId, level);
      return Object.keys(characterMasters)
        .filter((id) => {
          const ally = allyAt(id, level);
          return calcDamage(enemy, ally, NORMAL_ATTACK_POWER) >= ally.hp;
        })
        .map((id) => `${stageId} ${enemyId} Lv${level} -> ${id}`);
    });
    expect(oneShots).toEqual([]);
  });
});
