import type { JSX } from 'react'
import { ART_TOP, boxDims, EMBLEMS, faceQuad, lerp, onLeft, onRight, onTop, pts, ring, SQUASH } from './art'
import type { ArtKind, BoxDims, Point } from './art'
import { Band, Beam, Box, Cylinder, Dome, Frustum, Gable, HexPrism, Line, Shard } from './shapes'

// 建物の土台
const Foundation = () => <HexPrism r={50} h={7} y={0} />

// 煙。3つの塊がずれて昇る
function Smoke({ x, y, big = false }: { x: number; y: number; big?: boolean }) {
  return (
    <g className={`art-smoke${big ? ' is-big' : ''}`} transform={`translate(${x},${y})`}>
      {[0, 1, 2].map((i) => (
        <circle key={i} r={big ? 9 : 6} style={{ animationDelay: `${-i * (big ? 1.3 : 1.1)}s` }} />
      ))}
    </g>
  )
}

function Sparks({ x, y }: { x: number; y: number }) {
  return (
    <g className="art-sparks" transform={`translate(${x},${y})`}>
      {[[-4, 0], [3, 0.5], [0, 1.1], [5, 1.6], [-2, 2]].map(([dx, delay]) => (
        <circle key={delay} cx={dx} r={1.6} style={{ animationDelay: `${-delay}s` }} />
      ))}
    </g>
  )
}

// 円柱の帯に打った鋲
function Studs({ r, y }: { r: number; y: number }) {
  return (
    <>
      {[-0.75, -0.4, 0, 0.4, 0.75].map((c) => (
        <circle key={c} cx={r * c} cy={y + r * SQUASH * Math.sqrt(1 - c * c)} r={1.6} />
      ))}
    </>
  )
}

// 暖房塔。石の台座に鉄の炉、煙突から火の粉
function Tower() {
  return (
    <>
      <g className="art-body">
        <HexPrism r={60} h={10} y={0} />
        <HexPrism r={47} h={8} y={-10} />
        <ellipse className="art-heat-ring" cx={0} cy={-18} rx={44} ry={44 * SQUASH} />
        {/* 左右の配管が台座へ下りる */}
        <path className="art-stub" d="M-28,-44 H-40 Q-44,-44 -44,-40 V-16" />
        <path className="art-stub" d="M28,-44 H40 Q44,-44 44,-40 V-16" />
        <Cylinder r={30} h={56} y={-18} />
        <Band r={32} h={5} y={-20} />
        <Studs r={32} y={-22.5} />
        <Band r={32} h={5} y={-66} />
        <Studs r={32} y={-68.5} />
        {/* 火室。格子越しに火が見える */}
        <path className="art-fire" d="M-13,-12 V-34 Q-13,-46 0,-46 Q13,-46 13,-34 V-12 Q0,-9 -13,-12Z" />
        {[-7, 0, 7].map((x) => (
          <line key={x} x1={x} y1={x ? -42 : -46} x2={x} y2={-10} />
        ))}
        <path className="art-rim" d="M-15,-11 V-34 Q-15,-48 0,-48 Q15,-48 15,-34 V-11" />
        <Frustum r1={30} r2={15} h={16} y={-74} />
        <Cylinder r={11} h={40} y={-90} />
        <Band r={13} h={6} y={-124} />
        <ellipse className="art-fire" cx={0} cy={-130} rx={9} ry={9 * SQUASH} />
        <Smoke x={0} y={-136} big />
        <Sparks x={0} y={-134} />
      </g>
    </>
  )
}

// 精錬所。れんがの窯と煙突
function Refinery() {
  return (
    <>
      <g className="art-body">
        <Foundation />
        <Box b={boxDims(8, 60, 18, -16)} />
        <Box b={boxDims(10, 5, 18, -74)} />
        <Smoke x={18} y={-84} />
        <Cylinder r={28} h={14} y={-7} />
        <Dome r={28} hd={30} y={-21} />
        <path className="art-fire" d="M-11,12 V-2 Q-11,-13 0,-13 Q11,-13 11,-2 V12 Q0,15 -11,12Z" />
        <path className="art-rim" d="M-13,13 V-2 Q-13,-15 0,-15 Q13,-15 13,-2 V13" />
        {/* 延べ棒 */}
        <Box b={boxDims(8, 4, -33, 10)} />
        <Box b={boxDims(8, 4, -27, 15)} />
        <Box b={boxDims(8, 4, -30, 10)} />
      </g>
    </>
  )
}

// 採掘場。鉄骨の櫓と巻上げ小屋、掘った結晶の山
function Mine() {
  const apex: Point = [0, -90]
  const legs = ring(27, -9)
  const at = (leg: number, t: number) => lerp(legs[leg], apex, t)
  const leg = (i: number, w: number) => (
    <>
      <Beam a={legs[i]} b={apex} w={w} />
      <Beam a={lerp(legs[i], apex, 0.02)} b={lerp(legs[i], apex, 0.96)} w={1.6} />
    </>
  )
  const house = boxDims(12, 16, -27, -14)
  const lamp = at(3, 0.5)
  return (
    <>
      <g className="art-body">
        <Foundation />
        <Box b={house} />
        <polygon className="art-window" points={pts(faceQuad(onRight, house, 0.3, 0.75, 0.3, 0.65))} />
        <polygon
          points={pts([
            onTop(house, -0.15, -0.15, -2),
            onTop(house, 1.15, -0.15, -2),
            onTop(house, 1.15, 1.15, -2),
            onTop(house, -0.15, 1.15, -2),
          ])}
        />
        <Line a={onTop(house, 1, 0.5)} b={[0, -78]} />
        <HexPrism r={22} h={5} y={-7} />
        <polygon points={pts(ring(14, -12))} />
        {leg(5, 6)}
        <Line a={[0, -78]} b={[0, -12]} />
        <g className="art-bucket">
          <Box b={boxDims(5, 8, 0, -24)} />
        </g>
        {leg(3, 7)}
        {leg(1, 7)}
        <Beam a={at(3, 0.3)} b={at(1, 0.3)} w={4} />
        <Beam a={at(3, 0.6)} b={at(1, 0.6)} w={3.4} />
        <Beam a={at(3, 0.3)} b={at(1, 0.6)} w={2.6} />
        <Beam a={at(1, 0.3)} b={at(3, 0.6)} w={2.6} />
        <circle className="art-window" cx={lamp[0] - 5} cy={lamp[1]} r={3.4} />
        {/* 滑車 */}
        <g transform="translate(0,-90)">
          <g className="art-spin">
            <circle r={12} />
            {[0, 60, 120].map((d) => {
              const r = (d * Math.PI) / 180
              return <Line key={d} a={[-12 * Math.cos(r), -12 * Math.sin(r)]} b={[12 * Math.cos(r), 12 * Math.sin(r)]} />
            })}
          </g>
          <circle r={3.4} />
        </g>
        <Shard x={22} y={12} w={9} h={22} tilt={2} />
        <Shard x={31} y={8} w={7} h={14} tilt={4} />
        <Shard x={15} y={17} w={7} h={12} tilt={-3} />
        {/* トロッコ */}
        <Line a={[-40, 12]} b={[-14, 1]} />
        <Line a={[-34, 17]} b={[-8, 6]} />
        <Box b={boxDims(11, 7, -26, 13)} />
        <Shard x={-29} y={5} w={6} h={9} tilt={-1} />
        <Shard x={-23} y={6} w={6} h={11} tilt={2} />
        <ellipse cx={-34} cy={15} rx={2.6} ry={3} />
        <ellipse cx={-20} cy={21} rx={2.6} ry={3} />
      </g>
    </>
  )
}

// 書庫。漆喰の壁に切妻屋根、灯りのついた窓
function Library() {
  const b = boxDims(33, 28, -1, -7)
  const win = (on: typeof onLeft, u0: number, u1: number) => (
    <>
      <polygon className="art-window" points={pts(faceQuad(on, b, u0, u1, 0.26, 0.62))} />
      <Line a={on(b, (u0 + u1) / 2, 0.26)} b={on(b, (u0 + u1) / 2, 0.62)} />
      <Line a={on(b, u0, 0.44)} b={on(b, u1, 0.44)} />
    </>
  )
  const chimney = onTop(b, 0.28, 0.72, 12)
  const oculus = onTop(b, 1, 0.5, 9)
  const lamp = onLeft(b, 0.36, 0.4)
  return (
    <>
      <g className="art-body">
        <Foundation />
        <Box b={boxDims(6, 22, chimney[0], chimney[1] + 6)} />
        <Smoke x={chimney[0]} y={chimney[1] - 22} />
        <Box b={b} />
        <polygon points={pts(faceQuad(onLeft, b, 0, 1, 0.84, 1))} />
        <polygon points={pts(faceQuad(onRight, b, 0, 1, 0.84, 1))} />
        {win(onLeft, 0.1, 0.3)}
        <polygon points={pts(faceQuad(onLeft, b, 0.42, 0.62, 0.34, 1))} />
        {win(onLeft, 0.74, 0.92)}
        {win(onRight, 0.2, 0.42)}
        {win(onRight, 0.58, 0.8)}
        {/* 柱と梁 */}
        <Line a={onLeft(b, 0, 0)} b={onLeft(b, 0, 1)} />
        <Line a={onLeft(b, 1, 0)} b={onLeft(b, 1, 1)} />
        <Line a={onRight(b, 1, 0)} b={onRight(b, 1, 1)} />
        <Line a={onLeft(b, 0, 0.12)} b={onLeft(b, 1, 0.12)} />
        <Line a={onRight(b, 0, 0.12)} b={onRight(b, 1, 0.12)} />
        <Gable b={b} rh={24} o={0.14} />
        <ellipse className="art-window" cx={oculus[0] + 1} cy={oculus[1]} rx={3.6} ry={4.4} />
        <circle className="art-window" cx={lamp[0]} cy={lamp[1]} r={3} />
      </g>
    </>
  )
}

// 貯蔵庫。かまぼこ屋根の倉庫と木箱
function Storage() {
  const b: BoxDims = { w: 36, d: 15, h: 0, x: -3, y: -7 }
  const R = 25
  const N = 12
  // 屋根の上の点。th は手前の地面から奥の地面までの角度
  const at = (s: number, th: number): Point => {
    const p = onTop(b, s, 0.5 + 0.5 * Math.cos(th))
    return [p[0], p[1] - R * Math.sin(th)]
  }
  const center = onTop(b, 1, 0.5)
  const door = Array.from({ length: 9 }, (_, i): Point => {
    const [x, y] = at(1, (Math.PI * (i + 2)) / 12)
    return [center[0] + (x - center[0]) * 0.62, center[1] + (y - center[1]) * 0.7]
  })
  return (
    <>
      <g className="art-body">
        <Foundation />
        {/* 奥の帯から順に描く */}
        {Array.from({ length: N }, (_, i) => {
          const t0 = (Math.PI * i) / N
          const t1 = (Math.PI * (i + 1)) / N
          return <polygon key={i} points={pts([at(0, t0), at(0, t1), at(1, t1), at(1, t0)])} />
        })}
        <polygon points={pts(Array.from({ length: N + 1 }, (_, i) => at(1, (Math.PI * i) / N)))} />
        <polygon points={pts(door)} />
        <polygon className="art-window" points={pts([door[0], door[door.length - 1], lerp(door[door.length - 1], door[0], 0.5)])} />
        <Box b={boxDims(9, 9, -36, 6)} />
        <Box b={boxDims(7, 7, -36, -3)} />
        <Box b={boxDims(8, 8, -22, 14)} />
        <Cylinder r={5} h={11} y={20} x={30} />
        <Cylinder r={5} h={11} y={24} x={20} />
      </g>
    </>
  )
}

const ARTS: Record<ArtKind, () => JSX.Element> = {
  tower: Tower,
  refinery: Refinery,
  mine: Mine,
  library: Library,
  storage: Storage,
}

const EMBLEM_PLATE = pts(ring(17, 0).map(([x, y]): Point => [x, y / SQUASH]))

// 建物の絵。原点がマスの天面の中心
export default function BuildingArt({ kind }: { kind: ArtKind }) {
  const Art = ARTS[kind]
  return (
    <>
      <Art />
      <g className="art-emblem" transform={`translate(0,${ART_TOP[kind] + 14})`}>
        <g className="art-emblem-bob">
          <polygon className="art-emblem-plate" points={EMBLEM_PLATE} />
          <path className="art-emblem-icon" transform="translate(-12,-12)" d={EMBLEMS[kind]} />
        </g>
      </g>
    </>
  )
}
