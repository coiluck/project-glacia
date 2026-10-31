import { stageFromMap } from './grid';

// 2-4 焼け残った木立（夜）
// 木立（木は通行不可）が泉を囲み、木の下は土の地面、泉の真ん中に古木が立つ。味方は泉のまわりに配置する
// 魔物は木立の東の切れ目と南の切れ目から入ってくる。西の切れ目からは来ない
// 泉は通れないので、泉の北と南のどちらで受けるかで戦い方が変わる
export default stageFromMap({
  terrain: [
    '    G G G G G G',
    '   G d d d d d G',
    '  G d d w w d d d',
    ' d d d w G w d d d',
    '  G d d w w d d d',
    '   G d d d d G G',
    '    G G d G G G',
  ],
  units: [
    '    . . . . . .',
    '   . . @ @ . . .',
    '  . . @ . . . . i',
    ' . . @ . . . . w i',
    '  . . @ . . . . i',
    '   . . @ @ . . .',
    '    . . w . . .',
  ],
  enemies: {
    i: { enemyId: 'ignimo', level: 11 },
    w: { enemyId: 'wispwraith', level: 11 },
  },
  partyApPerTurn: 10,
});
