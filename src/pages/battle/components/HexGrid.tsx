import { classIcons } from '../../../data/characters/classIcons';
import { unitClasses } from '../../../data/unitClasses';
import { axialKey, hexCorners, hexToPixel } from '../../../features/battle/hex';
import type { Axial, Pixel } from '../../../features/battle/hex';
import type { StageTile, Unit } from '../../../features/battle/types';
import type { HighlightKind, MarkKind, UnitChip } from '../BattlePage';
import { TERRAIN_STYLES, terrainFill, tileHeight, tileLayers } from '../terrainStyles';
import ApPips from './ApPips';
import HexTile from './HexTile';
import TerrainDefs from './TerrainDefs';

// 盤面の描画定数（1920×1080の設計座標で作る）
const SIZE = 90; // 六角形の中心から頂点までの距離
const SQUASH = 0.7; // 俯瞰に見せるための縦圧縮
const THICKNESS = 30; // 通常のタイル1枚分の厚み
const PADDING = 24; // 盤面外周の余白

// HPバーがこの割合以下で色を変える
const LOW_HP_RATIO = 0.3;

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

// 側面のうち右側の一面
function shadedSidePoints(centerX: number, top: number, bottom: number): string {
  const [a, b] = [LOWER_CORNERS[0], LOWER_CORNERS[1]];
  return [
    `${centerX + a.x},${top + a.y}`,
    `${centerX + b.x},${top + b.y}`,
    `${centerX + b.x},${bottom + b.y}`,
    `${centerX + a.x},${bottom + a.y}`,
  ].join(' ');
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

// 予告値の文字。ダメージは倒せるなら KILL を添える
function chipText(chip: UnitChip) {
  switch (chip.kind) {
    case 'damage':
      return (
        <>
          −{chip.value}
          {chip.lethal && <small>KILL</small>}
        </>
      );
    case 'heal':
      return <>+{chip.value}</>;
    case 'ap':
      return <>+{chip.value} AP</>;
  }
}

interface HexGridProps {
  tiles: StageTile[];
  units: Unit[];
  highlights?: Map<string, HighlightKind>;
  marks?: Map<string, MarkKind>;
  costs?: Map<string, number>; // 移動先ごとの消費AP
  chips?: Map<string, UnitChip>; // ユニットIDごとの予告値
  hoverKey?: string | null; // ポインタが乗っている（タッチでは予告中の）マス
  selectedUnitId?: string | null;
  actedIds?: Set<string>; // このターンもう動けない味方
  getUnitName: (unit: Unit) => string;
  getUnitChibi: (unit: Unit) => string | null; // 絵がないユニットは null（トークン表示になる）
  onTileClick?: (pos: Axial) => void;
  onUnitClick?: (unit: Unit) => void;
  onHover?: (key: string | null) => void; // マス・ユニットにポインタが乗った / 離れた
}

export default function HexGrid({
  tiles,
  units,
  highlights,
  marks,
  costs,
  chips,
  hoverKey,
  selectedUnitId,
  actedIds,
  getUnitName,
  getUnitChibi,
  onTileClick,
  onUnitClick,
  onHover,
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
          const key = axialKey(tile.pos);
          const layers = layerGeometry(tile, center.y);
          return (
            <g key={key}>
              {layers.map((layer, li) => {
                const layerCenter = { x: center.x, y: layer.top };
                const points = tilePoints(layerCenter);
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
                    {/* 右側の一面だけ陰にして立体感を出す */}
                    <polygon
                      className="hex-side-shade"
                      points={shadedSidePoints(center.x, layer.top, layer.bottom)}
                    />
                    {/* 天面。操作を受けるのは一番上の層だけ */}
                    {li === layers.length - 1 ? (
                      <HexTile
                        pos={tile.pos}
                        points={points}
                        center={layerCenter}
                        fill={fill}
                        highlight={highlights?.get(key)}
                        mark={marks?.get(key)}
                        cost={costs?.get(key)}
                        hovered={hoverKey === key && highlights?.has(key)}
                        onClick={onTileClick ? () => onTileClick(tile.pos) : undefined}
                        onHover={onHover ? (hovered) => onHover(hovered ? key : null) : undefined}
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
          const chibi = getUnitChibi(unit);
          const chip = chips?.get(unit.id);
          const className = [
            'battle-unit',
            unit.side,
            unit.id === selectedUnitId && 'is-selected',
            actedIds?.has(unit.id) && 'is-acted',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <div
              key={unit.id}
              className={className}
              style={{ transform: `translate(${c.x - minX}px, ${c.y - minY}px)` }}
              onClick={onUnitClick ? () => onUnitClick(unit) : undefined}
              onPointerEnter={onHover ? () => onHover(axialKey(unit.pos)) : undefined}
              onPointerLeave={onHover ? () => onHover(null) : undefined}
            >
              <div className="battle-unit-body">
                {chip && (
                  <div
                    className={`battle-unit-chip is-${chip.kind}${chip.lethal ? ' is-lethal' : ''}`}
                  >
                    {chipText(chip)}
                  </div>
                )}
                {chibi ? (
                  <img className="battle-unit-chibi" src={chibi} alt="" draggable={false} />
                ) : (
                  <div className="battle-unit-token">
                    <svg viewBox="0 0 24 24" aria-hidden>
                      <path d={classIcons[unit.classId]} />
                    </svg>
                  </div>
                )}
                <div className="battle-unit-plate">
                  <div className="battle-unit-hp">
                    <div
                      className={`battle-unit-hp-fill${unit.hp / unit.maxHp <= LOW_HP_RATIO ? ' is-low' : ''}`}
                      style={{ width: `${(unit.hp / unit.maxHp) * 100}%` }}
                    />
                  </div>
                  {unit.side === 'ally' && (
                    <ApPips max={unitClasses[unit.classId].apPerTurn} current={unit.ap} size="tiny" />
                  )}
                  <div className="battle-unit-name">{getUnitName(unit)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
