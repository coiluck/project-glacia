import { stageFromMap } from './grid';

// 2-1 南の街道
// 西から東へ、雪が途切れて土と草に変わっていく。街道の真ん中を白焔の焼け跡が黒い筋になって延びている（通行不可）
// 筋が途切れているのは真ん中と東の端の2か所だけ。北と南の道を行き来するにはそこを通る
// ホムラモチは筋の向こうからでも撃ってくる。筋をはさんで撃ち合うか、途切れ目から回り込むか
export default stageFromMap({
  terrain: [
    '    n n n d g g',
    '   n n d d d g g',
    '  n n d d d d g g',
    ' n n v v d v v v d',
    '  n n d d d d d g',
    '   n n n d d g g',
    '    n n d g g g',
  ],
  units: [
    '    . . . . . .',
    '   @ . . . . i .',
    '  @ @ . . . . . i',
    ' @ . . . . . . . .',
    '  @ @ . . . . i .',
    '   . . . . . . i',
    '    . . . . . .',
  ],
  enemies: {
    i: { enemyId: 'ignimo', level: 6 },
  },
  partyApPerTurn: 10,
});
