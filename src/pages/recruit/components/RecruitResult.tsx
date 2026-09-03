import type { CSSProperties } from 'react'
import { useTranslations } from '../../../i18n'
import { characterMasters } from '../../../data/characters'
import { RARITIES } from '../../../data/characters/const'
import type { Rarity } from '../../../data/characters/types'
import type { AcquireResult } from '../../../stores/characterStore'
import { formatCompact } from '../../../utils/format'
import ViewportLayer from '../../../layouts/ViewportLayer'

// i18n。キャラ名は characters.json にある
const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).map((c) => [c.nameKey, c.nameKey]),
)

// 六角セル1枚の大きさ。この比率のとき clip-path が正六角形になる
const CELL_W = 208
const CELL_H = 240
// 隣接セルの間隔。ハニカムの刻み幅に 6px ほど隙間を足したもの
const STEP_X = 214
const STEP_Y = 185
// 結果の背後に敷く空セルの盤
const GRID_ROWS = 4
const GRID_COLS = 7
// 1段に並べるセルの数
const PER_ROW = 5

interface Point {
  x: number
  y: number
}

// 盤の row 段 col 列目の位置
const slot = (row: number, col: number): Point => ({
  x: col * STEP_X + (row % 2) * (STEP_X / 2), // 奇数段は半分右にずれる
  y: row * STEP_Y,
})

// count 体ぶんのマス目。盤の2段目から、段ごとに中央へ寄せて並べる
function slotsFor(count: number): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const row = 1 + Math.floor(i / PER_ROW)
    const inRow = Math.min(PER_ROW, count - Math.floor(i / PER_ROW) * PER_ROW)
    // 奇数段は既に半マスずれているので、1列手前から始める
    const start = Math.floor((GRID_COLS - inRow) / 2) - (row % 2)
    return slot(row, start + (i % PER_ROW))
  })
}

// 表示の順番計算
function igniteOrder(points: Point[]): number[] {
  const cx = points.reduce((sum, p) => sum + p.x, 0) / points.length
  const cy = points.reduce((sum, p) => sum + p.y, 0) / points.length

  const rank: number[] = []
  points
    .map((p, i) => ({ i, distance: Math.hypot(p.x - cx, p.y - cy) }))
    .sort((a, b) => a.distance - b.distance)
    .forEach((entry, order) => (rank[entry.i] = order))
  return rank
}

// SVG用
const hexPoints = ({ x, y }: Point) =>
  [
    [x + CELL_W / 2, y],
    [x + CELL_W, y + CELL_H * 0.25],
    [x + CELL_W, y + CELL_H * 0.75],
    [x + CELL_W / 2, y + CELL_H],
    [x, y + CELL_H * 0.75],
    [x, y + CELL_H * 0.25],
  ]
    .map(([px, py]) => `${px},${py}`)
    .join(' ')

// 引いた1体ぶんの結果
export interface PullOutcome {
  masterId: string
  rarity: Rarity
  kind: AcquireResult
  currency: number // 凸上限で変換して得た通貨。kind が convert 以外なら0
}

interface RecruitResultProps {
  outcomes: PullOutcome[]
  onClose: () => void
}

export default function RecruitResult({ outcomes, onClose }: RecruitResultProps) {
  const tCharacter = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)

  const points = slotsFor(outcomes.length)
  const rank = igniteOrder(points)

  // 立ち絵は最高レア1体
  const hero = outcomes.reduce((best, o) => (o.rarity > best.rarity ? o : best), outcomes[0])
  const heroMaster = characterMasters[hero.masterId]

  return (
    <div
      className="recruit-result fade-in"
      // セルの枚数
      style={{ '--n': outcomes.length } as CSSProperties}
    >
      <div className="recruit-result-stage">
        {/* 空セル */}
        <svg
          className="recruit-comb-grid"
          width={(GRID_COLS - 1) * STEP_X + STEP_X / 2 + CELL_W}
          height={(GRID_ROWS - 1) * STEP_Y + CELL_H}
        >
          {Array.from({ length: GRID_ROWS }, (_, row) =>
            Array.from({ length: GRID_COLS }, (_, col) => (
              <polygon key={`${row}-${col}`} points={hexPoints(slot(row, col))} />
            )),
          )}
        </svg>

        <div className={`recruit-hero is-rarity-${hero.rarity}`}>
          <span className="recruit-hero-mark" />
          <span className="recruit-hero-glow" />
          <img
            className="recruit-hero-art"
            src={`${import.meta.env.BASE_URL}images/character/full_body/${heroMaster.id}.png`}
            alt={tCharacter[heroMaster.nameKey]}
          />

          <div className="recruit-hero-plate">
            <p className="recruit-hero-plate-stars">
              {RARITIES.map((rarity) => (
                <span
                  key={rarity}
                  className={`recruit-hero-plate-star${rarity <= hero.rarity ? '' : ' is-off'}`}
                >
                  ★
                </span>
              ))}
            </p>
            <p className="recruit-hero-plate-name">{tCharacter[heroMaster.nameKey]}</p>
          </div>
        </div>

        <div className="recruit-comb">
          {outcomes.map((outcome, i) => {
            const master = characterMasters[outcome.masterId]

            return (
              <div
                key={i}
                className={`recruit-cell is-rarity-${outcome.rarity} is-${outcome.kind}`}
                style={
                  {
                    '--x': `${points[i].x}px`,
                    '--y': `${points[i].y}px`,
                    '--i': rank[i],
                  } as CSSProperties
                }
              >
                <span className="recruit-cell-ring" />
                <span className="recruit-cell-rim" />
                <span className="recruit-cell-face">
                  <img
                    src={`${import.meta.env.BASE_URL}images/character/face/${master.id}.png`}
                    alt={tCharacter[master.nameKey]}
                  />
                </span>
                <span className="recruit-cell-veil" />

                <span className="recruit-cell-badge">
                  {outcome.kind === 'new' && 'NEW'}
                  {outcome.kind === 'dupe' && (
                    <>
                      <span className="recruit-cell-dupe-mark" />+1
                    </>
                  )}
                  {outcome.kind === 'convert' && (
                    <>
                      {/* ResourceBar の紙幣アイコンと同じ、2枚ずらし重ね */}
                      <span className="recruit-cell-bill">
                        <span className="recruit-cell-bill-back" />
                        <span className="recruit-cell-bill-front" />
                      </span>
                      +{formatCompact(outcome.currency)}
                    </>
                  )}
                </span>

                <span className="recruit-cell-stars">
                  {RARITIES.map((rarity) => (
                    <span
                      key={rarity}
                      className={`recruit-cell-star${rarity <= outcome.rarity ? '' : ' is-off'}`}
                    >
                      ★
                    </span>
                  ))}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="recruit-result-bar">
        <button type="button" className="recruit-result-close" onClick={onClose}>
          確認
        </button>
      </div>

      <ViewportLayer>
        <div className="recruit-result-bg fade-in" />
      </ViewportLayer>
    </div>
  )
}
