import type { MaterialCost, Rarity } from '../characters/types';

export type ItemKind =
  | 'material' // 素材: 上限解放・スキルLv上げで使う共通素材
  | 'book' // 強化書: スキルLv上げ
  | 'exp' // 経験値: キャラのレベル上げ
  | 'stamina'; // スタミナ回復: 使うとスタミナが増える。倉庫の一覧と交換所には並ばない

export interface ItemDef {
  id: string;
  nameKey: string; // i18n キー（items.json）
  kind: ItemKind;
  rarity: Rarity; // 3段階
  recipe?: MaterialCost[];
  exp?: number; // kind が 'exp' のときだけ。使うと入る経験値
  stamina?: number; // kind が 'stamina' のときだけ。使うと回復するスタミナ
}

// 素材
export const items: Record<string, ItemDef> = {
  // 素材（★1）
  // 氷晶片
  iceCrystal: {
    id: 'iceCrystal',
    nameKey: 'itemIceCrystal',
    kind: 'material',
    rarity: 1,
  },
  // 鋼の欠片
  steelScrap: {
    id: 'steelScrap',
    nameKey: 'itemSteelScrap',
    kind: 'material',
    rarity: 1,
  },
  // 火打石
  flint: {
    id: 'flint',
    nameKey: 'itemFlint',
    kind: 'material',
    rarity: 1,
  },
  // 壊れた歯車
  brokenGear: {
    id: 'brokenGear',
    nameKey: 'itemBrokenGear',
    kind: 'material',
    rarity: 1,
  },
  // 獣の牙
  beastFang: {
    id: 'beastFang',
    nameKey: 'itemBeastFang',
    kind: 'material',
    rarity: 1,
  },
  // 丈夫な毛皮
  toughHide: {
    id: 'toughHide',
    nameKey: 'itemToughHide',
    kind: 'material',
    rarity: 1,
  },
  // 薬草の束
  herbBundle: {
    id: 'herbBundle',
    nameKey: 'itemHerbBundle',
    kind: 'material',
    rarity: 1,
  },
  // 魔石の粉
  magicDust: {
    id: 'magicDust',
    nameKey: 'itemMagicDust',
    kind: 'material',
    rarity: 1,
  },

  // 素材（★2）
  // 覚醒石
  awakenStone: {
    id: 'awakenStone',
    nameKey: 'itemAwakenStone',
    kind: 'material',
    rarity: 2,
    recipe: [
      { itemId: 'iceCrystal', count: 3 },
      { itemId: 'steelScrap', count: 2 },
    ],
  },
  // 精錬鋼
  refinedSteel: {
    id: 'refinedSteel',
    nameKey: 'itemRefinedSteel',
    kind: 'material',
    rarity: 2,
    recipe: [
      { itemId: 'steelScrap', count: 2 },
      { itemId: 'brokenGear', count: 1 },
      { itemId: 'flint', count: 1 }, // 精錬の火種
    ],
  },
  // 魔獣石
  beastStone: {
    id: 'beastStone',
    nameKey: 'itemBeastStone',
    kind: 'material',
    rarity: 2,
    recipe: [
      { itemId: 'beastFang', count: 3 },
      { itemId: 'magicDust', count: 2 },
    ],
  },
  // 強化皮革
  temperedLeather: {
    id: 'temperedLeather',
    nameKey: 'itemTemperedLeather',
    kind: 'material',
    rarity: 2,
    recipe: [
      { itemId: 'toughHide', count: 3 },
      { itemId: 'herbBundle', count: 2 },
    ],
  },
  // 霊薬の雫
  elixirDrop: {
    id: 'elixirDrop',
    nameKey: 'itemElixirDrop',
    kind: 'material',
    rarity: 2,
    recipe: [
      { itemId: 'herbBundle', count: 3 },
      { itemId: 'magicDust', count: 2 },
    ],
  },
  // 素材（★3）
  // 覚醒輝石
  radiantStone: {
    id: 'radiantStone',
    nameKey: 'itemRadiantStone',
    kind: 'material',
    rarity: 3,
    recipe: [
      { itemId: 'awakenStone', count: 2 },
      { itemId: 'refinedSteel', count: 1 },
    ],
  },
  // 魔導核
  arcaneCore: {
    id: 'arcaneCore',
    nameKey: 'itemArcaneCore',
    kind: 'material',
    rarity: 3,
    recipe: [
      { itemId: 'beastStone', count: 2 },
      { itemId: 'elixirDrop', count: 1 },
    ],
  },
  // 英雄の遺物
  heroRelic: {
    id: 'heroRelic',
    nameKey: 'itemHeroRelic',
    kind: 'material',
    rarity: 3,
    recipe: [
      { itemId: 'temperedLeather', count: 2 },
      { itemId: 'awakenStone', count: 1 },
      { itemId: 'refinedSteel', count: 1 },
    ],
  },

  // skill強化書
  skillBookSmall: {
    id: 'skillBookSmall',
    nameKey: 'itemSkillBookSmall',
    kind: 'book',
    rarity: 1,
  },
  skillBookMedium: {
    id: 'skillBookMedium',
    nameKey: 'itemSkillBookMedium',
    kind: 'book',
    rarity: 2,
    recipe: [
      { itemId: 'skillBookSmall', count: 3 },
    ],
  },
  skillBookLarge: {
    id: 'skillBookLarge',
    nameKey: 'itemSkillBookLarge',
    kind: 'book',
    rarity: 3,
    recipe: [
      { itemId: 'skillBookMedium', count: 3 },
    ],
  },

  // 経験値
  trainingRecordSmall: {
    id: 'trainingRecordSmall',
    nameKey: 'itemTrainingRecordSmall',
    kind: 'exp',
    rarity: 1,
    exp: 50,
  },
  trainingRecordMedium: {
    id: 'trainingRecordMedium',
    nameKey: 'itemTrainingRecordMedium',
    kind: 'exp',
    rarity: 2,
    exp: 150,
  },
  trainingRecordLarge: {
    id: 'trainingRecordLarge',
    nameKey: 'itemTrainingRecordLarge',
    kind: 'exp',
    rarity: 3,
    exp: 250,
  },

  // スタミナ回復
  // 携行食
  fieldRation: {
    id: 'fieldRation',
    nameKey: 'itemFieldRation',
    kind: 'stamina',
    rarity: 3,
    stamina: 50,
  },
};
