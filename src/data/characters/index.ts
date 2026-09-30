import type { CharacterMaster } from './types';
import alma from './masters/alma';
import clarice from './masters/clarice';
import lapis from './masters/lapis';
import oboro from './masters/oboro';
import rosalie from './masters/rosalie';
import soleil from './masters/soleil';
import stella from './masters/stella';
import sylvie from './masters/sylvie';
import vermilia from './masters/vermilia';

// 味方キャラクターのマスターデータ。キーは CharacterMaster.id と一致させる
// キャラ1体ぶんの定義は masters/ に置く（ここが埋まらないよう分けている）
export const characterMasters: Record<string, CharacterMaster> = {
  alma,
  lapis,
  vermilia,
  soleil,
  oboro,
  stella,
  sylvie,
  clarice,
  rosalie,
};
