import { create } from 'zustand';
import type { BgDirection, Choice, SceneSnapshot } from './types';

export type Motion = {
  id: number;
  direction: BgDirection;
  duration: number;
};

export type Bounce = {
  id: number; // 同じキャラへの連続発火を区別するためのキー
  charId: string;
};

export type PendingChoice = {
  choiceId: string;
  choices: Choice[];
};

const INITIAL_SNAPSHOT: SceneSnapshot = {
  background: null,
  characters: [],
  text: '',
  speaker: '',
  faceId: null,
};

type GameStore = {
  snapshot: SceneSnapshot;
  motion: Motion | null;
  bounce: Bounce | null;
  pendingChoice: PendingChoice | null;
  setSnapshot: (snapshot: SceneSnapshot) => void;
  fireMotion: (m: Omit<Motion, 'id'>) => void;
  fireBounce: (charId: string) => void;
  setPendingChoice: (c: PendingChoice | null) => void;
  reset: () => void;
};

let motionSeq = 0;
let bounceSeq = 0;

export const useGameStore = create<GameStore>((set) => ({
  snapshot: INITIAL_SNAPSHOT,
  motion: null,
  bounce: null,
  pendingChoice: null,
  setSnapshot: (snapshot) => set({ snapshot }),
  fireMotion: (m) => set({ motion: { id: ++motionSeq, ...m } }),
  fireBounce: (charId) => set({ bounce: { id: ++bounceSeq, charId } }),
  setPendingChoice: (pendingChoice) => set({ pendingChoice }),
  reset: () => set({ snapshot: INITIAL_SNAPSHOT, motion: null, bounce: null, pendingChoice: null }),
}));
