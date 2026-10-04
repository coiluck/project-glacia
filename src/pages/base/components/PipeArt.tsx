import { lerp, pts, ring, SQUASH } from './art'
import type { Point } from './art'
import { HexPrism, Line } from './shapes'

const LIFT = 9 // 管を地面から浮かせる高さ

interface HalfProps {
  from: Point // マスの天面の中心
  to: Point // 隣のマスとの辺の中点
  hot: boolean // 暖房塔につながっている
  outward: boolean // 熱が中心から辺へ流れる
  toTower: boolean // 辺の先が暖房塔
}

// 配管のマスの中心から辺の中点までの管
export function PipeHalf({ from, to, hot, outward, toTower }: HalfProps) {
  const a: Point = [from[0], from[1] - LIFT]
  const m: Point = [to[0], to[1] - LIFT]
  const down = (p: Point): Point => [p[0], p[1] + 3]
  const len = Math.hypot(m[0] - a[0], m[1] - a[1])
  const nx = (-(m[1] - a[1]) / len) * 9
  const ny = ((m[0] - a[0]) / len) * 9 * SQUASH
  // 暖房塔の台座に隠れないよう、継ぎ目を少し手前にする
  const flange = toTower ? lerp(a, m, 0.86) : m
  const [flowFrom, flowTo] = outward ? [a, m] : [m, a]
  return (
    <g className={`base-pipe ${hot ? 'is-hot' : 'is-cut'}`}>
      <Line className="base-pipe-case" a={a} b={m} />
      <Line className="base-pipe-body" a={a} b={m} />
      {hot && (
        <>
          <Line className="base-pipe-glow" a={down(a)} b={down(m)} />
          <Line className="base-pipe-flow" a={down(flowFrom)} b={down(flowTo)} />
        </>
      )}
      <Line className="base-pipe-flange" a={[flange[0] + nx, flange[1] + ny]} b={[flange[0] - nx, flange[1] - ny]} />
    </g>
  )
}

// 配管のマスの中心に置く放熱器
export function PipeHub({ at, hot }: { at: Point; hot: boolean }) {
  const top = -15
  const lo = ring(17, -5)
  const hi = ring(17, -9)
  return (
    <g className={`base-pipe-hub ${hot ? 'is-hot' : 'is-cut'}`} transform={`translate(${at[0]},${at[1]})`}>
      <HexPrism r={17} h={17} y={2} />
      <polygon points={pts([lo[1], lo[2], hi[2], hi[1]])} />
      <polygon points={pts([lo[2], lo[3], hi[3], hi[2]])} />
      <polygon className="base-pipe-grate" points={pts(ring(12, top))} />
      {[-6, 0, 6].map((x) => (
        <Line key={x} a={[x - 3, top - 5]} b={[x + 3, top + 5]} />
      ))}
    </g>
  )
}
