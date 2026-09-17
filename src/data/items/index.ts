import type { MaterialCost, Rarity } from '../characters/types';
import { ICONS } from './icons';

export type ItemKind =
  | 'material' // 素材: 上限解放・スキルLv上げで使う共通素材
  | 'book' // 強化書: スキルLv上げ
  | 'exp'; // 経験値: キャラのレベル上げ

export interface ItemDef {
  id: string;
  nameKey: string; // i18n キー（items.json）
  kind: ItemKind;
  rarity: Rarity; // 3段階
  icon: string;
  recipe?: MaterialCost[];
  exp?: number; // kind が 'exp' のときだけ。使うと入る経験値
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
    icon: ICONS.crystal,
  },
  // 鋼の欠片
  steelScrap: {
    id: 'steelScrap',
    nameKey: 'itemSteelScrap',
    kind: 'material',
    rarity: 1,
    icon: ICONS.scrap,
  },
  // 火打石
  flint: {
    id: 'flint',
    nameKey: 'itemFlint',
    kind: 'material',
    rarity: 1,
    icon: ICONS.flint,
  },
  // 壊れた歯車
  brokenGear: {
    id: 'brokenGear',
    nameKey: 'itemBrokenGear',
    kind: 'material',
    rarity: 1,
    icon: ICONS.gear,
  },
  // 獣の牙
  beastFang: {
    id: 'beastFang',
    nameKey: 'itemBeastFang',
    kind: 'material',
    rarity: 1,
    icon: ICONS.fang,
  },
  // 丈夫な毛皮
  toughHide: {
    id: 'toughHide',
    nameKey: 'itemToughHide',
    kind: 'material',
    rarity: 1,
    icon: ICONS.hide,
  },
  // 薬草の束
  herbBundle: {
    id: 'herbBundle',
    nameKey: 'itemHerbBundle',
    kind: 'material',
    rarity: 1,
    icon: ICONS.herb,
  },
  // 魔石の粉
  magicDust: {
    id: 'magicDust',
    nameKey: 'itemMagicDust',
    kind: 'material',
    rarity: 1,
    icon: ICONS.dust,
  },

  // 素材（★2）
  // 覚醒石
  awakenStone: {
    id: 'awakenStone',
    nameKey: 'itemAwakenStone',
    kind: 'material',
    rarity: 2,
    icon: ICONS.stone,
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
    icon: ICONS.ingot,
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
    icon: ICONS.core,
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
    icon: ICONS.leather,
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
    icon: ICONS.flask,
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
    icon: ICONS.radiant,
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
    icon: ICONS.arcane,
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
    icon: ICONS.relic,
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
    icon: ICONS.book,
  },
  skillBookMedium: {
    id: 'skillBookMedium',
    nameKey: 'itemSkillBookMedium',
    kind: 'book',
    rarity: 2,
    icon: ICONS.book,
    recipe: [
      { itemId: 'skillBookSmall', count: 3 },
    ],
  },
  skillBookLarge: {
    id: 'skillBookLarge',
    nameKey: 'itemSkillBookLarge',
    kind: 'book',
    rarity: 3,
    icon: ICONS.book,
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
    icon: ICONS.record,
    exp: 500,
  },
  trainingRecordMedium: {
    id: 'trainingRecordMedium',
    nameKey: 'itemTrainingRecordMedium',
    kind: 'exp',
    rarity: 2,
    icon: ICONS.record,
    exp: 1000,
  },
  trainingRecordLarge: {
    id: 'trainingRecordLarge',
    nameKey: 'itemTrainingRecordLarge',
    kind: 'exp',
    rarity: 3,
    icon: ICONS.record,
    exp: 1500,
  },
};
