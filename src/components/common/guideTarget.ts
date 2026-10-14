// ガイド（Guide.tsx）が指す注目箇所の形と、実画面の座標への直し方

export type Point = [number, number]

// 背景オーバーレイに開ける穴。pts か ellipse のどちらか。ring があればその形で枠を描く
export interface GuideHole {
  pts?: Point[]
  ellipse?: [number, number, number, number] // cx, cy, rx, ry
  ring?: Point[]
}

// 実画面の座標に直した注目箇所
export interface GuideTarget {
  holes: GuideHole[]
  arrow: Point // 矢印の先端
  below?: boolean // 上に余白が無いので下から指す
  box?: DOMRect
  els?: Element[] // 押してよい要素。onMiss を渡したときだけ使う
}

// 画面の拡大率。ScreenFrame が :root に置いている
export const readScale = () =>
  Number(getComputedStyle(document.documentElement).getPropertyValue('--scale')) || 1

// タイルの天面の外接矩形から六角形（縦圧縮込みの pointy-top）を作る
export function hexShape(b: DOMRect, grow: number): Point[] {
  const x = b.left - grow
  const y = b.top - grow
  const w = b.width + grow * 2
  const h = b.height + grow * 2
  const cx = x + w / 2
  const cy = y + h / 2
  return [
    [cx + w / 2, cy - h / 4],
    [cx + w / 2, cy + h / 4],
    [cx, y + h],
    [cx - w / 2, cy + h / 4],
    [cx - w / 2, cy - h / 4],
    [cx, y],
  ]
}

// 右下を切り欠いた矩形。戦闘 UI のパネルと同じ形
function rectShape(b: DOMRect, pad: number, cut: number): Point[] {
  const x = b.left - pad
  const y = b.top - pad
  const w = b.width + pad * 2
  const h = b.height + pad * 2
  return [
    [x, y],
    [x + w, y],
    [x + w, y + h - cut],
    [x + w - cut, y + h],
    [x, y + h],
  ]
}

// data-guide 属性の付いた UI。上に余白が無ければ下から指す
export function uiTarget(name: string, scale: number): GuideTarget | null {
  const el = document.querySelector(`[data-guide="${name}"]`)
  if (!el) return null
  const b = el.getBoundingClientRect()
  const below = b.top < 130 * scale
  return {
    holes: [{ pts: rectShape(b, 14 * scale, 14 * scale), ring: rectShape(b, 10 * scale, 14 * scale) }],
    arrow: [b.left + b.width / 2, below ? b.bottom + 10 * scale : b.top - 10 * scale],
    below,
    box: b,
    els: [el],
  }
}
