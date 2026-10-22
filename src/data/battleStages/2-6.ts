import { stageFromMap } from './grid';

// 2-6 燃える木立
// 2-4 と同じ木立。南風で火が回り、南と東の木が燃えている（溶岩・通行不可）
// 燃えた木のところは塞がったが、かわりに南の切れ目が2つに増えている。魔物は東と南から一度に押し寄せる
// シルヴィが古木に登っている間の戦い（勝利条件はほかと同じで全滅させること）。泉を背にして、北の狭いところで受ける
export default stageFromMap({
  terrain: [
    '    G G l G G G',
    '   G d d d d l G',
    '  G d d w w d l d',
    ' d d d w G w d d d',
    '  G d d w w d l d',
    '   l d d d d l l',
    '    G d d d G l',
  ],
  units: [
    '    . . . . . .',
    '   . . @ @ . . .',
    '  . . @ . . . . i',
    ' . . @ . . . . w i',
    '  . . @ . . . . i',
    '   . . @ . w . .',
    '    . i w . . .',
  ],
  enemies: {
    i: { enemyId: 'ignimo', level: 13 },
    w: { enemyId: 'wispwraith', level: 14 },
  },
  partyApPerTurn: 10,
});
