import type { Rarity } from '../../data/characters/types'

// 召集で1体手に入れたときの結果
export type AcquireResult = 'new' | 'dupe' | 'convert'

// 引いた1体ぶんの結果
export interface PullOutcome {
  masterId: string
  rarity: Rarity
  kind: AcquireResult
  currency: number // 凸上限で変換して得た通貨。convert以外なら0
}
