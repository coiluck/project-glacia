import { stageFromMap } from './grid';

// 1-2 川沿いの雪原
// 野営地へ川を下る途中。北の端を川が流れ、雪原のあちこちに雪の丘（通行不可）が盛り上がっている
// コオリモチはそれぞれ丘の陰から這い出してくるので、丘を回り込んでくる順に1体ずつ相手にできる
// シモフクロウは東の端の丘の裏にいて、丘ごしに撃ってくる。近づくには丘を回り込む
export default stageFromMap({
  terrain: [
    '    w w w w w w',
    '   n n w w w n n',
    '  n n n n N n n n',
    ' n n N n n n n N n',
    '  n n n n n N n n',
    '   n n N n n n n',
    '    n n n n n n',
  ],
  units: [
    '    . . . . . .',
    '   @ . . . . g .',
    '  @ . . . . g . .',
    ' @ @ . . . . . . o',
    '  @ . . . . . g .',
    '   @ . . g . . .',
    '    . . . . . .',
  ],
  enemies: {
    g: { enemyId: 'glacimo', level: 2 },
    o: { enemyId: 'rimeowl', level: 2 },
  },
  partyApPerTurn: 10,
});
