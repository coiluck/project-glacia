import { stageFromMap } from './grid';

// 4-5 鐘楼の下の広場
// 西の端は鐘楼の土台（通行不可）。味方は鐘楼から降りたところ、土台の東に配置する
// 広場の真ん中は凍った噴水（水のマス・通行不可）。クロガラは広場のあちこちで氷から身を起こしている
// クロガラは1マスだけ動いて、正面の3マスを薙ぐ。噴水を盾にして、寄ってきたものから順に叩く
// 広場の東の奥には番兵人形がいて、距離2〜4の2人を撃ってくる。隣まで寄れば撃たれない
export default stageFromMap({
  terrain: [
    '    t t t t t T',
    '   T t t t t t t',
    '  T t t t w t t t',
    ' T t t t w w t t t',
    '  T t t t w t t t',
    '   T t t t t t t',
    '    t t t t t T',
  ],
  units: [
    '    . . . k . .',
    '   . . . . . . .',
    '  . @ @ . . . . b',
    ' . @ @ @ . . . k n',
    '  . @ @ . . . k .',
    '   . . . . b . .',
    '    . . k . k .',
  ],
  enemies: {
    k: { enemyId: 'duskshell', level: 20 },
    b: { enemyId: 'duskshell', level: 21 },
    n: { enemyId: 'sentinel', level: 20 },
  },
  partyApPerTurn: 10,
});
