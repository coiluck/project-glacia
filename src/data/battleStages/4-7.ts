import { stageFromMap } from './grid';

// 4-7 帝都の中央、裂け目の真下（4章のボス戦）
// 雪の台地のマスは、裂け目から雪崩れ落ちる形で凍った獣の群れ（通行不可）。群れは北と南の2つの塊に分かれていて、間の通りだけが空いている
// 西の端の1マスは殿下の氷（通行不可）。味方はその前に配置する
// 群れのいちばん外側のクロガラが氷から抜けだして、塊の西のきわと北と南の端から寄ってくる。いちばん奥にはオオクロガラがいて、間の通りをまっすぐ来る
// オオクロガラはまわり1マスの全員を殴り、4ターンごとに距離3までのマスへ殻を落とす。囲むと全員が殴られるので、2〜3人で当たる
// 南の塊の東の陰にはシモフクロウが1体いて、塊ごしに撃ってくる
// 先に塊のきわの4体を崩しておかないと、オオクロガラが着くころに囲まれる
export default stageFromMap({
  terrain: [
    '    t t t t t t',
    '   t t t t N t t',
    '  t t t t N N t t',
    ' N t t t t t t t t',
    '  t t t t N N t t',
    '   t t t t N t t',
    '    t t t t t t',
  ],
  units: [
    '    . . . . k .',
    '   . . . d . . .',
    '  @ @ . d . . . .',
    ' . @ @ . . . . b .',
    '  @ @ . d . . . .',
    '   . @ . d . . o',
    '    . . . . k .',
  ],
  enemies: {
    d: { enemyId: 'duskshell', level: 26 },
    k: { enemyId: 'duskshell', level: 26 },
    b: { enemyId: 'greatshell', level: 27 },
    o: { enemyId: 'rimeowl', level: 26 },
  },
  partyApPerTurn: 10,
});
