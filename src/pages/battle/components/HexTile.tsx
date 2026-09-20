import type { Axial, Pixel } from '../../../features/battle/hex';
import type { HighlightKind, MarkKind } from '../BattlePage';

interface HexTileProps {
  pos: Axial; // このマスの座標。data属性に出してDOM側から引けるようにする
  points: string; // 六角形の頂点座標（盤面の絶対座標）
  center: Pixel; // 天面の中心（消費APの数字を置く位置）
  fill: string; // 天面の塗り（地形テクスチャ）
  highlight?: HighlightKind;
  mark?: MarkKind;
  cost?: number; // 移動に要するAP。移動先のマスだけ持つ
  hovered?: boolean;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
}

// HEXタイル1枚の天面。側面はHexGrid側
export default function HexTile({
  pos,
  points,
  center,
  fill,
  highlight,
  mark,
  cost,
  hovered,
  onClick,
  onHover,
}: HexTileProps) {
  const className = [
    'hex-tile',
    highlight && `is-${highlight}`,
    mark && `is-${mark}`,
    hovered && 'is-hover',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <g
      className={className}
      data-q={pos.q}
      data-r={pos.r}
      onClick={onClick}
      onPointerEnter={onHover ? () => onHover(true) : undefined}
      onPointerLeave={onHover ? () => onHover(false) : undefined}
    >
      <polygon className="hex-top" points={points} fill={fill} />
      {highlight && <polygon className="hex-highlight" points={points} />}
      {mark && <polygon className="hex-mark" points={points} />}
      {cost !== undefined && (
        <text className="hex-cost" x={center.x} y={center.y}>
          {cost}
        </text>
      )}
    </g>
  );
}
