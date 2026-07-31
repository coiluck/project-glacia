import type { CharacterMaster } from './types';
import alma from './alma';
import lapis from './lapis';
import vermilia from './vermilia';

// 味方キャラクターのマスターデータ。キーは CharacterMaster.id と一致させる
export const characterMasters: Record<string, CharacterMaster> = {
  alma,
  lapis,
  vermilia,
};
