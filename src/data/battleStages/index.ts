import type { BattleStageData } from '../../features/battle/types';
import stage1_1 from './1-1';

// 戦闘マップの定義。keyはstages.tsのStage.idと一致させる。
export const battleStageRegistry: Record<string, BattleStageData> = {
  '1-1': stage1_1,
};
