import { stageFromMap } from './grid';

// 4-3 西の門から中央への大通り
// 石畳の大通りが東西に延び、北と南の端は氷をかぶった家（通行不可）。家の間の路地だけ雪が積もっている
// 雪の台地のマスは、氷に閉じこめられた人たち（通行不可）
// 味方は門の側（西）に配置する。イワモチが大通りの真ん中をふさぎ、コオリモチは奥と両脇の路地から這い出してくる
// 奥の北と南の角にはカゲロウがいて、イワモチの脇を抜けて寄ってくる
// イワモチは硬いが痛くない。先にコオリモチを散らしてから、イワモチを囲む
// 大通りのいちばん奥には番兵人形が立っていて、距離2〜4の2人を撃ってくる。動いたターンは撃てないので、寄ってくるまでは遠くにいる
export default stageFromMap({
  terrain: [
    '    T n T T n T',
    '   t t t t t t t',
    '  t t N t t t t N',
    ' t t t t t N t t t',
    '  t N t t t t t t',
    '   t t t t t t t',
    '    T T n T n T',
  ],
  units: [
    '    . g . . g .',
    '   . . . . . . w',
    '  @ @ . . . s . .',
    ' @ @ @ . s . . g n',
    '  @ . . . . s . .',
    '   @ . . . . . w',
    '    . . g . g .',
  ],
  enemies: {
    g: { enemyId: 'glacimo', level: 18 },
    s: { enemyId: 'saximo', level: 19 },
    w: { enemyId: 'wispwraith', level: 19 },
    n: { enemyId: 'sentinel', level: 19 },
  },
  partyApPerTurn: 10,
});
