import type { ScenarioFile } from '../../features/scenario/types';
import stage1_1 from './1-1';
import stage1_2 from './1-2';
import stage1_3 from './1-3';
import stage1_4 from './1-4';
import stage1_5 from './1-5';
import stage2_1 from './2-1';
import stage2_2 from './2-2';
import stage2_3 from './2-3';
import stage2_4 from './2-4';
import stage2_5 from './2-5';
import stage2_6 from './2-6';
import stage3_1 from './3-1';
import stage3_2 from './3-2';
import stage3_3 from './3-3';
import stage3_4 from './3-4';
import stage3_5 from './3-5';
import stage3_6 from './3-6';
import stage3_7 from './3-7';
import stage4_1 from './4-1';
import stage4_2 from './4-2';
import stage4_3 from './4-3';
import stage4_4 from './4-4';
import stage4_5 from './4-5';
import stage4_6 from './4-6';
import stage4_7 from './4-7';

// key は stages.ts の Stage.id と一致させる。
export const scenarioRegistry: Record<string, ScenarioFile> = {
  '1-1': stage1_1,
  '1-2': stage1_2,
  '1-3': stage1_3,
  '1-4': stage1_4,
  '1-5': stage1_5,
  '2-1': stage2_1,
  '2-2': stage2_2,
  '2-3': stage2_3,
  '2-4': stage2_4,
  '2-5': stage2_5,
  '2-6': stage2_6,
  '3-1': stage3_1,
  '3-2': stage3_2,
  '3-3': stage3_3,
  '3-4': stage3_4,
  '3-5': stage3_5,
  '3-6': stage3_6,
  '3-7': stage3_7,
  '4-1': stage4_1,
  '4-2': stage4_2,
  '4-3': stage4_3,
  '4-4': stage4_4,
  '4-5': stage4_5,
  '4-6': stage4_6,
  '4-7': stage4_7,
};
