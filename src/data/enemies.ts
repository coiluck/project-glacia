// 敵の定義。EnemySpawn.enemyId がこの Record のキーを参照する。
import type { EnemyDef } from '../features/battle/types';

export const enemyDefs: Record<string, EnemyDef> = {
  // 氷晶兵: 近接の雑魚
  iceGrunt: {
    id: 'iceGrunt',
    nameKey: 'enemyIceGrunt',
    classId: 'soldier',
    attack: 20,
    defense: 15,
    hp: 300,
    maxHp: 300,
  },
  // 氷晶射手: 遠距離の雑魚
  iceArcher: {
    id: 'iceArcher',
    nameKey: 'enemyIceArcher',
    classId: 'archer',
    attack: 22,
    defense: 10,
    hp: 200,
    maxHp: 200,
  },
  // 霜の略奪長: 扇形範囲攻撃持ち。HP50%以下で一度だけ自己回復する
  frostRaider: {
    id: 'frostRaider',
    nameKey: 'enemyFrostRaider',
    classId: 'raider',
    attack: 26,
    defense: 20,
    hp: 600,
    maxHp: 600,
    skill: {
      def: {
        id: 'frostMend',
        nameKey: 'skillFrostMend',
        apCost: 2,
        range: { kind: 'range', max: 0 }, // 対象マスを持たない = 自分対象
        effect: [{ type: 'healHp', amount: 200, target: 'self' }],
      },
      hpTriggers: [50],
    },
  },
};
