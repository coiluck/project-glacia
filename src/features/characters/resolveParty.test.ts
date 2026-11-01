import { describe, expect, it } from 'vitest';
import { characterMasters } from '../../data/characters';
import { PARTY_SIZE } from '../../data/characters/const';
import type { MeResponse } from '../contract';
import { resolveSaveParty } from './resolveParty';

// 全キャラを所持している状態。resolveSaveParty は characters と party しか見ない
const ids = Object.keys(characterMasters);
const me = {
  characters: ids.map((id) => ({
    masterId: id,
    level: 1,
    exp: 0,
    limitBreak: 0,
    dupe: 0,
    selectedSkillId: characterMasters[id].skills[0].def.id,
    skillLevels: {},
  })),
  party: { 1: [], 2: [], 3: [], 4: [] },
} as unknown as MeResponse;

describe('resolveSaveParty', () => {
  it('所持キャラが PARTY_SIZE より多い', () => {
    expect(ids.length).toBeGreaterThan(PARTY_SIZE);
  });

  it('PARTY_SIZE 人の編成は保存できる', () => {
    const party = ids.slice(0, PARTY_SIZE);
    expect(resolveSaveParty(me, { party: { 1: party }, selectedSkills: {} }).party[1]).toEqual(party);
  });

  it('PARTY_SIZE 人を超える編成は通らない', () => {
    const party = ids.slice(0, PARTY_SIZE + 1);
    expect(() => resolveSaveParty(me, { party: { 1: party }, selectedSkills: {} })).toThrow(
      /編成の人数/,
    );
  });
});
