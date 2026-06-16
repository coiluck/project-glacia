# features/battle

HEXタイル戦闘のドメインロジック置き場（UIから分離）。

想定する中身（例）:
- `hex.ts` — 軸座標(q,r)・隣接・距離・移動範囲の計算
- `turn.ts` — ターン進行 / 行動順
- `combat.ts` — ダメージ計算

UI側（`pages/battle/`）はここの純粋ロジックを呼び出すだけにする。
