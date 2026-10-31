import { stageFromMap } from './grid';

// 4-1 凍った西の外町
// ソレイユのまわりだけ霜が止まっていて、そこが融けた地面のマス。味方はその内側に配置する
// 外は氷をかぶった家（通行不可）の並ぶ雪の通り。コオリモチは家の陰から四方に転がり出て、シモフクロウはその後ろから撃ってくる
// 3-4 と同じ顔ぶれで1体ずつは弱い。家が射線をさえぎらないので、寄られる前にシモフクロウのいる方へ出る
export default stageFromMap({
  terrain: [
    '    n T n n T n',
    '   n n n h n n T',
    '  T n h h h h n n',
    ' n n h h h h h n T',
    '  n n h h h h n n',
    '   T n n h n n n',
    '    n T n n T n',
  ],
  units: [
    '    g . . . . g',
    '   . . . . . o .',
    '  . . . @ @ . . .',
    ' g . . @ @ @ . . .',
    '  . . . @ @ . . o',
    '   . o . . . . .',
    '    g . g . . g',
  ],
  enemies: {
    g: { enemyId: 'glacimo', level: 27 },
    o: { enemyId: 'rimeowl', level: 28 },
  },
  partyApPerTurn: 10,
});
