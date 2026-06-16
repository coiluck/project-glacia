import HexTile from './HexTile'

// HEXタイルの盤面。座標生成・ユニット配置・移動範囲などを管理する。
// TODO: features/battle のロジックと接続する。
export default function HexGrid() {
  return (
    <div className="hex-grid">
      <HexTile />
      {/* TODO: 軸座標(q,r)からタイル群を生成 */}
    </div>
  )
}
