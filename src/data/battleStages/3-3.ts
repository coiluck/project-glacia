import { stageFromMap } from './grid';

// 3-3 山の肩（夜）
// 細い尾根道。道の外は崖でマスが無い。尾根の両脇は雪の斜面で、岩（通行不可）が転がっている。味方は尾根の真ん中に配置する
// イワモチは尾根の東西の端と、崖の下の岩棚から起き上がってくる。前にも後ろにも敵がいる
// イワモチは硬いが痛くない。囲まれる前に片側を崩して、背中を崖に預けられる場所へ動く
export default stageFromMap({
  terrain: [
    '        T n',
    '   n n T n n T n',
    '  t t t t t t t t',
    ' t t t t t t t t t',
    '  t t t t t t t t',
    '   n T n n T n n',
    '      n T',
  ],
  units: [
    '        . s',
    '   . . . . . . .',
    '  s . . @ @ . . s',
    ' . . . @ @ @ . . s',
    '  . . . @ @ . . .',
    '   . . . . . . .',
    '      s .',
  ],
  enemies: {
    s: { enemyId: 'saximo', level: 18 },
  },
  partyApPerTurn: 10,
});
