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
    '    k . . . . k',
    '   . . . . . . .',
    '  . . . @ @ . . .',
    ' o . . @ @ @ . . o',
    '  . . . @ @ . . .',
    '   . . . . . . .',
    '    k . . . . k',
  ],
  enemies: {
    k: { enemyId: 'duskshell', level: 44 },
    o: { enemyId: 'rimeowl', level: 45 },
  },
  partyApPerTurn: 10,
});
