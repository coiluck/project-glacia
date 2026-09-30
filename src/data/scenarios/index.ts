import type { ScenarioFile } from '../../features/scenario/types';
import stage1_1 from './1-1';

// keyはstages.tsのStage.idと一致させる。
export const scenarioRegistry: Record<string, ScenarioFile> = {
  '1-1': stage1_1,
};
