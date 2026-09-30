import { stageFromMap } from './grid';

// 1-3 凍った湖
// 湖は渡れない。北は1マス幅、南は2マス幅の岸を回る
// 湖のいちばん細いところ（真ん中の段の岩場どうし）は距離3なので、弓兵なら対岸を撃ち合える
// シモフクロウは東岸から動かない。カゲロウは南の岸を回ってくる
export default stageFromMap({
  terrain: [
    '    n n n n n n',
    '   n n n w w n n',
    '  n n t w w w n n',
    ' n n n t w w t n n',
    '  n n n w w w n n',
    '   n n n n n n n',
    '    n n n n n n',
  ],
  units: [
    '    . . . . g .',
    '   @ . . . . . .',
    '  @ . . . . . o .',
    ' @ @ . . . . o . .',
    '  @ . . . . . . .',
    '   @ . . . . g w',
    '    . . . . . .',
  ],
  enemies: { g: 'glacimo', o: 'rimeowl', w: 'wispwraith' },
  partyApPerTurn: 10,
});
