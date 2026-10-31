import { describe, expect, it } from 'vitest';
import { reduceLine } from './SceneReducer';
import type { SceneSnapshot } from './types';

const empty: SceneSnapshot = { background: null, characters: [], text: '', speaker: '', faceId: null };
const faces = { 'ラピス': 'lapis' };

describe('reduceLine の顔', () => {
  it('char 命令のキャラの顔を出す', () => {
    const s = reduceLine(empty, { text: '', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] }, faces);
    expect(s.faceId).toBe('lapis');
  });

  it('char 命令が無くても、話者のキャラが舞台にいれば顔を出す', () => {
    const onStage = reduceLine(empty, { text: '', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] }, faces);
    expect(reduceLine(onStage, { text: '', speaker: 'ラピス' }, faces).faceId).toBe('lapis');
  });

  it('話者のキャラが舞台にいなければ顔を出さない', () => {
    expect(reduceLine(empty, { text: '', speaker: 'ラピス' }, faces).faceId).toBeNull();
  });

  it('表に無い話者や地の文では顔を出さない', () => {
    const onStage = reduceLine(empty, { text: '', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] }, faces);
    expect(reduceLine(onStage, { text: '', speaker: '？？？' }, faces).faceId).toBeNull();
    expect(reduceLine(onStage, { text: '' }, faces).faceId).toBeNull();
  });

  it('char 命令は話者より優先する', () => {
    const onStage = reduceLine(empty, { text: '', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] }, faces);
    const s = reduceLine(onStage, { text: '', speaker: 'ラピス', commands: [{ type: 'char', id: 'alma', pose: 'normal' }] }, faces);
    expect(s.faceId).toBe('alma');
  });
});
