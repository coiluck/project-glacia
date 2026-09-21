import { items, type ItemDef, type ItemKind } from './items';

// 毎日受け取れる交換材料
export const DAILY_TOKENS = 300;

// 紙幣 -> 交換材料のレート
export const TOKEN_PRICE = 10;

// 1日に並ぶ枠の数
export const LINEUP_SIZE = 8;

// 種別ごとの基準価格
export const BASE_PRICE: Record<ItemKind, number> = {
  material: 40,
  book: 100,
  exp: 80,
};

// PRICE_MIN〜PRICE_MAX 倍の幅でぶれる
export const PRICE_MIN = 0.75;
export const PRICE_MAX = 1.25;
export const PRICE_STEP = 5; // 価格はこの単位に丸める

// ★1だけ
export const exchangePool: ItemDef[] = Object.values(items).filter((i) => i.rarity === 1);
