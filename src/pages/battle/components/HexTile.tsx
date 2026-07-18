import type { Pixel } from '../../../features/battle/hex';

// タイルのハイライト種別
export type HighlightKind = 'deploy' | 'move' | 'attack' | 'skill';

interface HexTileProps {
  center: Pixel;
  points: string; // 六角形の頂点座標
  highlight?: HighlightKind;
  onClick?: () => void;
}

// HEXタイル1枚の天面。側面はHexGrid側
export default function HexTile({ center, points, highlight, onClick }: HexTileProps) {
  return (
    <polygon
      className={`hex-top${highlight ? ` is-${highlight}` : ''}`}
      points={points}
      transform={`translate(${center.x} ${center.y})`}
      onClick={onClick}
    />
  );
}
