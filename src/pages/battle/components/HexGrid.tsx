import { axialKey, hexCorners, hexToPixel } from '../../../features/battle/hex';
import type { Axial, Pixel } from '../../../features/battle/hex';
import type { StageTile, Unit } from '../../../features/battle/types';
import type { HighlightKind } from '../BattlePage';
import { TERRAIN_STYLES, terrainFill, tileHeight, tileLayers } from '../terrainStyles';
import HexTile from './HexTile';
import TerrainDefs from './TerrainDefs';

// 盤面の描画定数（1920×1080の設計座標で作る）
const SIZE = 90; // 六角形の中心から頂点までの距離
const SQUASH = 0.7; // 俯瞰に見せるための縦圧縮
const THICKNESS = 30; // 通常のタイル1枚分の厚み
const PADDING = 24; // 盤面外周の余白

// 全タイル共通の頂点座標（縦圧縮込み）
const CORNERS = hexCorners(SIZE).map((c) => ({ x: c.x, y: c.y * SQUASH }));
// 天面の下側の輪郭（右下→下→左下）。側面はこれを下端まで押し出して作る
const LOWER_CORNERS = [CORNERS[1], CORNERS[2], CORNERS[3]];

// タイル中心のピクセル座標（縦圧縮込み）
function tileCenter(pos: Axial): Pixel {
  const p = hexToPixel(pos, SIZE);
  return { x: p.x, y: p.y * SQUASH };
}

// 天面は地形テクスチャを貼るため絶対座標で描く
function tilePoints(center: Pixel): string {
  return CORNERS.map((c) => `${center.x + c.x},${center.y + c.y}`).join(' ');
}

// 側面。天面の下側の輪郭と下端の輪郭をつないだ帯
function sidePoints(centerX: number, top: number, bottom: number): string {
  const upper = LOWER_CORNERS.map((c) => `${centerX + c.x},${top + c.y}`);
  const lower = LOWER_CORNERS.map((c) => `${centerX + c.x},${bottom + c.y}`).reverse();
  return [...upper, ...lower].join(' ');
}

// 各層の上端・下端のy座標。下端は全タイル共通で centerY + THICKNESS に揃える
function layerGeometry(tile: StageTile, centerY: number) {
  let bottom = centerY + THICKNESS;
  return tileLayers(tile).map((layer) => {
    const top = bottom - layer.height * THICKNESS;
    const placed = { ...layer, bottom, top };
    bottom = top;
    return placed;
  });
}

interface HexGridProps {
  tiles: StageTile[];
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
  const centers = tiles.map((t) => tileCenter(t.pos));
  const halfW = (Math.sqrt(3) / 2) * SIZE;
  const halfH = SIZE * SQUASH;
  // 下端は全タイル共通、上端は一番高い台地で決まる
  const bottom = Math.max(...centers.map((c) => c.y)) + THICKNESS;
  const top = Math.min(
    ...centers.map((c, i) => c.y + THICKNESS - tileHeight(tiles[i]) * THICKNESS),
  );
  const minX = Math.min(...centers.map((c) => c.x)) - halfW - PADDING;
  const minY = top - halfH - PADDING;
  const width = Math.max(...centers.map((c) => c.x)) + halfW + PADDING - minX;
  const height = bottom + halfH + PADDING - minY;

  // 手前（rが大きい）のタイルを後に描くと、奥のタイルの側面に自然に重なる
  const drawOrder = tiles
    .map((_, i) => i)
    .sort((a, b) => tiles[a].pos.r - tiles[b].pos.r || tiles[a].pos.q - tiles[b].pos.q);

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
        <TerrainDefs />
        {drawOrder.map((i) => {
          const tile = tiles[i];
          const center = centers[i];
          const layers = layerGeometry(tile, center.y);
          return (
            <g key={axialKey(tile.pos)}>
              {layers.map((layer, li) => {
                const points = tilePoints({ x: center.x, y: layer.top });
                const fill = terrainFill(layer.terrain);
                // opacity は層ごとにまとめてかける
                // 個別にかけると側面・天面で二重になるので
                return (
                  <g key={li} opacity={layer.opacity}>
                    {/* 側面 */}
                    <polygon
                      className="hex-side"
                      points={sidePoints(center.x, layer.top, layer.bottom)}
                      fill={TERRAIN_STYLES[layer.terrain].side}
                    />
                    {/* 天面。操作を受けるのは一番上の層だけ */}
                    {li === layers.length - 1 ? (
                      <HexTile
                        points={points}
                        fill={fill}
                        highlight={highlights?.get(axialKey(tile.pos))}
                        onClick={onTileClick ? () => onTileClick(tile.pos) : undefined}
                      />
                    ) : (
                      <polygon className="hex-top" points={points} fill={fill} />
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
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
