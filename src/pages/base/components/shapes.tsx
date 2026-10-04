// 盤面の絵の立体の部品
import { n1, onTop, pts, ring, SQUASH } from './art'
import type { BoxDims, Point } from './art'

export function Line({ a, b, className }: { a: Point; b: Point; className?: string }) {
  return <line className={className} x1={n1(a[0])} y1={n1(a[1])} x2={n1(b[0])} y2={n1(b[1])} />
}

// 六角柱。見えるのは天面と手前の2面。y は底面
export function HexPrism({ r, h, y, x = 0 }: { r: number; h: number; y: number; x?: number }) {
  const b = ring(r, y, x)
  const t = ring(r, y - h, x)
  return (
    <>
      <polygon points={pts([t[1], t[2], b[2], b[1]])} />
      <polygon points={pts([t[2], t[3], b[3], b[2]])} />
      <polygon className="is-top" points={pts(t)} />
    </>
  )
}

// 円柱。y は底面の中心
export function Cylinder({ r, h, y, x = 0 }: { r: number; h: number; y: number; x?: number }) {
  const top = y - h
  return (
    <>
      <path d={`M${n1(x - r)},${n1(top)}V${n1(y)}A${n1(r)},${n1(r * SQUASH)} 0 0 0 ${n1(x + r)},${n1(y)}V${n1(top)}Z`} />
      <ellipse className="is-top" cx={n1(x)} cy={n1(top)} rx={n1(r)} ry={n1(r * SQUASH)} />
    </>
  )
}

// 円柱に巻いた帯。手前の半分だけ
export function Band({ r, h, y }: { r: number; h: number; y: number }) {
  const ry = n1(r * SQUASH)
  return <path d={`M${-r},${n1(y - h)}A${r},${ry} 0 0 0 ${r},${n1(y - h)}V${n1(y)}A${r},${ry} 0 0 1 ${-r},${n1(y)}Z`} />
}

// 円錐台。下の半径 r1、上の半径 r2
export function Frustum({ r1, r2, h, y }: { r1: number; r2: number; h: number; y: number }) {
  const top = y - h
  return (
    <>
      <path d={`M${-r1},${n1(y)}A${r1},${n1(r1 * SQUASH)} 0 0 0 ${r1},${n1(y)}L${r2},${n1(top)}H${-r2}Z`} />
      <ellipse className="is-top" cx={0} cy={n1(top)} rx={r2} ry={n1(r2 * SQUASH)} />
    </>
  )
}

// 丸屋根。y は縁の中心、hd は高さ
export function Dome({ r, hd, y }: { r: number; hd: number; y: number }) {
  return <path d={`M${-r},${n1(y)}A${r},${n1(r * SQUASH)} 0 0 0 ${r},${n1(y)}A${r},${hd} 0 0 0 ${-r},${n1(y)}Z`} />
}

export function Box({ b }: { b: BoxDims }) {
  const { w, d, h, x, y } = b
  const t = y - h
  return (
    <>
      <polygon points={pts([[x - w, t], [x, t + d], [x, y + d], [x - w, y]])} />
      <polygon points={pts([[x + w, t], [x, t + d], [x, y + d], [x + w, y]])} />
      <polygon className="is-top" points={pts([[x, t - d], [x + w, t], [x, t + d], [x - w, t]])} />
    </>
  )
}

// 切妻屋根。棟は左の面と平行。rh は棟の高さ、o は軒の出
export function Gable({ b, rh, o }: { b: BoxDims; rh: number; o: number }) {
  const p = (s: number, t: number, l = 0) => onTop(b, s, t, l)
  const a = p(-o, 0.5, rh)
  const z = p(1 + o, 0.5, rh)
  const front: Point[] = [p(-o, -o), p(1 + o, -o)]
  return (
    <>
      <polygon points={pts([p(-o, 1 + o), p(1 + o, 1 + o), z, a])} />
      <polygon points={pts([p(1, 0), p(1, 1), p(1, 0.5, rh * 0.82)])} />
      <polygon points={pts([front[0], front[1], z, a])} />
      <polygon points={pts([front[0], front[1], [front[1][0], front[1][1] + 3], [front[0][0], front[0][1] + 3]])} />
    </>
  )
}

// 太さのある梁
export function Beam({ a, b, w }: { a: Point; b: Point; w: number }) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const l = Math.hypot(dx, dy)
  const px = (-dy / l) * (w / 2)
  const py = (dx / l) * (w / 2)
  return <polygon points={pts([[a[0] + px, a[1] + py], [b[0] + px, b[1] + py], [b[0] - px, b[1] - py], [a[0] - px, a[1] - py]])} />
}

// 結晶。(x, y) は根元
export function Shard({ x, y, w, h, tilt }: { x: number; y: number; w: number; h: number; tilt: number }) {
  const tip: Point = [x + tilt, y - h]
  const mid: Point = [x + tilt * 0.2, y + w * 0.28]
  return (
    <>
      <polygon points={pts([[x - w / 2, y], mid, tip])} />
      <polygon points={pts([mid, [x + w / 2, y], tip])} />
    </>
  )
}
