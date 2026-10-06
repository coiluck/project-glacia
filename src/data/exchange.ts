import { items, type ItemDef, type ItemKind } from './items';

// 毎日受け取れる交換材料。ラインナップを全部は買えない量にして、選ばせる
export const DAILY_TOKENS = 150;

// 紙幣 -> 交換材料のレート。周回で稼ぐ紙幣より割高にする
export const TOKEN_PRICE = 15;

// 1日に並ぶ枠の数
export const LINEUP_SIZE = 8;

// 種別ごとの1個あたりの基準価格。枠の価格はこれに個数を掛ける
export const BASE_PRICE: Record<ItemKind, number> = {
  material: 15,
  book: 100,
  exp: 15,
};

// 種別ごとの1枠の個数（min〜max）
export const OFFER_COUNT: Record<ItemKind, { min: number; max: number }> = {
  material: { min: 2, max: 3 },
  book: { min: 2, max: 2 },
  exp: { min: 3, max: 3 },
};

// PRICE_MIN〜PRICE_MAX 倍の幅でぶれる
export const PRICE_MIN = 0.75;
export const PRICE_MAX = 1.25;
export const PRICE_STEP = 5; // 価格はこの単位に丸める

// ★1だけ
export const exchangePool: ItemDef[] = Object.values(items).filter((i) => i.rarity === 1);
