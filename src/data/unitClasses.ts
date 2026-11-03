// 味方の兵科の定義。キャラの classId がこの Record のキーを参照する。敵の通常攻撃と AP は enemies.ts で敵ごとに決める
// 味方が使う兵科は range 型のみ（通常攻撃には向きを決める手段が無いため）。
// スキル（SkillDef.range）は狙えるマスと一緒に向きを持ち回るので、味方でも pattern 型を使える。
import type { UnitClassDef } from '../features/battle/types';

export const unitClasses: Record<string, UnitClassDef> = {
  // 剣士: 隣接1マスへの単体攻撃
  soldier: {
    id: 'soldier',
    nameKey: 'classSoldier',
    attackRange: { kind: 'range', max: 1 },
    attackTargets: 1,
    attackCost: 2,
    apPerTurn: 4,
  },
  // 弓兵: 距離2〜3の単体攻撃（隣接には撃てない）
  archer: {
    id: 'archer',
    nameKey: 'classArcher',
    attackRange: { kind: 'range', max: 3, min: 2 },
    attackTargets: 1,
    attackCost: 2,
    apPerTurn: 4,
  },
  // 魔導士: 距離1〜2の単体攻撃。AP消費が重い
  mage: {
    id: 'mage',
    nameKey: 'classMage',
    attackRange: { kind: 'range', max: 2 },
    attackTargets: 1,
    attackCost: 3,
    apPerTurn: 4,
  },
};
