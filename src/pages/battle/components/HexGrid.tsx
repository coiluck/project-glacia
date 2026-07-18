import { axialKey, hexCorners, hexToPixel } from '../../../features/battle/hex';
import type { Axial, Pixel } from '../../../features/battle/hex';
import type { Unit } from '../../../features/battle/types';
import HexTile from './HexTile';
import type { HighlightKind } from './HexTile';

export type { HighlightKind };

// 盤面の描画定数（1920×1080の設計座標で作る）
const SIZE = 90; // 六角形の中心から頂点までの距離
const SQUASH = 0.7; // 俯瞰に見せるための縦圧縮
const THICKNESS = 14; // タイルの厚み
const PADDING = 24; // 盤面外周の余白

// 全タイル共通の頂点座標（縦圧縮込み）
const CORNER_POINTS = hexCorners(SIZE)
  .map((c) => `${c.x},${c.y * SQUASH}`)
  .join(' ');

// タイル中心のピクセル座標（縦圧縮込み）
function tileCenter(pos: Axial): Pixel {
  const p = hexToPixel(pos, SIZE);
  return { x: p.x, y: p.y * SQUASH };
}

interface HexGridProps {
  tiles: Axial[];
  units: Unit[];
  highlights?: Map<string, HighlightKind>;
  selectedUnitId?: string | null;
  getUnitName: (unit: Unit) => string;
  onTileClick?: (pos: Axial) => void;
  onUnitClick?: (unit: Unit) => void;
}

export default function HexGrid({
  tiles,
  units,
  highlights,
  selectedUnitId,
  getUnitName,
  onTileClick,
  onUnitClick,
}: HexGridProps) {
  // 盤面全体をPADDING内に
  const centers = tiles.map(tileCenter);
  const halfW = (Math.sqrt(3) / 2) * SIZE;
  const halfH = SIZE * SQUASH;
  const minX = Math.min(...centers.map((c) => c.x)) - halfW - PADDING;
  const minY = Math.min(...centers.map((c) => c.y)) - halfH - PADDING;
  const width = Math.max(...centers.map((c) => c.x)) + halfW + PADDING - minX;
  const height = Math.max(...centers.map((c) => c.y)) + halfH + THICKNESS + PADDING - minY;

  // 手前のユニットが上に描かれるように並べる
  const sortedUnits = [...units].sort((a, b) => a.pos.r - b.pos.r || a.pos.q - b.pos.q);

  return (
    <div className="hex-board" style={{ width, height }}>
      <svg
        className="hex-board-svg"
        width={width}
        height={height}
        viewBox={`${minX} ${minY} ${width} ${height}`}
        aria-hidden
      >
        {/* 側面 */}
        <g className="hex-sides">
          {tiles.map((pos, i) => (
            <polygon
              key={axialKey(pos)}
              className="hex-side"
              points={CORNER_POINTS}
              transform={`translate(${centers[i].x} ${centers[i].y + THICKNESS})`}
            />
          ))}
        </g>
        {/* 天面 */}
        {tiles.map((pos, i) => (
          <HexTile
            key={axialKey(pos)}
            center={centers[i]}
            points={CORNER_POINTS}
            highlight={highlights?.get(axialKey(pos))}
            onClick={onTileClick ? () => onTileClick(pos) : undefined}
          />
        ))}
      </svg>

      {/* ユニットレイヤー */}
      <div className="hex-units">
        {sortedUnits.map((unit) => {
          const c = tileCenter(unit.pos);
          return (
            <div
              key={unit.id}
              className={`battle-unit ${unit.side}${unit.id === selectedUnitId ? ' is-selected' : ''}`}
              style={{ transform: `translate(${c.x - minX}px, ${c.y - minY}px)` }}
              onClick={onUnitClick ? () => onUnitClick(unit) : undefined}
            >
              <div className="battle-unit-body">
                <div className="battle-unit-token">{getUnitName(unit).charAt(0)}</div>
                <div className="battle-unit-name">{getUnitName(unit)}</div>
                <div className="battle-unit-hp">
                  <div
                    className="battle-unit-hp-fill"
                    style={{ width: `${(unit.hp / unit.maxHp) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
