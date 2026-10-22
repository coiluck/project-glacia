import { stageFromMap } from './grid';

// 3-4 境界の手前の雪原
// 行列の真ん中で、陽石の籠を下ろしたところ（砂の色のマス）に味方を配置する
// コオリモチは雪の丘（通行不可）の陰から四方に湧き、シモフクロウは北と南の両端から撃ってくる
// 1章と同じ顔ぶれで Lv も味方に見合う分しか上げていないので1体ずつは弱いが、数が多い。四方から寄られる前に、どこか1方向を開ける
export default stageFromMap({
  terrain: [
    '    n n n n n n',
    '   n N n n n N n',
    '  n n n s n n n n',
    ' n N n s s s n N n',
    '  n n n s n n n n',
    '   n N n n n N n',
    '    n n n n n n',
  ],
  units: [
    '    g . . . . g',
    '   . . . o . . .',
    '  . . . @ @ . . .',
    ' g . . @ @ @ . . g',
    '  . . . @ @ . . .',
    '   o . . . . . o',
    '    . g . g . .',
  ],
  enemies: {
    g: { enemyId: 'glacimo', level: 20 },
    o: { enemyId: 'rimeowl', level: 20 },
  },
  partyApPerTurn: 10,
});
