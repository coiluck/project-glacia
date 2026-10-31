import { stageFromMap } from './grid';

// 4-2 凍った西の門
// 帝都の城壁（通行不可）が南北に延び、真ん中の開いたままの門だけが通れる。門の東は中央へ続く大通り（岩場）
// 雪の台地のマスは、氷に閉じこめられた避難の人たち（通行不可）
// 自動人形は大通りから門を抜けてまっすぐ来る。1体だけだが硬くて痛く、3ターンごとと HP50% を切ったときにまわり1マスを焼く
// 門は1マス幅なので、硬い1人で門をふさぎ、ほかは城壁ごしに撃つ
export default stageFromMap({
  terrain: [
    '    n n n T t t',
    '   n N n n T t t',
    '  n n n n T t N t',
    ' n n n n n t t t t',
    '  n n n n T t t N',
    '   n N n n T N t',
    '    n n n T t t',
  ],
  units: [
    '    . . . . . .',
    '   . . . . . . .',
    '  @ @ . . . . . .',
    ' @ @ @ . . . . . a',
    '  @ @ . . . . . .',
    '   . . . . . . .',
    '    . . . . . .',
  ],
  enemies: {
    a: { enemyId: 'automaton', level: 29 },
  },
  partyApPerTurn: 10,
});
