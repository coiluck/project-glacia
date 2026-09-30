// プレイヤーランクの成長ルール
export const MAX_RANK = 50

// rank -> rank+1 に必要な経験値。上限なら0
export function expToNextRank(rank: number): number {
  return rank >= MAX_RANK ? 0 : 100 + (rank - 1) * 50
}

// ランクに応じたスタミナ上限
export function staminaMaxFor(rank: number): number {
  return 50 + (rank - 1)
}
