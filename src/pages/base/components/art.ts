// 盤面の絵の座標の計算。原点はマスの天面の中心で、y は下が正
import type { BaseBuildingKind } from '../../../data/base'

export const SQUASH = 0.72 // 見下ろした形にする縦圧縮

export type Point = [number, number]

export const n1 = (v: number) => Math.round(v * 10) / 10
export const pts = (list: Point[]) => list.map(([x, y]) => `${n1(x)},${n1(y)}`).join(' ')
export const lerp = (a: Point, b: Point, t: number): Point => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]

// 半径 r の六角形の頂点。0 が右上で時計回り
export const ring = (r: number, y: number, x = 0): Point[] =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30)
    return [x + r * Math.cos(a), y + r * Math.sin(a) * SQUASH]
  })

// 箱。天面はマスの辺に沿ったひし形。(x, y) は底面の中心
export interface BoxDims {
  w: number
  d: number
  h: number
  x: number
  y: number
}
export const boxDims = (w: number, h: number, x = 0, y = 0): BoxDims => ({ w, d: w * 0.416, h, x, y })

// 箱の左右の面の上の点。u は横（0→1）、v は上から下（0→1）
export const onLeft = (b: BoxDims, u: number, v: number): Point => [b.x - b.w + u * b.w, b.y - b.h + u * b.d + v * b.h]
export const onRight = (b: BoxDims, u: number, v: number): Point => [b.x + u * b.w, b.y - b.h + b.d - u * b.d + v * b.h]
export const faceQuad = (on: typeof onLeft, b: BoxDims, u0: number, u1: number, v0: number, v1: number): Point[] => [
  on(b, u0, v0),
  on(b, u1, v0),
  on(b, u1, v1),
  on(b, u0, v1),
]
// 天面の上の点。s は左の角→手前の角、t は手前の角→右の角
export const onTop = (b: BoxDims, s: number, t: number, lift = 0): Point => [
  b.x - b.w + (s + t) * b.w,
  b.y - b.h + (s - t) * b.d - lift,
]

// 盤面に立つ物。配管は PipeArt が描く
export type ArtKind = Exclude<BaseBuildingKind, 'pipe'> | 'tower' | 'refinery'

// 絵の一番上の高さ。印や貯まった数の札はこの上に出す
export const ART_TOP: Record<ArtKind, number> = {
  tower: -150,
  refinery: -92,
  mine: -102,
  library: -84,
  storage: -58,
}

// 絵の上に浮かぶ印
export const EMBLEMS: Record<ArtKind, string> = {
  tower: 'M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8Z',
  mine: 'M5 19 14 10 M7 5c4-2 9-1 12 2-3-1-7-.5-9 1.5 M13 9l2 2',
  library: 'M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4Z M20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6Z',
  storage: 'M4 8 12 4l8 4v8l-8 4-8-4Z M4 8l8 4 8-4 M12 12v8',
  refinery: 'M9 3h6 M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3 M7 15h10',
}
