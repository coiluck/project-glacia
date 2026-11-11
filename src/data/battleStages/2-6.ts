import { stageFromMap } from './grid';

// 2-6 燃える木立
// 2-4 と同じ木立。南風で火が回り、南と東の木が燃えている（溶岩・通行不可）
// 燃えた木のところは塞がったが、かわりに南の切れ目が2つに増えている。魔物は東と南から一度に押し寄せる
// シルヴィが古木に登っている間の戦い（勝利条件はほかと同じで全滅させること）。泉を背にして、北の狭いところで受ける
// 南の切れ目からはヒノコが2体飛びこんでくる。足が速いので、泉の南へ回られる前に落とす
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
    '   . . @ . c . .',
    '    . i c . . .',
  ],
  enemies: {
    i: { enemyId: 'ignimo', level: 9 },
    w: { enemyId: 'wispwraith', level: 10 },
    c: { enemyId: 'cinder', level: 10 },
  },
  partyApPerTurn: 10,
});
