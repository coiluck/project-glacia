import type { ScenarioFile } from '../../features/scenario/types';
import stage1_1 from './1-1';

// キーは stages.ts の Stage.id（'1-1' など）と一致させる。
// ステージを追加したら src/data/scenarios/<id>/index.ts を作り、ここに登録する。
export const scenarioRegistry: Record<string, ScenarioFile> = {
  '1-1': stage1_1,
};
