import { stageFromMap } from './grid';

// 1-3 東の凍った湖
// 湖（通行不可）の南岸には岩（石の台地・通行不可）が転がり、西の岸には雪が吹きだまっている（雪の台地・通行不可）
// カゲロウは2体。1体は北の細い岸を、もう1体は南の岩の間を回ってくるので、挟まれないうちに片方ずつ落とす
// 湖のいちばん細いところは距離3なので、弓兵なら対岸のコオリモチを撃てる
export default stageFromMap({
  terrain: [
    '    n n n n n n',
    '   n n n w w n n',
    '  n n w w w w n n',
    ' n n n w w w t n n',
    '  n N n n n t n n',
    '   n n T n T n n',
    '    n T T n n n',
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
