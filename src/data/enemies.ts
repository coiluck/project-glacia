// 敵の定義。EnemySpawn.enemyId がこの Record のキーを参照する。
import type { EnemyDef } from '../features/battle/types';

export const enemyDefs: Record<string, EnemyDef> = {
  // コオリモチ: 1章前半の雑魚。1-1 のチュートリアルはラピス1人で2体倒せる強さに合わせてある
  glacimo: {
    id: 'glacimo',
    nameKey: 'enemyGlacimo',
    classId: 'soldier',
    attack: 9,
    defense: 12,
    hp: 120,
    maxHp: 120,
  },
  // シモフクロウ: 弓兵。水や壁の向こうから撃ってくる。隣に寄れば撃てない
  rimeowl: {
    id: 'rimeowl',
    nameKey: 'enemyRimeowl',
    classId: 'archer',
    attack: 14,
    defense: 10,
    hp: 140,
    maxHp: 140,
  },
  // カゲロウ: 攻撃が高く守りが薄い。放っておくと1人落とされる
  wispwraith: {
    id: 'wispwraith',
    nameKey: 'enemyWispwraith',
    classId: 'soldier',
    attack: 18,
    defense: 9,
    hp: 180,
    maxHp: 180,
  },
  // イワモチ: 硬いが痛くない。狭い通路をふさぐ役
  saximo: {
    id: 'saximo',
    nameKey: 'enemySaximo',
    classId: 'soldier',
    attack: 14,
    defense: 26,
    hp: 260,
    maxHp: 260,
  },
  // ホムラモチ: 魔導士。1ターンに1発だが重い
  ignimo: {
    id: 'ignimo',
    nameKey: 'enemyIgnimo',
    classId: 'mage',
    attack: 24,
    defense: 16,
    hp: 300,
    maxHp: 300,
  },
  // 白焔: 1章のボス。2ターンごとと、HP50%を切ったときに周囲をまとめて焼く
  palefire: {
    id: 'palefire',
    nameKey: 'enemyPalefire',
    classId: 'mage',
    attack: 24,
    defense: 22,
    hp: 1500,
    maxHp: 1500,
    skill: {
      def: {
        id: 'palefireFoxfire',
        nameKey: 'skillFoxfire',
        apCost: 4,
        range: { kind: 'range', min: 0, max: 3 },
        effect: [
          { type: 'damage', power: 55, target: 'enemy', area: { kind: 'range', min: 0, max: 1 } },
        ],
      },
      everyNTurns: 2,
      hpTriggers: [50],
    },
  },
};
