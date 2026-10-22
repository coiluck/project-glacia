import { stageFromMap } from './grid';

// 3-2 聖女の陣・南の道（夜）
// 北は陽石を並べた段々の斜面（砂の色のマス）で、段の間の石垣（通行不可）は階段のところでしか越えられない
// 南は陣へ上る道。真ん中に、逃げてきた人が置いていった荷車（通行不可）がある
// カゲロウは道を上ってくる組と、段の上を回って階段から降りてくる組に分かれる
export default stageFromMap({
  terrain: [
    '    s s s s s s',
    '   T T s T T T s',
    '  g s s s s s s s',
    ' T T T s T T T s g',
    '  d d d d d d d d',
    '   d d d D d d d',
    '    g g g g g g',
  ],
  units: [
    '    . . . . . .',
    '   . . . . . . .',
    '  @ . . . . . w .',
    ' . . . . . . . . w',
    '  @ @ . . . . . w',
    '   @ @ . . . w .',
    '    @ . . . . w',
  ],
  enemies: {
    w: { enemyId: 'wispwraith', level: 17 },
  },
  partyApPerTurn: 10,
});
