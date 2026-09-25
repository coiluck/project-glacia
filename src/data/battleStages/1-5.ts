import { stageFromMap } from './grid';

// 1-5 火打ちの谷
// 2本の溶岩の筋で北・中央・南の3筋に分かれる。筋どうしは中央と両端のすき間でしかつながらない
// ホムラモチは溶岩ごしに隣の筋へ撃てるので、中央の道を進むと北と南の両方から焼かれる
// 中央の道はイワモチがふさぎ、カゲロウが北と南の筋を回ってくる
export default stageFromMap({
  terrain: [
    '    t t d d t t',
    '   t d d T d d t',
    '  d d l l d l l l',
    ' d d d d t d d d d',
    '  d l l l d l l d',
    '   t d d d T d t',
    '    t t d d t t',
  ],
  units: [
    '    . . . . . .',
    '   @ . . . . i w',
    '  @ @ . . . . . .',
    ' @ @ @ . . s . i .',
    '  . . . . . . . .',
    '   . . . . . i w',
    '    . . . . s .',
  ],
  enemies: { i: 'ignimo', s: 'saximo', w: 'wispwraith' },
  partyApPerTurn: 10,
});
