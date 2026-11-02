import { stageFromMap } from './grid';

// 3-5 帝都の西の境界
// 東の端を境界の氷（通行不可）がふさぐ。その手前は一度溶けてまた凍った地面（融けた地面のマス）
// 真ん中はステラの星が落ちた穴（通行不可）で、はじき飛ばされた陽石が散らばっている（砂の色のマス）
// コオリモチは境界のきわから、シモフクロウはその後ろから。穴の北と南のどちらを回るかを選ぶ
export default stageFromMap({
  terrain: [
    '    n n n h h w',
    '   n n n h h h w',
    '  n n s n h s h w',
    ' n n n s v s h h w',
    '  n n s n s h h w',
    '   n n n h h h w',
    '    n n n h h w',
  ],
  units: [
    '    . . . . o .',
    '   @ . . . . g .',
    '  @ @ . . g . . .',
    ' @ @ . . . . . g .',
    '  @ @ . . . . o .',
    '   @ . . . . g .',
    '    . . . . o .',
  ],
  enemies: {
    g: { enemyId: 'glacimo', level: 21 },
    o: { enemyId: 'rimeowl', level: 22 },
  },
  partyApPerTurn: 10,
});
