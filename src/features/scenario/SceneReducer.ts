import type { SceneSnapshot, ScenarioLine, StatefulCommand } from './types';

type Reducer<C extends StatefulCommand> = (snapshot: SceneSnapshot, cmd: C) => SceneSnapshot;

type Reducers = {
  [K in StatefulCommand['type']]: Reducer<Extract<StatefulCommand, { type: K }>>;
};

export const statefulReducers: Reducers = {
  bg: (s, cmd) => ({
    ...s,
    background: { file: cmd.file, transition: cmd.transition ?? 'fade' },
  }),

  char: (s, cmd) => {
    const entry = { id: cmd.id, pose: cmd.pose };
    const i = s.characters.findIndex(c => c.id === cmd.id);
    if (i < 0) return { ...s, characters: [...s.characters, entry], faceId: cmd.id };
    const next = s.characters.slice();
    next[i] = entry;
    return { ...s, characters: next, faceId: cmd.id };
  },

  charDelete: (s, cmd) => ({
    ...s,
    characters: cmd.id ? s.characters.filter(c => c.id !== cmd.id) : [],
  }),
};

const isStatefulType = (type: string): type is StatefulCommand['type'] =>
  type in statefulReducers;

/**
 * stateful命令とtext/speakerを適用してsnapshotを更新する。transient命令は無視する。
 * speakerFaces は話者名 → キャラ id。char 命令の無い行では、話者のキャラが舞台にいればその顔を出す。
 */
export function reduceLine(
  snapshot: SceneSnapshot,
  line: ScenarioLine,
  speakerFaces: Record<string, string> = {},
): SceneSnapshot {
  let next: SceneSnapshot = {
    ...snapshot,
    text: line.text,
    speaker: line.speaker ?? '',
    faceId: null,
  };
  for (const cmd of line.commands ?? []) {
    if (!isStatefulType(cmd.type)) continue;
    const reducer = statefulReducers[cmd.type] as Reducer<StatefulCommand>;
    next = reducer(next, cmd as StatefulCommand);
  }
  if (next.faceId === null && line.speaker) {
    const id = speakerFaces[line.speaker];
    if (id && next.characters.some(c => c.id === id)) next = { ...next, faceId: id };
  }
  return next;
}
