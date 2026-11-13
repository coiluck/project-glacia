import type { CSSProperties } from 'react';
import { axialKey, hexCorners, hexToPixel } from '../../../features/battle/hex';
import type { Axial, Pixel } from '../../../features/battle/hex';
import type { StageTile, Unit } from '../../../features/battle/types';
import type { FxBatch } from '../attackFx';
import type { HighlightKind, MarkKind, UnitChip } from '../BattlePage';
import { TERRAIN_STYLES, terrainFill, tileHeight, tileLayers } from '../terrainStyles';
import ApPips from './ApPips';
import FxLayer from './FxLayer';
import HexTile from './HexTile';
import TerrainDefs from './TerrainDefs';

// 盤面の描画定数（1920×1080の設計座標で作る）
const SIZE = 90; // 六角形の中心から頂点までの距離
const SQUASH = 0.7; // 俯瞰に見せるための縦圧縮
const THICKNESS = 30; // 通常のタイル1枚分の厚み
const PADDING = 24; // 盤面外周の余白

// HPバーがこの割合以下で色を変える
const LOW_HP_RATIO = 0.3;
// HPバーの減った分を白く残す時間。着弾からこれだけ遅れて追いかける
const HP_LAG_DELAY = 350;

// 攻撃演出でちびキャラが動く量
const LUNGE_REACH = 46; // 踏み込み
const CAST_REACH = 20; // 構えるときに引く量の元
const HIT_SHAKE = 10; // 被弾の揺れ

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
  getUnitChibi: (unit: Unit) => string;
  onTileClick?: (pos: Axial) => void;
  onUnitClick?: (unit: Unit) => void;
  onHover?: (key: string | null) => void; // マス・ユニットにポインタが乗った / 離れた
  fx?: FxBatch[]; // 再生中の攻撃演出
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
  fx = [],
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

  // 盤面内のピクセル座標（タイル中心）
  const boardPx = (pos: Axial): Pixel => {
    const c = tileCenter(pos);
    return { x: c.x - minX, y: c.y - minY };
  };
  const tileByKey = new Map(tiles.map((t) => [axialKey(t.pos), t]));

  // 攻撃演出のうちユニット側に出るもの。ちびキャラの動き、HPバーの遅れ、倒れたユニット
  // ちびキャラは演出ごとに key を変えて作り直し、同じ動きが続いても頭から再生させる
  const unitFx = new Map<string, { className: string; key: string; style: CSSProperties }>();
  const hpDelay = new Map<string, number>();
  const dieAt = new Map<string, number>();
  const ghosts: Unit[] = [];
  for (const b of fx) {
    const from = boardPx(b.actorPos);
    const to = boardPx(b.toward);
    const len = Math.hypot(to.x - from.x, to.y - from.y) || 1;
    const reach = b.motion === 'lunge' ? LUNGE_REACH : CAST_REACH;
    unitFx.set(b.actorId, {
      className: `fx-${b.motion}`,
      key: `fx-${b.id}`,
      style: {
        animationDelay: `${b.start}ms`,
        '--dx': `${((to.x - from.x) / len) * reach}px`,
        '--dy': `${((to.y - from.y) / len) * reach}px`,
      } as CSSProperties,
    });
    for (const hit of b.hits) {
      hpDelay.set(hit.unitId, b.hitAt);
      if (hit.unitId === b.actorId) continue; // 吸収で自分も回復するときは攻撃の動きを優先
      unitFx.set(hit.unitId, {
        className: hit.value < 0 ? 'fx-hit' : 'fx-healed',
        key: `fx-${b.id}`,
        style: {
          animationDelay: `${b.hitAt}ms`,
          '--kx': `${boardPx(hit.pos).x >= from.x ? HIT_SHAKE : -HIT_SHAKE}px`, // 飛んできた向きへ揺れる
        } as CSSProperties,
      });
    }
    for (const ghost of b.ghosts) {
      if (!dieAt.has(ghost.id) && !units.some((u) => u.id === ghost.id)) ghosts.push(ghost);
      dieAt.set(ghost.id, b.dieAt);
    }
  }
  const ghostIds = new Set(ghosts.map((g) => g.id));

  // 手前のユニットが上に描かれるように並べる
  const sortedUnits = [...units, ...ghosts].sort((a, b) => a.pos.r - b.pos.r || a.pos.q - b.pos.q);

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
        {/* 範囲スキルの効果範囲。着弾と同時に光らせる */}
        {fx.map(
          (b) =>
            b.area.length > 0 && (
              <g
                key={b.id}
                className={`fx-area is-${b.side}`}
                style={{ '--delay': `${b.hitAt}ms` } as CSSProperties}
              >
                {b.area.map((pos) => {
                  const tile = tileByKey.get(axialKey(pos));
                  if (!tile) return null;
                  const c = tileCenter(pos);
                  const layers = layerGeometry(tile, c.y);
                  return (
                    <polygon
                      key={axialKey(pos)}
                      points={tilePoints({ x: c.x, y: layers[layers.length - 1].top })}
                    />
                  );
                })}
              </g>
            ),
        )}
      </svg>

      {/* ユニットレイヤー */}
      <div className="hex-units">
        {sortedUnits.map((unit) => {
          const c = boardPx(unit.pos);
          const chibi = getUnitChibi(unit);
          const chip = chips?.get(unit.id);
          const ghost = ghostIds.has(unit.id);
          const motion = unitFx.get(unit.id);
          const delay = hpDelay.get(unit.id);
          const className = [
            'battle-unit',
            unit.side,
            unit.id === selectedUnitId && 'is-selected',
            actedIds?.has(unit.id) && 'is-acted',
            ghost && 'is-dying',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <div
              key={unit.id}
              className={className}
              data-unit-id={unit.id}
              style={
                {
                  transform: `translate(${c.x}px, ${c.y}px)`,
                  '--die-delay': ghost ? `${dieAt.get(unit.id)}ms` : undefined,
                } as CSSProperties
              }
              onClick={onUnitClick && !ghost ? () => onUnitClick(unit) : undefined}
              onPointerEnter={onHover && !ghost ? () => onHover(axialKey(unit.pos)) : undefined}
              onPointerLeave={onHover && !ghost ? () => onHover(null) : undefined}
            >
              <div className="battle-unit-body">
                {chip && (
                  <div
                    className={`battle-unit-chip is-${chip.kind}${chip.lethal ? ' is-lethal' : ''}`}
                  >
                    {chipText(chip)}
                  </div>
                )}
                <img
                  key={motion?.key ?? 'idle'}
                  className={`battle-unit-chibi${motion ? ` ${motion.className}` : ''}`}
                  style={motion?.style}
                  src={chibi}
                  alt=""
                  draggable={false}
                />
                <div className="battle-unit-plate">
                  <div className="battle-unit-hp">
                    {/* 減った分を白く残し、少し遅れて追いかける */}
                    <div
                      className="battle-unit-hp-lag"
                      style={{
                        width: `${(unit.hp / unit.maxHp) * 100}%`,
                        transitionDelay: delay !== undefined ? `${delay + HP_LAG_DELAY}ms` : undefined,
                      }}
                    />
                    <div
                      className={`battle-unit-hp-fill${unit.hp / unit.maxHp <= LOW_HP_RATIO ? ' is-low' : ''}`}
                      style={{
                        width: `${(unit.hp / unit.maxHp) * 100}%`,
                        transitionDelay: delay !== undefined ? `${delay}ms` : undefined,
                      }}
                    />
                  </div>
                  {unit.side === 'ally' && (
                    <ApPips
                      max={unit.unitClass.apPerTurn}
                      current={unit.ap}
                      size="tiny"
                      guide={`ap-${unit.id}`}
                    />
                  )}
                  <div className="battle-unit-name">{getUnitName(unit)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <FxLayer batches={fx} toPx={boardPx} />
    </div>
  );
}
