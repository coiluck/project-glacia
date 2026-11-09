import { stageFromMap } from './grid';

// 5-1
export default stageFromMap({
  terrain: [
    '    t t t t t t',
    '   h t t t N t t',
    '  h h H t N N t t',
    ' N h h h t t t t t',
    '  h h H t N N t t',
    '   h t t t N t t',
    '    t t t t t t',
  ],
  units: [
    '    . . . . . k',
    '   . . . k . . o',
    '  @ @ . . . . . .',
    ' . @ @ @ . . . . k',
    '  @ @ . . . . . .',
    '   . . . k . . o',
    '    . . . . . k',
  ],
  enemies: {
    k: { enemyId: 'duskshell', level: 39 },
    o: { enemyId: 'rimeowl', level: 40 },
  },
  partyApPerTurn: 10,
});
