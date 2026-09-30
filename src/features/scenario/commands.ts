import type { ScenarioCommand, StatefulCommand, TransientCommand } from './types';
import { statefulReducers } from './SceneReducer';

const STATEFUL_TYPES: ReadonlySet<string> = new Set(Object.keys(statefulReducers));

export const isStateful = (cmd: ScenarioCommand): cmd is StatefulCommand =>
  STATEFUL_TYPES.has(cmd.type);

export const isTransient = (cmd: ScenarioCommand): cmd is TransientCommand =>
  !STATEFUL_TYPES.has(cmd.type);
