import { stageFromMap } from './grid';

// 5-4
export default stageFromMap({
  terrain: [
    '    t t t t t t',
    '   t t T t w t t',
    '  t t t t t w t t',
    ' t t t t t t t t t',
    '  t t t t t w t t',
    '   t t T t w t t',
    '    t t t t t t',
  ],
  units: [
    '    . . . . . .',
    '   . . . . . . k',
    '  @ @ . . . . . .',
    ' @ @ @ . . . . k a',
    '  @ @ . . . . . .',
    '   . . . . . . k',
    '    . . . k . k',
  ],
  enemies: {
    k: { enemyId: 'duskshell', level: 33 },
    a: { enemyId: 'skyshell', level: 33 },
  },
  partyApPerTurn: 10,
});
