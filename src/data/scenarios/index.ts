import type { ScenarioFile } from '../../features/scenario/types';
import stage1_1 from './1-1';
import stage1_2 from './1-2';
import stage1_3 from './1-3';
import stage1_4 from './1-4';
import stage1_5 from './1-5';
import stage2_1 from './2-1';

// keyはstages.tsのStage.idと一致させる。
export const scenarioRegistry: Record<string, ScenarioFile> = {
  '1-1': stage1_1,
  '1-2': stage1_2,
  '1-3': stage1_3,
  '1-4': stage1_4,
  '1-5': stage1_5,
  '2-1': stage2_1,
};
