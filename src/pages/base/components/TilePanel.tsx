import { baseTileMap } from '../../../data/baseTerrain'
import type { BaseView, Stock } from '../view'
import BuildingPanel from './BuildingPanel'
import EmptyPanel from './EmptyPanel'
import RefineryPanel from './RefineryPanel'
import TowerPanel from './TowerPanel'

type Props = {
  view: BaseView
  tileKey: string
  stock: Stock | undefined
  onClose: () => void
}

// 押したマスの詳細。マスの種類でパネルを分ける
export default function TilePanel({ view, tileKey, stock, onClose }: Props) {
  const kind = baseTileMap.get(tileKey)!.kind
  if (kind === 'tower') return <TowerPanel view={view} onClose={onClose} />
  if (kind === 'refinery') return <RefineryPanel view={view} onClose={onClose} />
  if (view.base.base_board[tileKey]) return <BuildingPanel view={view} tileKey={tileKey} stock={stock} onClose={onClose} />
  return <EmptyPanel view={view} tileKey={tileKey} onClose={onClose} />
}
