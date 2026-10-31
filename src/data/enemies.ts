// 敵の定義。EnemySpawn.enemyId がこの Record のキーを参照する
// growth は味方の平均に合わせて base の HP 3.2%・攻撃 4.5%・防御 4% 前後
import type { EnemyDef } from '../features/battle/types';

export const enemyDefs: Record<string, EnemyDef> = {
  // コオリモチ: 1章前半の雑魚。1-1 のチュートリアルはラピス1人で2体倒せる強さに合わせてある
  glacimo: {
    id: 'glacimo',
    nameKey: 'enemyGlacimo',
    classId: 'soldier',
    base: { hp: 120, attack: 9, defense: 12 },
    growth: { hp: 3.8, attack: 0.4, defense: 0.5 },
  },
  // シモフクロウ: 弓兵。水や壁の向こうから撃ってくる。隣に寄れば撃てない
  rimeowl: {
    id: 'rimeowl',
    nameKey: 'enemyRimeowl',
    classId: 'archer',
    base: { hp: 140, attack: 14, defense: 10 },
    growth: { hp: 4.5, attack: 0.6, defense: 0.4 },
  },
  // カゲロウ: 攻撃が高く守りが薄い。放っておくと1人落とされる
  wispwraith: {
    id: 'wispwraith',
    nameKey: 'enemyWispwraith',
    classId: 'soldier',
    base: { hp: 180, attack: 18, defense: 9 },
    growth: { hp: 5.8, attack: 0.8, defense: 0.4 },
  },
  // イワモチ: 硬いが痛くない。狭い通路をふさぐ役
  saximo: {
    id: 'saximo',
    nameKey: 'enemySaximo',
    classId: 'soldier',
    base: { hp: 260, attack: 14, defense: 26 },
    growth: { hp: 8.3, attack: 0.6, defense: 1 },
  },
  // ホムラモチ: 魔導士。1ターンに1発だが重い
  ignimo: {
    id: 'ignimo',
    nameKey: 'enemyIgnimo',
    classId: 'mage',
    base: { hp: 300, attack: 24, defense: 16 },
    growth: { hp: 9.6, attack: 1.1, defense: 0.6 },
  },
  // 白焔: 1章と2章のボス（2章は Lv を上げた別個体）。2ターンごとと、HP50%を切ったときに周囲をまとめて焼く
  palefire: {
    id: 'palefire',
    nameKey: 'enemyPalefire',
    classId: 'mage',
    base: { hp: 1500, attack: 24, defense: 22 },
    growth: { hp: 48, attack: 1.1, defense: 0.9 },
    skill: {
      def: {
        id: 'palefireFoxfire',
        nameKey: 'skillFoxfire',
        apCost: 4,
        range: { kind: 'range', min: 0, max: 3 },
        effect: [
          { type: 'damage', power: 92, target: 'enemy', area: { kind: 'range', min: 0, max: 1 } },
        ],
      },
      everyNTurns: 2,
      hpTriggers: [50],
    },
  },
  // クロガラ: 帝都の裂け目から出てきた黒い殻の獣。3-7 で境界の隙間から出てくる
  // 移動したターンは攻撃できないが、隣に立つと正面の3マスをまとめて薙ぐ
  duskshell: {
    id: 'duskshell',
    nameKey: 'enemyDuskshell',
    classId: 'raider',
    base: { hp: 320, attack: 26, defense: 20 },
    growth: { hp: 10.2, attack: 1.2, defense: 0.8 },
  },
  // 自動人形: 4-2 で1体だけ出てくる。硬くて痛い剣士で、隣に並んだ相手を2回殴る
  // 3ターンごとと、HP50%を切ったときに、まわり1マスへまとめて熱を吐き出す
  automaton: {
    id: 'automaton',
    nameKey: 'enemyAutomaton',
    classId: 'soldier',
    base: { hp: 1200, attack: 28, defense: 24 },
    growth: { hp: 64, attack: 1.3, defense: 0.9 },
    skill: {
      def: {
        id: 'automatonHeatVent',
        nameKey: 'skillHeatVent',
        apCost: 3,
        range: { kind: 'range', min: 0, max: 0 },
        effect: [
          { type: 'damage', power: 80, target: 'enemy', area: { kind: 'range', min: 1, max: 1 } },
        ],
      },
      everyNTurns: 3,
      hpTriggers: [50],
    },
  },
};
