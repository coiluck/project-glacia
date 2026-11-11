import { stageFromMap } from './grid';

// 5-3
export default stageFromMap({
  terrain: [
    '    t N t t N t',
    '   t t t t t t t',
    '  N t T h h T t N',
    ' t t t h h h t t t',
    '  N t T h h T t N',
    '   t t t t t t t',
    '    t N t t N t',
  ],
  units: [
    '    s . . . . k',
    '   . . . p . . .',
    '  . . . @ @ . . .',
    ' o . . @ @ @ . . o',
    '  . . . @ @ . . .',
    '   . . . p . . .',
    '    k . . . . k',
  ],
  enemies: {
    k: { enemyId: 'duskshell', level: 30 },
    o: { enemyId: 'rimeowl', level: 31 },
    p: { enemyId: 'rimeowl', level: 30 },
    s: { enemyId: 'duskspine', level: 27 },
  },
  partyApPerTurn: 10,
});
