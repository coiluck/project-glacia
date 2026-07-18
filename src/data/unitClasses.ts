// 兵科の定義。味方キャラ・敵の両方が classId で参照する。
// 味方が使う兵科は range 型のみ（方向選択UIが未実装のため）。pattern 型は敵専用。
import type { UnitClassDef } from '../features/battle/types';

export const unitClasses: Record<string, UnitClassDef> = {
  // 剣士: 隣接1マスへの単体攻撃
  soldier: {
    id: 'soldier',
    nameKey: 'classSoldier',
    attackRange: { kind: 'range', max: 1 },
    attackPower: 50,
    attackTargets: 1,
    attackCost: 2,
    apPerTurn: 4,
  },
  // 弓兵: 距離2〜3の単体攻撃（隣接には撃てない）
  archer: {
    id: 'archer',
    nameKey: 'classArcher',
    attackRange: { kind: 'range', max: 3, min: 2 },
    attackPower: 40,
    attackTargets: 1,
    attackCost: 2,
    apPerTurn: 4,
  },
  // 魔導士: 距離1〜2の単体攻撃。威力は高いがAP消費が重い
  mage: {
    id: 'mage',
    nameKey: 'classMage',
    attackRange: { kind: 'range', max: 2 },
    attackPower: 60,
    attackTargets: 1,
    attackCost: 3,
    apPerTurn: 4,
  },
  // 略奪兵（敵専用）: 前方3マスの扇形を薙ぎ払う。範囲内の全ユニットに命中
  raider: {
    id: 'raider',
    nameKey: 'classRaider',
    attackRange: {
      kind: 'pattern',
      // 東向き基準: 正面とその両斜め前
      offsets: [
        { q: 1, r: 0 },
        { q: 1, r: -1 },
        { q: 0, r: 1 },
      ],
    },
    attackPower: 40,
    attackTargets: 'infinity',
    attackCost: 3,
    apPerTurn: 3,
  },
};
