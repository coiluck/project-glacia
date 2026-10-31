import { stageFromMap } from './grid';

// 2-5 焼けた街（2章のボス）
// 煤で黒くなった石の家（通行不可）の間を通りが走る。広場は裂け目から落ちてきたもので溶岩の溜まりになっている（通行不可）
// 白焔は広場の向こうにいる。北の通りと南の通りのどちらから回り込んでも、広場ごしに焼かれる
// 1章の白焔より Lv がずっと高い。ホムラモチを先に落として、白焔の焼く2ターン目の前に散る
export default stageFromMap({
  terrain: [
    '    t V t V V t',
    '   t t t t t t V',
    '  V t V l l t V t',
    ' t t t l l l t t t',
    '  V t V l l t V t',
    '   t t t t t t V',
    '    t V t V V t',
  ],
  units: [
    '    . . . . . .',
    '   @ . . . . i .',
    '  . @ . . . . . .',
    ' @ @ . . . . . p .',
    '  . @ . . . . . .',
    '   @ . . . . i .',
    '    . . . . . .',
  ],
  enemies: {
    i: { enemyId: 'ignimo', level: 12 },
    p: { enemyId: 'palefire', level: 14 },
  },
  partyApPerTurn: 10,
});
