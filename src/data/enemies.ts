// 敵の定義。EnemySpawn.enemyId がこの Record のキーを参照する
// ステージの敵 Lv は、そのステージをクリアするころのプレイヤーの Lv の 8/7 倍にしてある（data/battleStages/index.ts）
// 敵はその Lv で付け替え前と同じ強さになるよう当て直したので、同じ Lv の味方よりやや強い
// 下は、主に出てくる Lv で、同じ Lv の味方（全キャラの中央値）と殴り合ったときの発数
//   コオリモチ   Lv15 通常攻撃 1.5発ぶん（2発） / 1発で味方の HP の22%
//   シモフクロウ Lv25 2.1発ぶん（3発）          / 25%
//   カゲロウ     Lv13 2.1発ぶん（3発）          / 40%
//   イワモチ     Lv13 5.1発ぶん（6発）          / 14%
//   ホムラモチ   Lv6  2.9発ぶん（3発）          / 34%
//   クロガラ     Lv26 4.6発ぶん（5発）          / 29%（最大3人に当たる）
//   白焔         Lv8  18発ぶん                  / 37%
//   自動人形     Lv19 45発ぶん                  / 33%
//   ヒノコ       Lv10 1.4発ぶん（2発）          / 36%
//   トモシビ     Lv13 2.1発ぶん（3発）          / 19%（2ターンごとに、まわり2マスの魔物の HP を約170治す）
//   番兵人形     Lv19 4.1発ぶん（5発）          / 27%（2人に当たる）
//   クロトゲ     Lv27 3.3発ぶん（4発）          / 29%（まっすぐ3マスに当たる）
//   オオクロガラ Lv27 14発ぶん                  / 23%（まわり1マスの全員に当たる）
//   アマガラ     Lv33 21発ぶん                  / 22%（2ターンごとの呑みこみは1人に53%）
// ダメージは攻撃と防御の比で決まるので、防御を味方の攻撃と同じ率で伸ばすと1発のダメージが Lv によらず一定になり、HP を伸ばせない
// そのため防御の伸びは小さく抑え、強さは HP と攻撃の伸びで出している
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
    growth: { hp: 12.83, attack: 0.99, defense: 0.19 },
  },
  // シモフクロウ: 距離2〜3の単体攻撃。水や壁の向こうから撃ってくる。隣に寄れば撃てない
  rimeowl: {
    id: 'rimeowl',
    nameKey: 'enemyRimeowl',
    unitClass: { attackRange: { kind: 'range', min: 2, max: 3 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 },
    base: { hp: 569, attack: 3.93, defense: 9.86 },
    growth: { hp: 3.92, attack: 1.18, defense: 0.44 },
  },
  // カゲロウ: 攻撃が高く守りが薄い。放っておくと1人落とされる。隣接1マスへの単体攻撃
  wispwraith: {
    id: 'wispwraith',
    nameKey: 'enemyWispwraith',
    unitClass: { attackRange: { kind: 'range', max: 1 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 },
    base: { hp: 683, attack: 6.09, defense: 8.98 },
    growth: { hp: 9.8, attack: 2.01, defense: 0.31 },
  },
  // イワモチ: 硬いが痛くない。狭い通路をふさぐ役。隣接1マスへの単体攻撃
  saximo: {
    id: 'saximo',
    nameKey: 'enemySaximo',
    unitClass: { attackRange: { kind: 'range', max: 1 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 },
    base: { hp: 551, attack: 1.39, defense: 24.26 },
    growth: { hp: 7.52, attack: 0.75, defense: 1.12 },
  },
  // ホムラモチ: 距離1〜2の単体攻撃。1ターンに1発だが重い
  ignimo: {
    id: 'ignimo',
    nameKey: 'enemyIgnimo',
    unitClass: { attackRange: { kind: 'range', max: 2 }, attackTargets: 1, attackCost: 3, apPerTurn: 4 },
    base: { hp: 564, attack: 7.06, defense: 16.23 },
    growth: { hp: 8.02, attack: 2.01, defense: 0.45 },
  },
  // 白焔: 1章と2章のボス（2章は Lv を上げた別個体）。2ターンごとに周囲をまとめて焼く
  // 通常攻撃は距離1〜2の単体
  palefire: {
    id: 'palefire',
    nameKey: 'enemyPalefire',
    unitClass: { attackRange: { kind: 'range', max: 2 }, attackTargets: 1, attackCost: 3, apPerTurn: 4 },
    base: { hp: 2539, attack: 2.82, defense: 19.89 },
    growth: { hp: 20.07, attack: 2.72, defense: 1.19 },
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
    base: { hp: 641, attack: 8.33, defense: 21.73 },
    growth: { hp: 8.56, attack: 1.24, defense: 0.53 },
  },
  // 自動人形: 4-2 で1体だけ出てくる。硬くて痛い剣士で、隣に並んだ相手を2回殴る
  // 3ターンごとに、まわり1マスへまとめて熱を吐き出す
  automaton: {
    id: 'automaton',
    nameKey: 'enemyAutomaton',
    unitClass: { attackRange: { kind: 'range', max: 1 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 },
    base: { hp: 5192, attack: 14.93, defense: 31.2 },
    growth: { hp: 22.64, attack: 1.01, defense: 0.72 },
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
    },
  },
  // ヒノコ: 2章の雑魚。焼け跡から飛んでくる火の粉。脆いが足が速く、遠くから回りこんで後ろの味方を突く
  // 隣接1マスへの単体攻撃。AP 6 で、3マス動いて1回、動かなければ2回殴る
  cinder: {
    id: 'cinder',
    nameKey: 'enemyCinder',
    unitClass: { attackRange: { kind: 'range', max: 1 }, attackTargets: 1, attackCost: 3, apPerTurn: 6 },
    base: { hp: 380, attack: 9, defense: 11 },
    growth: { hp: 8, attack: 1.6, defense: 0.3 },
  },
  // トモシビ: 3章の雑魚。2ターンごとに、まわり2マスの魔物の傷を灯しなおす（自分も含む）
  // 自分の攻撃は弱い。距離1〜2の単体攻撃。放っておくとまわりの敵がなかなか倒れない
  lanternwisp: {
    id: 'lanternwisp',
    nameKey: 'enemyLanternwisp',
    unitClass: { attackRange: { kind: 'range', max: 2 }, attackTargets: 1, attackCost: 2, apPerTurn: 4 },
    base: { hp: 560, attack: 4.6, defense: 10 },
    growth: { hp: 7, attack: 0.8, defense: 0.45 },
    skill: {
      def: {
        id: 'lanternwispRekindle',
        nameKey: 'skillRekindle',
        apCost: 2,
        range: { kind: 'range', min: 0, max: 0 },
        effect: [{ type: 'healHp', amount: 1200, target: 'ally', area: { kind: 'range', min: 0, max: 2 } }],
      },
      everyNTurns: 2,
    },
  },
  // 番兵人形: 4章の雑魚。距離2〜4にいる2人をまとめて撃つ
  // AP が攻撃コストと同じなので、動いたターンは撃てない。隣まで寄れば撃たれない
  sentinel: {
    id: 'sentinel',
    nameKey: 'enemySentinel',
    unitClass: { attackRange: { kind: 'range', min: 2, max: 4 }, attackTargets: 2, attackCost: 3, apPerTurn: 3 },
    base: { hp: 650, attack: 8, defense: 20 },
    growth: { hp: 7, attack: 1, defense: 0.55 },
  },
  // クロトゲ: 5章の雑魚。正面にまっすぐ3マスを貫く（向きは6方向から選ぶ）。縦に並ぶとまとめて刺される
  duskspine: {
    id: 'duskspine',
    nameKey: 'enemyDuskspine',
    unitClass: {
      attackRange: {
        kind: 'pattern',
        // 東向き基準: 正面に3マス
        offsets: [
          { q: 1, r: 0 },
          { q: 2, r: 0 },
          { q: 3, r: 0 },
        ],
      },
      attackTargets: 'infinity',
      attackCost: 3,
      apPerTurn: 5,
    },
    base: { hp: 650, attack: 8, defense: 18 },
    growth: { hp: 5, attack: 1.25, defense: 0.42 },
  },
  // オオクロガラ: 4章のボス。4-7 で群れのいちばん奥から来る大きなクロガラ
  // 通常攻撃はまわり1マスの全員。囲むと全員が殴られる
  // 4ターンごとに、距離3までのマスへ殻を落とし、そのまわり1マスもまとめて潰す
  greatshell: {
    id: 'greatshell',
    nameKey: 'enemyGreatshell',
    unitClass: { attackRange: { kind: 'range', max: 1 }, attackTargets: 'infinity', attackCost: 3, apPerTurn: 4 },
    base: { hp: 2400, attack: 8, defense: 22 },
    growth: { hp: 10, attack: 0.9, defense: 0.5 },
    skill: {
      def: {
        id: 'greatshellShellDrop',
        nameKey: 'skillShellDrop',
        apCost: 3,
        range: { kind: 'range', min: 1, max: 3 },
        effect: [{ type: 'damage', power: 110, target: 'enemy', area: { kind: 'range', min: 0, max: 1 } }],
      },
      everyNTurns: 4,
    },
  },
  // アマガラ: 5章のボス（ラスボス）。5-4 で裂け目から落ちてくる、空を覆うほどの殻の獣
  // 通常攻撃はクロガラと同じく、正面とその両斜め前の3マスを薙ぐ
  // 2ターンごとに、距離3までの1人を呑みこんで大きく削り、削った HP の分だけ自分の傷を治す
  // まわりをまとめて焼く技にすると、★3の少ない編成が数で押し切られて勝てなくなる。1人に重く当てる
  skyshell: {
    id: 'skyshell',
    nameKey: 'enemySkyshell',
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
      apPerTurn: 5,
    },
    base: { hp: 3600, attack: 10, defense: 24 },
    growth: { hp: 16, attack: 0.9, defense: 0.45 },
    skill: {
      def: {
        id: 'skyshellDevour',
        nameKey: 'skillDevour',
        apCost: 4,
        range: { kind: 'range', min: 1, max: 3 },
        effect: [{ type: 'damage', power: 240, target: 'enemy', drain: 100 }],
      },
      everyNTurns: 2,
    },
  },
};
