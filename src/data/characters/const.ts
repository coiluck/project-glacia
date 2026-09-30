// キャラまわりで複数の画面が同じ値を使う定数
import type { Rarity } from './types';

// ★の一覧（昇順）。★の描画も、レアリティ別の一覧を回すのもこれを使う
export const RARITIES: Rarity[] = [1, 2, 3];

// 凸（ガチャでかぶった時に重ねられる）の上限。上限解放とは別のシステム
export const MAX_DUPE = 5;

// スキルレベルの上限
export const MAX_SKILL_LEVEL = 7;

// レベルアップで取る通貨。消費した経験値1あたり
export const CURRENCY_PER_EXP = 1;

// レアリティごとのレベル上限
export const MAX_LEVEL: Record<Rarity, number> = {
  1: 40,
  2: 50,
  3: 60,
}

// このレベルを超えるには上限解放が必要
// レアリティごとの上限解放の回数 = この配列の長さ
export const LIMIT_BREAK_LEVELS: Record<Rarity, number[]> = {
  1: [30],
  2: [30],
  3: [30, 45],
}

// 次のレベルに上がるのに必要な経験値。レベル帯ごとに定義する（レアリティ共通）
// fromLevel 以上・次の要素の fromLevel 未満でいる間、1レベルぶんの必要経験値が exp
export const EXP_TO_NEXT_LEVEL: { fromLevel: number; exp: number }[] = [
  { fromLevel: 1,  exp: 100 },
  { fromLevel: 6,  exp: 200 },
  { fromLevel: 11, exp: 300 },
  { fromLevel: 16, exp: 400 },
  { fromLevel: 21, exp: 500 },
  { fromLevel: 26, exp: 750 },
  { fromLevel: 31, exp: 1250 },
  { fromLevel: 36, exp: 2000 },
  { fromLevel: 41, exp: 3000 },
  { fromLevel: 46, exp: 3500 },
  { fromLevel: 51, exp: 4000 },
  { fromLevel: 56, exp: 5000 },
]
