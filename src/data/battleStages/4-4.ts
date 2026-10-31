import { stageFromMap } from './grid';

// 4-4 大通りの避難の列
// 真ん中の雪の台地のマスは、氷の中で止まった獣の爪（通行不可）。ラピスが霜を重ねている爪のまわりに味方を配置する
// 北と南の端は氷をかぶった家（通行不可）で、その手前に避難の列が並んで止まっている（雪の台地のマス・通行不可）
// コオリモチは家の間の路地から、カゲロウは列のすきまと通りの東西の端から、四方から一度に寄ってくる
// 爪を背にして輪のまま受けると全方向から殴られる。カゲロウの多い側から崩して、列を壁にする
export default stageFromMap({
  terrain: [
    '    T n T T n T',
    '   t N t N t N t',
    '  t t t t t t t t',
    ' t t t t N t t t t',
    '  t t t t t t t t',
    '   t N t N t N t',
    '    T n T T n T',
  ],
  units: [
    '    . g . . g .',
    '   w . . . . . g',
    '  . . . @ @ . . .',
    ' w . . @ . @ . . w',
    '  . . . @ @ . . .',
    '   g . . . . . w',
    '    . g . . g .',
  ],
  enemies: {
    g: { enemyId: 'glacimo', level: 32 },
    w: { enemyId: 'wispwraith', level: 33 },
  },
  partyApPerTurn: 10,
});
