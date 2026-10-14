import type { CSSProperties } from 'react'
import { baseTiles, TOWER_POS } from '../../../data/baseTerrain'
import type { BaseTile, BaseTileKind } from '../../../data/baseTerrain'
import { items } from '../../../data/items'
import { keyToAxial, resourceGrade } from '../../../features/base/board'
import type { BaseAnalysis, BaseRow } from '../../../features/base/board'
import type { BaseBuilding } from '../../../features/base/types'
import { axialKey, hexCorners, hexToPixel, neighbors } from '../../../features/battle/hex'
import type { Axial, Pixel } from '../../../features/battle/hex'
import type { TerrainKind } from '../../../features/battle/terrain'
import TerrainDefs from '../../battle/components/TerrainDefs'
import { TERRAIN_STYLES, terrainFill, tileHeight } from '../../battle/terrainStyles'
import ItemIcon from '../../../components/common/ItemIcon'
import { fill } from '../../../i18n'
import { chibiUrl, gradeStep } from '../view'
import type { BoardMember, BuildingForecast, Stock } from '../view'
import type { DragHandlers } from '../useMemberDrag'
import { ART_TOP, SQUASH } from './art'
import type { ArtKind, Point } from './art'
import BuildingArt from './BuildingArt'
import OreArt from './OreArt'
import { PipeHub, PipeHalf } from './PipeArt'

// 盤面の描画定数（1920×1080）
const SIZE = 64 // 六角形の中心から頂点までの距離
const THICKNESS = 20 // 通常のタイル1枚分の厚み
const PADDING = 20
const WALK_SPEED = 40 // 運ぶキャラの歩く速さ（px/秒）
const FOOT_OFFSET = 12 // キャラはマスの中心より少し手前に立たせる
const STOCK_GAP = 24 // 貯まった数の札は、絵の上に浮かぶ印より上に出す

const CORNERS = hexCorners(SIZE).map((c) => ({ x: c.x, y: c.y * SQUASH }))
const LOWER_CORNERS = [CORNERS[1], CORNERS[2], CORNERS[3]]

// マスの種類ごとの地形
const TILE_TERRAIN: Record<BaseTileKind, TerrainKind> = {
  ice: 'snow',
  resource: 'ore',
  blocked: 'snow',
  tower: 'thaw',
  refinery: 'thaw',
}
const elevationOf = (tile: BaseTile) => (tile.kind === 'blocked' ? 1 : 0)

// 資源のマスは等級が高いほど鉱脈が大きい
function terrainOf(tile: BaseTile): TerrainKind {
  if (tile.kind === 'resource' && gradeStep(resourceGrade(tile.pos)) === 2) return 'oreRich'
  return TILE_TERRAIN[tile.kind]
}

function tileCenter(pos: Axial): Pixel {
  const p = hexToPixel(pos, SIZE)
  return { x: p.x, y: p.y * SQUASH }
}

const topPoints = (c: Pixel) => CORNERS.map((k) => `${c.x + k.x},${c.y + k.y}`).join(' ')

// 側面
const sidePoints = (x: number, top: number, bottom: number) =>
  [
    ...LOWER_CORNERS.map((k) => `${x + k.x},${top + k.y}`),
    ...LOWER_CORNERS.map((k) => `${x + k.x},${bottom + k.y}`).reverse(),
  ].join(' ')

const shadePoints = (x: number, top: number, bottom: number) =>
  [
    `${x + LOWER_CORNERS[0].x},${top + LOWER_CORNERS[0].y}`,
    `${x + LOWER_CORNERS[1].x},${top + LOWER_CORNERS[1].y}`,
    `${x + LOWER_CORNERS[1].x},${bottom + LOWER_CORNERS[1].y}`,
    `${x + LOWER_CORNERS[0].x},${bottom + LOWER_CORNERS[0].y}`,
  ].join(' ')

// 地形は全員共通なので、形は一度だけ計算
const TILES = [...baseTiles]
  .sort((a, b) => a.pos.r - b.pos.r || a.pos.q - b.pos.q)
  .map((tile) => {
    const center = tileCenter(tile.pos)
    const terrain = terrainOf(tile)
    const bottom = center.y + THICKNESS
    const top = bottom - tileHeight({ pos: tile.pos, terrain, elevation: elevationOf(tile) }) * THICKNESS
    return {
      tile,
      key: axialKey(tile.pos),
      center,
      terrain,
      topY: top,
      surface: [center.x, top] as Point, // 天面の中心。建物や配管はここに立つ
      top: topPoints({ x: center.x, y: top }),
      side: sidePoints(center.x, top, bottom),
      shade: shadePoints(center.x, top, bottom),
    }
  })
const CENTERS = new Map(TILES.map((t) => [t.key, t.center]))
const SURFACES = new Map(TILES.map((t) => [t.key, t.surface]))
const TOWER_KEY = axialKey(TOWER_POS)

const HALF_W = (Math.sqrt(3) / 2) * SIZE
const HALF_H = SIZE * SQUASH
const MIN_X = Math.min(...TILES.map((t) => t.center.x)) - HALF_W - PADDING
const MIN_Y = Math.min(...TILES.map((t) => t.topY)) - HALF_H - PADDING
const WIDTH = Math.max(...TILES.map((t) => t.center.x)) + HALF_W + PADDING - MIN_X
const HEIGHT = Math.max(...TILES.map((t) => t.center.y)) + HALF_H + THICKNESS + PADDING - MIN_Y

// 盤面の左上を原点にした座標
function local(key: string): Pixel {
  const c = CENTERS.get(key)!
  return { x: c.x - MIN_X, y: c.y - MIN_Y }
}

// 押して詳細を出せるマス
const isSelectable = (tile: BaseTile) => tile.kind !== 'blocked'

function artOf(tile: BaseTile, building: BaseBuilding | undefined): ArtKind | null {
  if (tile.kind === 'tower') return 'tower'
  if (tile.kind === 'refinery') return 'refinery'
  if (building && building.kind !== 'pipe') return building.kind
  return null
}

// 配管でつながっている隣のマス（配管と暖房塔）
function pipeLinks(board: Record<string, BaseBuilding>, key: string): string[] {
  return neighbors(keyToAxial(key))
    .map(axialKey)
    .filter((k) => k === TOWER_KEY || board[k]?.kind === 'pipe')
}

// 暖房塔から配管をたどった段数。熱の流れる向きに使う
function pipeDepths(board: Record<string, BaseBuilding>, analysis: BaseAnalysis): Map<string, number> {
  const depths = new Map([[TOWER_KEY, 0]])
  const queue = [TOWER_KEY]
  while (queue.length > 0) {
    const key = queue.shift()!
    for (const n of neighbors(keyToAxial(key))) {
      const k = axialKey(n)
      if (depths.has(k) || board[k]?.kind !== 'pipe' || !analysis.buildings[k]?.active) continue
      depths.set(k, depths.get(key)! + 1)
      queue.push(k)
    }
  }
  return depths
}

// 2つのマスの間の辺の中点
function edgeMid(a: string, b: string): Point {
  const p = SURFACES.get(a)!
  const q = SURFACES.get(b)!
  return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]
}

// 基地のキャラの一覧を開いている間だけ、ちび絵を持ち上げて動かせる
export interface BoardMemberDrag {
  grab: (id: string) => DragHandlers
  heldId: string | null // 持ち上げているキャラ。元の場所では薄くする
  onPick: (id: string) => void // 押したときはマスではなくキャラを選ぶ
}

function MemberSprite({
  member,
  onSelect,
  drag,
}: {
  member: BoardMember
  onSelect: (key: string) => void
  drag?: BoardMemberDrag
}) {
  const img = <img className="base-member-chibi" src={chibiUrl(member.id)} alt="" draggable={false} />
  const state = `${drag ? ' is-grabbable' : ''}${drag?.heldId === member.id ? ' is-held' : ''}`
  const events = drag
    ? { ...drag.grab(member.id), onClick: () => drag.onPick(member.id) }
    : { onClick: () => onSelect(member.key) }

  // 持ち上げている間は、運んでいるキャラも立っているマスに戻す。歩いた先を立ち位置と見間違えないように
  if (!member.carry || drag?.heldId) {
    const p = local(member.key)
    return (
      <div
        className={`base-member${state}`}
        data-key={member.key}
        data-selectable
        style={{ transform: `translate(${p.x}px, ${p.y + FOOT_OFFSET}px)` }}
        {...events}
      >
        <div className="base-member-body">{img}</div>
      </div>
    )
  }

  // 建物と貯蔵庫の間を行き来する。行きは素材を持つ
  const a = local(member.carry.from)
  const b = local(member.carry.to)
  const walkSeconds = Math.hypot(b.x - a.x, b.y - a.y) / WALK_SPEED
  const style = {
    '--ax': `${a.x}px`,
    '--ay': `${a.y + FOOT_OFFSET}px`,
    '--bx': `${b.x}px`,
    '--by': `${b.y + FOOT_OFFSET}px`,
    '--face': b.x >= a.x ? 1 : -1,
    '--dur': `${Math.max(3, (walkSeconds * 2) / 0.76)}s`,
  } as CSSProperties
  return (
    <div className={`base-member is-carrying${state}`} data-selectable style={style} {...events}>
      <div className="base-member-body">
        <ItemIcon item={items[member.carry.itemId]} className="base-member-load" />
        {img}
      </div>
    </div>
  )
}

interface Props {
  base: BaseRow
  analysis: BaseAnalysis
  stocks: Map<string, Stock>
  members: BoardMember[]
  selectedKey: string | null
  rangeKeys: Set<string> // 作業範囲を枠で示すマス
  onSelect: (key: string) => void
  memberDrag?: BoardMemberDrag
  forecast?: MemberForecast | null // 持ち上げたキャラを吸着中のマスに立たせたときの見込み
}

export interface MemberForecast {
  buildings: BuildingForecast[]
  hoursLabel: string // {0}→{1}h
  wakesLabel: string // 動き出す
}

// 見込みの札。影響を受ける建物の上に出す
function ForecastTag({ f, art, forecast }: { f: BuildingForecast; art: ArtKind; forecast: MemberForecast }) {
  const [x, y] = SURFACES.get(f.key)!
  return (
    <div className="base-forecast" style={{ left: x - MIN_X, top: y - MIN_Y + ART_TOP[art] - STOCK_GAP }}>
      {f.wakes && <span className="is-warm">{forecast.wakesLabel}</span>}
      {f.speed !== undefined && <span className="is-speed">+{Math.round(f.speed * 100)}%</span>}
      {f.hours && <span className="is-carry">{fill(forecast.hoursLabel, ...f.hours)}</span>}
    </div>
  )
}

// 基地の盤面
export default function BaseBoard({
  base,
  analysis,
  stocks,
  members,
  selectedKey,
  rangeKeys,
  onSelect,
  memberDrag,
  forecast,
}: Props) {
  const board = base.base_board
  const depths = pipeDepths(board, analysis)

  return (
    <div className="base-board" style={{ width: WIDTH, height: HEIGHT }}>
      <svg
        className="base-board-svg"
        width={WIDTH}
        height={HEIGHT}
        viewBox={`${MIN_X} ${MIN_Y} ${WIDTH} ${HEIGHT}`}
        aria-hidden
      >
        <TerrainDefs />
        <defs>
          <radialGradient id="base-warm-glow">
            <stop offset="0%" stopColor="#ffb66b" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#ff8a3d" stopOpacity={0.12} />
          </radialGradient>
          <radialGradient id="base-ore-glow">
            <stop offset="0%" stopColor="#8fdcff" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#8fdcff" stopOpacity={0} />
          </radialGradient>
          {/* ホロの走査線。動いている物は水色、熱の元は橙 */}
          <pattern id="base-scan-cool" patternUnits="userSpaceOnUse" width={4} height={4}>
            <rect width={4} height={4} fill="rgba(127,224,255,0.05)" />
            <rect width={4} height={1.3} fill="rgba(127,224,255,0.28)" />
          </pattern>
          <pattern id="base-scan-warm" patternUnits="userSpaceOnUse" width={4} height={4}>
            <rect width={4} height={4} fill="rgba(255,170,90,0.06)" />
            <rect width={4} height={1.3} fill="rgba(255,190,120,0.32)" />
          </pattern>
          {/* 範囲は盤面全体。管の外接矩形を使うと、真横の管は高さが 0 で光ごと消える */}
          <filter id="base-glow" filterUnits="userSpaceOnUse" x={MIN_X} y={MIN_Y} width={WIDTH} height={HEIGHT}>
            <feGaussianBlur stdDeviation={2.5} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* マス */}
        {TILES.map(({ tile, key, terrain, top, side, shade }) => {
          const heated = tile.kind === 'ice' || tile.kind === 'resource'
          const dark = (tile.kind === 'ice' || tile.kind === 'blocked') && !analysis.warm.has(key)
          const className = [
            'base-tile',
            `is-${tile.kind}`,
            heated && (analysis.warm.has(key) ? 'is-warm' : 'is-cold'),
            isSelectable(tile) && 'is-selectable',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <g
              key={key}
              className={className}
              data-key={key}
              data-selectable={isSelectable(tile) || undefined}
              onClick={isSelectable(tile) ? () => onSelect(key) : undefined}
            >
              <polygon className="base-tile-side" points={side} fill={TERRAIN_STYLES[terrain].side} />
              <polygon className="base-tile-shade" points={shade} />
              <polygon className="base-tile-top" points={top} fill={terrainFill(terrain)} />
              {dark && (
                <>
                  <polygon className="base-tile-night-side" points={side} />
                  <polygon className="base-tile-night" points={top} />
                </>
              )}
              {(heated || tile.kind === 'blocked') && analysis.warm.has(key) && (
                <polygon className="base-tile-glow" points={top} />
              )}
            </g>
          )
        })}

        {/* 作業範囲と選んでいるマス */}
        {TILES.filter(({ key }) => rangeKeys.has(key)).map(({ key, top }) => (
          <polygon key={key} className="base-tile-outline is-range" points={top} />
        ))}
        {TILES.filter(({ key }) => key === selectedKey).map(({ key, top }) => (
          <polygon key={key} className="base-tile-outline is-selected" points={top} />
        ))}

        {/* 配管・建物・鉱脈 */}
        {TILES.map(({ tile, key, surface }) => {
          const building = board[key]
          if (building?.kind === 'pipe') {
            const hot = analysis.buildings[key]?.active ?? false
            const depth = depths.get(key) ?? 0
            return (
              <g key={key} className="base-pipe-tile">
                {pipeLinks(board, key).map((k) => (
                  <PipeHalf
                    key={k}
                    from={surface}
                    to={edgeMid(key, k)}
                    hot={hot}
                    outward={hot && (depths.get(k) ?? 0) > depth}
                    toTower={k === TOWER_KEY}
                  />
                ))}
                <PipeHub at={surface} hot={hot} />
              </g>
            )
          }
          const art = artOf(tile, building)
          if (art) {
            const idle = building !== undefined && !analysis.buildings[key]?.active
            return (
              <g
                key={key}
                className={`base-art is-${art}${idle ? ' is-idle' : ''}`}
                data-key={key}
                transform={`translate(${surface[0]}, ${surface[1]})`}
                data-selectable={isSelectable(tile) || undefined}
                onClick={isSelectable(tile) ? () => onSelect(key) : undefined}
              >
                <BuildingArt kind={art} />
              </g>
            )
          }
          if (tile.kind === 'resource') {
            return (
              <g key={key} transform={`translate(${surface[0]}, ${surface[1]})`}>
                <OreArt step={gradeStep(resourceGrade(tile.pos)) === 2 ? 2 : 1} cold={!analysis.warm.has(key)} />
              </g>
            )
          }
          return null
        })}
      </svg>

      {/* 貯まっている数 */}
      <div className="base-board-overlay">
        {/* 持ち上げている間は、貯まった数の代わりに見込みを出す */}
        {forecast?.buildings.map((f) => <ForecastTag key={f.key} f={f} art={board[f.key].kind as ArtKind} forecast={forecast} />)}
        {!memberDrag?.heldId && [...stocks.values()].map((s) => {
          const [x, y] = SURFACES.get(s.key)!
          const art = s.status.building.kind as ArtKind
          return (
            <div
              key={s.key}
              className={`base-stock${s.full ? ' is-full' : ''}`}
              style={{ left: x - MIN_X, top: y - MIN_Y + ART_TOP[art] - STOCK_GAP, '--ratio': s.next } as CSSProperties}
            >
              <span className="base-stock-ring">
                <span className="base-stock-face">
                  <ItemIcon item={items[s.itemId]} className="base-stock-icon" />
                </span>
              </span>
              <b>{s.count}</b>
            </div>
          )
        })}

        {/* キャラ */}
        {members.map((m) => (
          <MemberSprite key={m.id} member={m} onSelect={onSelect} drag={memberDrag} />
        ))}
      </div>
    </div>
  )
}
