import { stageFromMap } from './grid';

// 3-7 境界の隙間（3章のボス戦）
// 境界の氷（通行不可）が南北に延び、真ん中の1マスだけ溶けて隙間が開いている。手前には割れた陽石が並ぶ（砂の色のマス）
// 隙間の向こうは凍った西の外町の通りで、氷の中で止まっていたクロガラが次々に動きだす
// クロガラは移動したターンには攻撃できない。隙間から出てきたところを叩くが、正面の3マスを薙ぐので並んで待たない
export default stageFromMap({
  terrain: [
    '    n n s w t T',
    '   n n n s w t t',
    '  n n n s w t t T',
    ' n n n n s h t t t',
    '  n n n s w t t T',
    '   n n n s w t t',
    '    n n s w t T',
  ],
  units: [
    '    . . . . . .',
    '   @ . . . . . k',
    '  @ @ . . . k . .',
    ' @ @ . . b k . . .',
    '  @ @ . . . k . .',
    '   @ . . . . . k',
    '    . . . . . .',
  ],
  enemies: {
    // 先に氷を割って出てきた1体だけ Lv が高い
    b: { enemyId: 'duskshell', level: 26 },
    k: { enemyId: 'duskshell', level: 24 },
  },
  partyApPerTurn: 10,
});
