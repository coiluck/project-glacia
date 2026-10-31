import { stageFromMap } from './grid';

// 4-6 中央区画の門
// 中央区画の壁（通行不可）が南北に延び、内側から押し開けられたまま凍った門の2マスだけが通れる。壁の東が中央区画
// 雪の台地のマスは、氷に閉じこめられた人たち（通行不可）
// クロガラは門の向こうにひしめいていて、門を抜けて出てくる。シモフクロウは壁の向こうから撃ってくる
// 門の出口で待つと、出てきたクロガラに正面の3マスをまとめて薙がれる。門から少し離れて、出てきた1体ずつを囲む
export default stageFromMap({
  terrain: [
    '    t N t t T t',
    '   t t t t t T t',
    '  t t t N t t t t',
    ' t t t t t t t t t',
    '  t t N t t T t t',
    '   t t t t t T t',
    '    t t N t T t',
  ],
  units: [
    '    . . . . . o',
    '   . . . . . . k',
    '  @ @ . . . . k .',
    ' @ @ @ . . . . k .',
    '  @ @ . . . . k .',
    '   . . . . . . k',
    '    . . . . . o',
  ],
  enemies: {
    k: { enemyId: 'duskshell', level: 35 },
    o: { enemyId: 'rimeowl', level: 36 },
  },
  partyApPerTurn: 10,
});
