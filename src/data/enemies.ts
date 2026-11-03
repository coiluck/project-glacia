// 敵の定義。EnemySpawn.enemyId がこの Record のキーを参照する
// 数値は「同じ Lv の味方（全キャラの中央値）と殴り合ったときの発数」から決めてある。どの Lv でもこの発数がおおむね保たれる
//   コオリモチ   通常攻撃 1.27発ぶん（2発） / 1発で味方の HP の15%
//   シモフクロウ 1.7発ぶん（2発）            / 18%
//   カゲロウ     1.8発ぶん（2発）            / 28%
//   イワモチ     4.4発ぶん（5発）            / 10%
//   ホムラモチ   2.6発ぶん（3発）            / 30%
//   クロガラ     3.6発ぶん（4発）            / 20%（最大3人に当たる）
//   白焔         17発ぶん                    / 33%
//   自動人形     18発ぶん                    / 22%
// ダメージは攻撃と防御の比で決まるので、防御を味方の攻撃と同じ率で伸ばすと1発のダメージが Lv によらず一定になり、HP を伸ばせない
// そのため防御の伸びは base の 1〜3% に抑え、HP と攻撃は Lv1〜50 で上の発数になるよう当てはめてある
// unitClass（通常攻撃と AP）は味方の兵科とは別に、敵ごとに決める。上の発数はこの AP と攻撃コストを前提にしている
import type { EnemyDef } from '../features/battle/types';

export const enemyDefs: Record<string, EnemyDef> = {
  // コオリモチ: 1章前半の雑魚。1-1 のチュートリアルに合わせて、ラピス Lv1 の通常攻撃（250）では倒れず、氷礫（355）なら1発で倒れる HP にしてある
  // 隣接1マスへの単体攻撃。1-1 のチュートリアルは「3マス歩くと AP が尽きて攻撃できない」ことを見せるので、AP は4から変えない
  glacimo: {
    id: 'glacimo',
    nameKey: 'enemyGlacimo',
    unitClass: { attackRange: { kind: 'range', max: 1 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 },
    base: { hp: 351, attack: 4.28, defense: 12 },
    growth: { hp: 8.19, attack: 0.65, defense: 0.12 },
  },
  // シモフクロウ: 距離2〜3の単体攻撃。水や壁の向こうから撃ってくる。隣に寄れば撃てない
  rimeowl: {
    id: 'rimeowl',
    nameKey: 'enemyRimeowl',
    unitClass: { attackRange: { kind: 'range', min: 2, max: 3 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 },
    base: { hp: 570, attack: 4.31, defense: 10 },
    growth: { hp: 2.68, attack: 0.81, defense: 0.3 },
  },
  // カゲロウ: 攻撃が高く守りが薄い。放っておくと1人落とされる。隣接1マスへの単体攻撃
  wispwraith: {
    id: 'wispwraith',
    nameKey: 'enemyWispwraith',
    unitClass: { attackRange: { kind: 'range', max: 1 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 },
    base: { hp: 684, attack: 6.47, defense: 9 },
    growth: { hp: 6.19, attack: 1.27, defense: 0.2 },
  },
  // イワモチ: 硬いが痛くない。狭い通路をふさぐ役。隣接1マスへの単体攻撃
  saximo: {
    id: 'saximo',
    nameKey: 'enemySaximo',
    unitClass: { attackRange: { kind: 'range', max: 1 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 },
    base: { hp: 564, attack: 2.32, defense: 26 },
    growth: { hp: 4.25, attack: 0.45, defense: 0.65 },
  },
  // ホムラモチ: 距離1〜2の単体攻撃。1ターンに1発だが重い
  ignimo: {
    id: 'ignimo',
    nameKey: 'enemyIgnimo',
    unitClass: { attackRange: { kind: 'range', max: 2 }, attackTargets: 1, attackCost: 3, apPerTurn: 4 },
    base: { hp: 560, attack: 6.95, defense: 16 },
    growth: { hp: 5.68, attack: 1.37, defense: 0.32 },
  },
  // 白焔: 1章と2章のボス（2章は Lv を上げた別個体）。2ターンごとと、HP50%を切ったときに周囲をまとめて焼く
  // 通常攻撃は距離1〜2の単体
  palefire: {
    id: 'palefire',
    nameKey: 'enemyPalefire',
    unitClass: { attackRange: { kind: 'range', max: 2 }, attackTargets: 1, attackCost: 3, apPerTurn: 4 },
    base: { hp: 2575, attack: 7.65, defense: 22 },
    growth: { hp: 11.15, attack: 1.51, defense: 0.66 },
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
  // 正面とその両斜め前の3マスを、居る相手まとめて薙ぐ（向きは6方向から選ぶ）
  // AP が攻撃コストと同じだと動いたターンは攻撃できず、1歩下がるだけでいつまでも攻撃されない。1マスだけ動いて薙げるよう AP を1多くしてある
  duskshell: {
    id: 'duskshell',
    nameKey: 'enemyDuskshell',
    unitClass: {
      attackRange: {
        kind: 'pattern',
        // 東向き基準: 正面とその両斜め前
        offsets: [
          { q: 1, r: 0 },
          { q: 1, r: -1 },
          { q: 0, r: 1 },
        ],
      },
      attackTargets: 'infinity',
      attackCost: 3,
      apPerTurn: 4,
    },
    base: { hp: 614, attack: 3.85, defense: 20 },
    growth: { hp: 6.44, attack: 0.95, defense: 0.4 },
  },
  // 自動人形: 4-2 で1体だけ出てくる。硬くて痛い剣士で、隣に並んだ相手を2回殴る
  // 3ターンごとと、HP50%を切ったときに、まわり1マスへまとめて熱を吐き出す
  automaton: {
    id: 'automaton',
    nameKey: 'enemyAutomaton',
    unitClass: { attackRange: { kind: 'range', max: 1 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 },
    base: { hp: 2483, attack: 4.83, defense: 24 },
    growth: { hp: 11.32, attack: 1.01, defense: 0.72 },
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
