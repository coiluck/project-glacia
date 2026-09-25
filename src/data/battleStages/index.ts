import type { BattleStageData } from '../../features/battle/types';
import stage1_1 from './1-1';
import stage1_2 from './1-2';
import stage1_3 from './1-3';
import stage1_4 from './1-4';
import stage1_5 from './1-5';
import stage1_6 from './1-6';

// 戦闘マップの定義。keyはstages.tsのStage.idと一致させる。
export const battleStageRegistry: Record<string, BattleStageData> = {
  '1-1': stage1_1,
  '1-2': stage1_2,
  '1-3': stage1_3,
  '1-4': stage1_4,
  '1-5': stage1_5,
  '1-6': stage1_6,
};
