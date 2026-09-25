import { stageFromMap } from './grid';

// 1-2 雪原の入口
// 真ん中の岩2つで北・中央・南の3筋に分かれる。コオリモチは北と南の2組で、北の組が先に来る
// シモフクロウは北の岩の陰から中央を撃つので、中央を抜けるなら先に落とすか、岩を回り込む
export default stageFromMap({
  terrain: [
    '    g g n n n n',
    '   g g n T n n n',
    '  g n n n T n n n',
    ' g g g n n n n n n',
    '  g g g T n n n n',
    '   g n T T n n n',
    '    g g n n n n',
  ],
  units: [
    '    . . . . . .',
    '   @ . . . . g .',
    '  @ . . . . . g .',
    ' @ @ . . . . o . .',
    '  @ . . . . . . g',
    '   @ . . . . . g',
    '    . . . . . .',
  ],
  enemies: { g: 'glacimo', o: 'rimeowl' },
  partyApPerTurn: 10,
});
