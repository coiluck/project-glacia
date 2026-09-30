import type { BaseBuildingKind } from '../../data/base'

// 盤面に置いた建物1つ
// axialKey が key の Record で入る
export interface BaseBuilding {
  kind: BaseBuildingKind
  level: number
  output?: string // 作る物の itemId。採掘場は★1素材、書庫は訓練記録。ほかの建物はなし
  progress?: number // 1個に満たず持ち越した生産量。作る物を変えても引き継ぎ、次の回収で新しい cost で割る
}
