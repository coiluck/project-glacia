import type { HighlightKind } from '../BattlePage';

interface HexTileProps {
  points: string; // 六角形の頂点座標（盤面の絶対座標）
  fill: string; // 天面の塗り（地形テクスチャ）
  highlight?: HighlightKind;
  onClick?: () => void;
}

// HEXタイル1枚の天面。側面はHexGrid側
// ハイライトは地形が見えるように別のポリゴンで半透明に重ねる
export default function HexTile({ points, fill, highlight, onClick }: HexTileProps) {
  return (
    <g className={`hex-tile${highlight ? ` is-${highlight}` : ''}`} onClick={onClick}>
      <polygon className="hex-top" points={points} fill={fill} />
      {highlight && <polygon className="hex-highlight" points={points} />}
    </g>
  );
}
