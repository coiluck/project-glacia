import { axialKey, hexCorners, hexToPixel } from '../../features/battle/hex'
import type { Axial } from '../../features/battle/hex'

// スキルの効果範囲を示すHEXグリッド。
// 戦闘盤面（縦圧縮＋厚みのある俯瞰）と違い、真上から見た正六角形で描く。

const ORIGIN: Axial = { q: 0, r: 0 }

// size に対する比率。タイルを少し縮めて隙間を作る
const GAP_RATIO = 0.12
const STROKE_RATIO = 0.09
const PADDING_RATIO = 0.06 // 枠線が viewBox の端で切れないための余白

interface AttackRangeHexProps {
  // 効果が及ぶマス（術者を原点とした相対座標）。原点が含まれていても構わない
  tiles: Axial[]
  size: number // 六角形の中心から頂点までの距離（px）。CSS で width/height を上書きしてもいい
}

export default function AttackRangeHex({ tiles, size }: AttackRangeHexProps) {
  // 自分のマスは塗りつぶしで別に描くので、枠線側からは除く
  const outline = tiles.filter((c) => c.q !== 0 || c.r !== 0)

  // 全タイル共通の頂点。中心が原点なので translate するだけで置ける
  const points = hexCorners(size * (1 - GAP_RATIO))
    .map((c) => `${c.x},${c.y}`)
    .join(' ')

  const stroke = size * STROKE_RATIO
  const centers = [ORIGIN, ...outline].map((c) => hexToPixel(c, size))
  // pointy-top なので横は size*√3/2、縦は size ぶん張り出す
  const halfW = (Math.sqrt(3) / 2) * size
  const padding = stroke / 2 + size * PADDING_RATIO
  const minX = Math.min(...centers.map((c) => c.x)) - halfW - padding
  const minY = Math.min(...centers.map((c) => c.y)) - size - padding
  const width = Math.max(...centers.map((c) => c.x)) + halfW + padding - minX
  const height = Math.max(...centers.map((c) => c.y)) + size + padding - minY

  return (
    <svg
      className="attack-range-hex"
      width={width}
      height={height}
      viewBox={`${minX} ${minY} ${width} ${height}`}
      aria-hidden
    >
      {outline.map((c) => {
        const p = hexToPixel(c, size)
        return (
          <polygon
            key={axialKey(c)}
            className="attack-range-hex-tile"
            points={points}
            strokeWidth={stroke}
            transform={`translate(${p.x} ${p.y})`}
          />
        )
      })}

      {/* 自分のいるマス */}
      <polygon className="attack-range-hex-origin" points={points} />
    </svg>
  )
}
