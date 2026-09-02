import type { CharacterMaster } from './types';
import alma from './masters/alma';
import lapis from './masters/lapis';
import vermilia from './masters/vermilia';

// 味方キャラクターのマスターデータ。キーは CharacterMaster.id と一致させる
// キャラ1体ぶんの定義は masters/ に置く（ここが埋まらないよう分けている）
export const characterMasters: Record<string, CharacterMaster> = {
  alma,
  lapis,
  vermilia,
};
