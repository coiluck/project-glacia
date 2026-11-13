import { stageFromMap } from './grid';

// 5-2
export default stageFromMap({
  terrain: [
    '    t t t t N t',
    '   t t t t N N t',
    '  t h h T t t t t',
    ' t t h T t t t t t',
    '  t h h T t t t t',
    '   t t t t N N t',
    '    t t t t N t',
  ],
  units: [
    '    . . k k . .',
    '   . . . . . . k',
    '  . @ @ . . . . s',
    ' . . @ . . . . . b',
    '  . @ @ . . . . .',
    '   . . . . . . k',
    '    . . k k . .',
  ],
  enemies: {
    k: { enemyId: 'duskshell', level: 28 },
    b: { enemyId: 'duskshell', level: 29 },
    s: { enemyId: 'duskspine', level: 27 },
  },
  partyApPerTurn: 10,
});
