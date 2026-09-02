// キャラまわりで複数の画面が同じ値を使う定数。
// レベルや凸の上限のような「成長のルール」は types.ts 側にある。
import type { Rarity } from './types';

// ★の一覧（昇順）。★の描画も、レアリティ別の一覧を回すのもこれを使う
export const RARITIES: Rarity[] = [1, 2, 3];
