import { stageFromMap } from './grid';

// 2-2 宿場の跡（夜）
// 街道の両側に空き家（通行不可）が並ぶ。家と家のすき間の路地で、表の街道と裏の畑がつながっている
// カゲロウは東から街道を上ってくるほか、裏の畑を回って路地から出てくる
// 街道の上で迎え撃つと路地から横を突かれる。どの路地をふさぐかを先に決める
export default stageFromMap({
  terrain: [
    '    g g g g g g',
    '   T T g T T g T',
    '  T d T d T T d g',
    ' d d d d d d d d d',
    '  T d T T d T d g',
    '   T g T T g T T',
    '    g g g g g g',
  ],
  units: [
    '    . . . . . w',
    '   . . . . . . .',
    '  . @ . @ . . . .',
    ' @ @ @ . . . . w w',
    '  . @ . . . . . w',
    '   . . . . . . .',
    '    . . . . w .',
  ],
  enemies: {
    w: { enemyId: 'wispwraith', level: 8 },
  },
  partyApPerTurn: 10,
});
