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
    '    . . . k . k',
    '   . . . . . . k',
    '  @ @ . . k . . .',
    ' @ @ @ . . . . b .',
    '  @ @ . . k . . .',
    '   . . . . . . k',
    '    . . . k . k',
  ],
  enemies: {
    k: { enemyId: 'duskshell', level: 48 },
    b: { enemyId: 'duskshell', level: 50 },
  },
  partyApPerTurn: 10,
});
