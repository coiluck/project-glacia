import { stageFromMap } from './grid';

// 4-5 鐘楼の下の広場
// 西の端は鐘楼の土台（通行不可）。味方は鐘楼から降りたところ、土台の東に配置する
// 広場の真ん中は凍った噴水（水の台地のマス・通行不可）。クロガラは広場のあちこちで氷から身を起こしている
// クロガラは移動したターンには攻撃できず、隣に立つと正面の3マスを薙ぐ。噴水を盾にして、寄ってきたものから順に叩く
export default stageFromMap({
  terrain: [
    '    t t t t t T',
    '   T t t t t t t',
    '  T t t t W t t t',
    ' T t t t W W t t t',
    '  T t t t W t t t',
    '   T t t t t t t',
    '    t t t t t T',
  ],
  units: [
    '    . . . k . .',
    '   . . . . . . k',
    '  . @ @ . . . . b',
    ' . @ @ @ . . . k .',
    '  . @ @ . . . k .',
    '   . . . . b . .',
    '    . . k . . .',
  ],
  enemies: {
    k: { enemyId: 'duskshell', level: 33 },
    b: { enemyId: 'duskshell', level: 34 },
  },
  partyApPerTurn: 10,
});
