import { stageFromMap } from './grid';

// 1-6 白焔の祠（ボス）
// 雪原から祠の石畳へ入る。白焔は奥の祭壇に居て、手前を溶岩の弧が囲んでいる
// 近接で殴るには柱の脇から祭壇の裏へ回り込む必要があり、遠距離なら溶岩ごしに撃てる
// 手前のイワモチと両脇のホムラモチを片付けてから白焔に取りかかる想定
export default stageFromMap({
  terrain: [
    '    n n t t t n',
    '   n n t T t t t',
    '  n n t t t t l t',
    ' n n n t t t l t t',
    '  n n t t t t l t',
    '   n n t T t t t',
    '    n n t t t n',
  ],
  units: [
    '    . . . . . .',
    '   . . . . . i .',
    '  @ @ . . s . . .',
    ' @ @ . . . . . p .',
    '  @ @ . . s . . .',
    '   . . . . . i .',
    '    . . . . . .',
  ],
  enemies: { i: 'ignimo', s: 'saximo', p: 'palefire' },
  partyApPerTurn: 10,
});
