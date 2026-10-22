import { stageFromMap } from './grid';

// 1-3 東の凍った湖
// 湖（通行不可）の南岸を、補給の荷を運ぶ道が通っている。道には捨てられた荷車が1台ふさいでいる
// カゲロウは2体。1体は北の細い岸を、もう1体は南の道を回ってくるので、挟まれないうちに片方ずつ落とす
// 湖のいちばん細いところは距離3なので、弓兵なら対岸のコオリモチを撃てる
export default stageFromMap({
  terrain: [
    '    n n n n n n',
    '   n n n w w n n',
    '  n n w w w w n n',
    ' n n n w w w t n n',
    '  n n n n n t n n',
    '   d d d d D d d',
    '    n n n n n n',
  ],
  units: [
    '    . . . . . w',
    '   @ . . . . . .',
    '  @ . . . . . . .',
    ' @ @ . . . . . g .',
    '  @ . . . . . . g',
    '   @ . . . . . w',
    '    . . . . . .',
  ],
  enemies: {
    g: { enemyId: 'glacimo', level: 3 },
    w: { enemyId: 'wispwraith', level: 3 },
  },
  partyApPerTurn: 10,
});
