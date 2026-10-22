import { stageFromMap } from './grid';

// 1-5 野営地の南の端（1章のボス）
// 西の端に野営地のテント（通行不可）が並ぶ。白焔は東から雪を融かしながら来ていて、通ったあとが融けた地面になっている
// 融けた地面のところどころで白い炎がまだ燃えていて（溶岩・通行不可）、白焔の前を細かく区切っている
// 白焔は2ターンごとに周囲をまとめて焼くので、固まって殴りに行かない。ついてきたホムラモチを先に落とす
export default stageFromMap({
  terrain: [
    '    n n n n n n',
    '   D n n n h h n',
    '  D n n h h l h n',
    ' n n n h l h h h h',
    '  D n n h h l h n',
    '   n n n n h h n',
    '    D n n n n n',
  ],
  units: [
    '    . . . . . .',
    '   . @ . . . i .',
    '  . @ . . . . . .',
    ' @ @ . . . . . p .',
    '  . @ . . . . . .',
    '   @ . . . . i .',
    '    . . . . . .',
  ],
  enemies: {
    i: { enemyId: 'ignimo', level: 4 },
    p: { enemyId: 'palefire', level: 5 },
  },
  partyApPerTurn: 10,
});
