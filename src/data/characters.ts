// 味方キャラクターの定義と、編成画面実装までの仮出撃パーティ。
import type { CharacterDef, SkillDef } from '../features/battle/types';

// スキルは複数キャラで使い回す
const skills: Record<string, SkillDef> = {
  // 強撃: 隣接1体に大ダメージ
  powerStrike: {
    id: 'powerStrike',
    nameKey: 'skillPowerStrike',
    apCost: 3,
    range: 1,
    effect: [
      { type: 'damage', power: 100, shape: { kind: 'range', max: 1 }, target: 'enemy', targets: 1 },
    ],
  },
  // 狙撃: 距離4まで届く単体攻撃
  snipe: {
    id: 'snipe',
    nameKey: 'skillSnipe',
    apCost: 3,
    range: 4,
    effect: [
      { type: 'damage', power: 80, shape: { kind: 'range', max: 4 }, target: 'enemy', targets: 1 },
    ],
  },
  // 治癒: 距離2以内の味方1体を回復
  heal: {
    id: 'heal',
    nameKey: 'skillHeal',
    apCost: 3,
    range: 2,
    effect: [{ type: 'healHp', amount: 150, target: 'ally' }],
  },
  // 鼓舞: 隣接1体に個人APを付与
  rally: {
    id: 'rally',
    nameKey: 'skillRally',
    apCost: 2,
    range: 1,
    effect: [{ type: 'grantAp', amount: 2, target: 'ally' }],
  },
};

export const characters: Record<string, CharacterDef> = {
  alma: {
    id: 'alma',
    nameKey: 'charAlma',
    classId: 'soldier',
    attack: 30,
    defense: 25,
    hp: 400,
    maxHp: 400,
    skills: [skills.powerStrike, skills.heal, skills.rally],
  },
  fei: {
    id: 'fei',
    nameKey: 'charFei',
    classId: 'archer',
    attack: 28,
    defense: 15,
    hp: 280,
    maxHp: 280,
    skills: [skills.snipe, skills.powerStrike, skills.rally],
  },
  nor: {
    id: 'nor',
    nameKey: 'charNor',
    classId: 'mage',
    attack: 32,
    defense: 12,
    hp: 240,
    maxHp: 240,
    skills: [skills.heal, skills.snipe, skills.rally],
  },
};

// 仮の出撃パーティ（キャラ + 編成画面で選んだ想定のスキル1つ）。
// TODO: 編成（party）実装後は playerStore の編成データから生成する。
export interface PartyMember {
  character: CharacterDef;
  skill: SkillDef;
}

export const testParty: PartyMember[] = [
  { character: characters.alma, skill: skills.powerStrike },
  { character: characters.fei, skill: skills.snipe },
  { character: characters.nor, skill: skills.heal },
];
