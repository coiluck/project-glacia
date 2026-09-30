import { stageFromMap } from './grid';

// 1-4 石切り場
// 切り出した岩の壁が2枚。手前の壁は上端・中央・下端の3か所、奥の壁は中央の1か所だけ抜けられる
// 壁の間の作業場にイワモチとコオリモチ、奥の壁の裏からシモフクロウが作業場を撃つ
// 奥の門はイワモチがふさいでいるので、硬い相手をどう崩すかが課題
export default stageFromMap({
  terrain: [
    '    d d d t T d',
    '   d d T d T d d',
    '  d d T d d T t d',
    ' d d d d t d d d d',
    '  d d T d d T d t',
    '   d d T t T d d',
    '    d d d d T d',
  ],
  units: [
    '    . . . . . .',
    '   @ . . g . . .',
    '  @ . . . . . o .',
    ' @ @ . . s s . s .',
    '  @ . . . . . o .',
    '   @ . . g . . .',
    '    . . . . . .',
  ],
  enemies: { g: 'glacimo', o: 'rimeowl', s: 'saximo' },
  partyApPerTurn: 10,
});
