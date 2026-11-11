import { stageFromMap } from './grid';

// 3-6 境界沿い（夜）
// 北の端を境界の氷（通行不可）が東西に延びている。騎士団は氷に沿って西へ逃げてきて、魔物がそれを追っている
// 味方は南西の丘（岩場）から駆け下りる。魔物は氷と丘の間の雪の帯を西へ進んでくる
// イワモチは帯の真ん中をふさぎ、コオリモチはその北と南に分かれて来る。硬いイワモチは後回しにする
// その後ろからホムラモチが撃ち、カゲロウは帯のきわを回りこんでくる
// 氷のきわの奥にはトモシビがいて、2ターンごとにまわり2マスの魔物の傷を治す
export default stageFromMap({
  terrain: [
    '    w w w w w w',
    '   n n n n n n n',
    '  n n n T n n n n',
    ' t n n n n n T n n',
    '  t t n n n n n n',
    '   t T t n n n n',
    '    t t t n n n',
  ],
  units: [
    '    . . . . . .',
    '   . . . . l g g',
    '  . . . . . . s i',
    ' @ . . . . . . . g',
    '  @ @ . . . . s i',
    '   @ . @ . . g .',
    '    @ @ . . . w',
  ],
  enemies: {
    g: { enemyId: 'glacimo', level: 15 },
    s: { enemyId: 'saximo', level: 16 },
    i: { enemyId: 'ignimo', level: 15 },
    w: { enemyId: 'wispwraith', level: 15 },
    l: { enemyId: 'lanternwisp', level: 15 },
  },
  partyApPerTurn: 10,
});
