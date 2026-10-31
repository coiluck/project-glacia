// 話者名 → 顔画像のキャラ id。char 命令の無い行でも、話者がここにあって舞台にいれば顔を出す
// ？？？ のように誰が話しているか決まらない名前は載せず、顔を出す行に char を書く
export const speakerFaces: Record<string, string> = {
  'ラピス': 'lapis',
  'クラリス': 'clarice',
  'アルマ': 'alma',
  'ロザリー': 'rosalie',
  'ベルミリア': 'vermilia',
  'シルヴィ': 'sylvie',
  'ステラ': 'stella',
  'ソレイユ': 'soleil',
  'オボロ': 'oboro',
  'ネーヴェ': 'automaton',
};
