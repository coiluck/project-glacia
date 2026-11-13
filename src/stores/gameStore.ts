import { create } from 'zustand';
import type { BgDirection, Choice, SceneSnapshot } from '../features/scenario/types';

export type Motion = {
  id: number;
  direction: BgDirection;
  duration: number;
};

export type Shake = {
  id: number;
  duration: number;
  intensity: number; // 揺れの強さ。px への換算は Background が持つ
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
  shake: Shake | null;
  bounce: Bounce | null;
  pendingChoice: PendingChoice | null;
  setSnapshot: (snapshot: SceneSnapshot) => void;
  fireMotion: (m: Omit<Motion, 'id'>) => void;
  fireShake: (s: Omit<Shake, 'id'>) => void;
  fireBounce: (charId: string) => void;
  setPendingChoice: (c: PendingChoice | null) => void;
  reset: () => void;
};

let motionSeq = 0;
let shakeSeq = 0;
let bounceSeq = 0;

export const useGameStore = create<GameStore>((set) => ({
  snapshot: INITIAL_SNAPSHOT,
  motion: null,
  shake: null,
  bounce: null,
  pendingChoice: null,
  setSnapshot: (snapshot) => set({ snapshot }),
  fireMotion: (m) => set({ motion: { id: ++motionSeq, ...m } }),
  fireShake: (s) => set({ shake: { id: ++shakeSeq, ...s } }),
  fireBounce: (charId) => set({ bounce: { id: ++bounceSeq, charId } }),
  setPendingChoice: (pendingChoice) => set({ pendingChoice }),
  reset: () => set({ snapshot: INITIAL_SNAPSHOT, motion: null, shake: null, bounce: null, pendingChoice: null }),
}));
