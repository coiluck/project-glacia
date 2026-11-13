// ガチャの排出テーブル
// 抽選そのものは features/gacha/roll.ts にある。
import type { Rarity } from './characters/types';
import { characterMasters } from './characters';

// 1回あたりの消費ジェム
export const PULL_COST_SINGLE = 300;
export const PULL_COST_MULTI = 2500;

// 「10連」が10回であることを書いている
export const MULTI_PULL_COUNT = 10;

// レアリティ別の排出率（%）
export const RARITY_RATES: Record<Rarity, number> = {
  3: 5,
  2: 20,
  1: 75,
};

// 召集の種類
export type BannerId = 'pickup' | 'standard';
export const BANNER_IDS: BannerId[] = ['pickup', 'standard'];

// ピックアップ対象を引いたレアリティで、この確率で対象の中から選ぶ
// 対象は features/gacha/pickUp.ts が時刻から決める
export const PICK_UP_RATE = 0.3;
// ピックアップを入れ替える間隔（日）
export const PICK_UP_DAYS = 7;

// 天井
// 交換ptはピックアップと常設で共有
export const CEILING_PULLS = 100;

// 凸が上限に達しているキャラを引いたときの変換
export const DUPE_CONVERT_CURRENCY: Record<Rarity, number> = {
  3: 5000,
  2: 2000,
  1: 500,
};

// レアリティ別にわけたやつ
const pool: Record<Rarity, string[]> = { 1: [], 2: [], 3: [] };
for (const master of Object.values(characterMasters)) {
  pool[master.rarity].push(master.id);
}
export const gachaPool = pool;
