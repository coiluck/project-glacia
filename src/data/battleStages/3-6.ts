import { stageFromMap } from './grid';

// 3-6 境界沿い（夜）
// 北の端を境界の氷（通行不可）が東西に延びている。騎士団は氷に沿って西へ逃げてきて、魔物がそれを追っている
// 味方は南西の丘（岩場）から駆け下りる。魔物は氷と丘の間の雪の帯を西へ進んでくる
// イワモチは帯の真ん中をふさぎ、コオリモチはその北と南に分かれて来る。硬いイワモチは後回しにする
export default stageFromMap({
  terrain: [
    '    W W W W W W',
    '   n n n n n n n',
    '  n n n T n n n n',
    ' t n n n n n T n n',
    '  t t n n n n n n',
    '   t T t n n n n',
    '    t t t n n n',
  ],
  units: [
    '    . . . . . .',
    '   . . . . . g g',
    '  . . . . . . s .',
    ' @ . . . . . . . g',
    '  @ @ . . . . s .',
    '   @ . @ . . g .',
    '    @ @ . . . .',
  ],
  enemies: {
    g: { enemyId: 'glacimo', level: 22 },
    s: { enemyId: 'saximo', level: 23 },
  },
  partyApPerTurn: 10,
});
