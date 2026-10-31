import { stageFromMap } from './grid';

// 2-3 焼けた森
// 西半分はまだ焼けていない森（土と草の地面に木・木は通行不可）、東半分は灰の地面に焦げた幹が立つ焼け跡（幹は通行不可）
// 焼け跡にはまだ火が残っている（溶岩・通行不可）。ホムラモチの群れは焼け跡から森へ向かってくる
// 森の手前で食い止める。森の中まで下がると木が邪魔で囲まれやすい
export default stageFromMap({
  terrain: [
    '    G d g t V t',
    '   d d G t t t V',
    '  G d g t V t l t',
    ' g d d t t t V t t',
    '  d G d t t l t V',
    '   g d t V t t t',
    '    G d g t t V',
  ],
  units: [
    '    . . . . . i',
    '   @ @ . . . . .',
    '  . . @ . . . . i',
    ' @ . @ . . . . i .',
    '  . . @ . . . . .',
    '   @ . . . . i .',
    '    . . . . i .',
  ],
  enemies: {
    i: { enemyId: 'ignimo', level: 9 },
  },
  partyApPerTurn: 10,
});
