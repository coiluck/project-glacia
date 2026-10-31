import { stageFromMap } from './grid';

// 4-7 帝都の中央、裂け目の真下（4章のボス戦）
// 雪の台地のマスは、裂け目から雪崩れ落ちる形で凍った獣の群れ（通行不可）。群れは北と南の2つの塊に分かれていて、間の通りだけが空いている
// 西の端の1マスは殿下の氷（通行不可）。味方はその前に配置する
// 群れのいちばん外側のクロガラが氷から抜けだして、塊の西のきわと北と南の端から寄ってくる。いちばん奥の1体だけ Lv が高く、間の通りをまっすぐ来る
// 先に塊のきわの4体を崩しておかないと、奥の1体が着くころに囲まれる
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
    '   . @ . d . . .',
    '    . . . . k .',
  ],
  enemies: {
    d: { enemyId: 'duskshell', level: 36 },
    k: { enemyId: 'duskshell', level: 37 },
    b: { enemyId: 'duskshell', level: 38 },
  },
  partyApPerTurn: 10,
});
