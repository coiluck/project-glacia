import { stageFromMap } from './grid';

// 1-4 夜の境界
// 東の端を境界の氷（通行不可）がふさぎ、その手前にロザリーのランタンが一列に並んでいる（砂の色のマス）
// イワモチは雪原の真ん中で盛り上がり、野営地とランタンの間に壁をつくる
// 硬いイワモチを正面から崩すか、脇を抜けて両端のコオリモチを先に片付けるか
export default stageFromMap({
  terrain: [
    '    n n n n s W',
    '   n n n n n s W',
    '  n n t n n n s W',
    ' n n n n n n n s W',
    '  n n n t n n s W',
    '   n n n n n s W',
    '    n n n n s W',
  ],
  units: [
    '    . . . . g .',
    '   @ . . . . . .',
    '  @ @ . . . s . .',
    ' @ @ . . . s . . .',
    '  @ . . . . s . .',
    '   . . . . . . .',
    '    . . . . g .',
  ],
  enemies: {
    g: { enemyId: 'glacimo', level: 4 },
    s: { enemyId: 'saximo', level: 4 },
  },
  partyApPerTurn: 10,
});
