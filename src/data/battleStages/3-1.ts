import { stageFromMap } from './grid';

// 3-1 西の丘（夜）
// 丘のてっぺんを岩（通行不可）がぐるりと囲み、味方はその内側に配置する。岩の輪の切れ目は北東・東・南東・南西の4か所
// 魔物は星が落ちたほう（東）から斜面を上ってくる。カゲロウは切れ目を抜けて入ってくるしかない
// ホムラモチは岩ごしに撃ってくるので、輪の中に籠もりきりにはなれない
export default stageFromMap({
  terrain: [
    '    g g g g d d',
    '   g T T g g d d',
    '  g T g g T g d d',
    ' g T g g g g g d d',
    '  g T g g T g d d',
    '   g g T g g d d',
    '    g g g g d d',
  ],
  units: [
    '    . . . . . w',
    '   . . . . . i .',
    '  . . @ @ . . . .',
    ' . . @ @ @ . . i .',
    '  . . @ @ . . . w',
    '   . . . . . i .',
    '    . . . . w .',
  ],
  enemies: {
    i: { enemyId: 'ignimo', level: 15 },
    w: { enemyId: 'wispwraith', level: 16 },
  },
  partyApPerTurn: 10,
});
