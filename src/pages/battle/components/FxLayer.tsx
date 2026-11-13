import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import type { Axial, Pixel } from '../../../features/battle/hex'
import type { FxBatch, FxHit } from '../attackFx'

// タイル中心からちびキャラの胴までの高さ。飛び道具と着弾はここを狙う
const BODY_Y = 70
// 数字はタイル中心からこの高さ（頭の上）に出す
const NUMBER_Y = 160
// 回復の光の粒の横位置
const HEAL_MOTES = [-28, -8, 14, 30]
// 火花の向き。攻撃の向きの逆側へ散らす
const SPARK_ANGLES = [150, 180, 210, 165, 195]

const ms = (n: number) => `${n}ms`
const px = (n: number) => `${n}px`

interface ImpactProps {
  hit: FxHit
  at: Pixel
  angle: number
  delay: number
  tone: string
}

// 着弾の見た目。種類ごとに形だけが違う
function Impact({ hit, at, angle, delay, tone }: ImpactProps) {
  const style = { '--delay': ms(delay), '--x1': px(at.x), '--y1': px(at.y), '--a': `${angle}rad` } as CSSProperties
  switch (hit.impact) {
    case 'slash':
      // 攻撃の向きに対して斜めに走る弧
      return (
        <div className={`fx fx-slash ${tone}`} style={style}>
          <svg width="180" height="180" viewBox="-90 -90 180 180">
            <g transform="rotate(-60)">
              <path className="fx-slash-glow" d="M -70 30 Q 0 -60 70 -20" />
              <path className="fx-slash-core" d="M -70 30 Q 0 -60 70 -20" />
            </g>
          </svg>
        </div>
      )
    case 'spark':
      return (
        <div className={`fx fx-spark ${tone}`} style={style}>
          {SPARK_ANGLES.map((r) => (
            <i key={r} style={{ '--r': `${r}deg` } as CSSProperties} />
          ))}
        </div>
      )
    case 'burst':
      return (
        <div className={`fx fx-burst ${tone}`} style={style}>
          <i className="fx-burst-core" />
          <i className="fx-burst-ring" />
        </div>
      )
    case 'heal':
      return (
        <div className="fx fx-heal" style={style}>
          <i className="fx-heal-ring" />
          {HEAL_MOTES.map((x, i) => (
            <i key={x} className="fx-heal-mote" style={{ '--mx': px(x), '--i': i } as CSSProperties} />
          ))}
        </div>
      )
  }
}

interface FxLayerProps {
  batches: FxBatch[]
  toPx: (pos: Axial) => Pixel // 盤面内のピクセル座標（タイル中心）
}

// 飛び道具・着弾・数字。ユニットの上に重ねる。時間差は animation-delay（--delay）でつける
export default function FxLayer({ batches, toPx }: FxLayerProps) {
  const body = (pos: Axial): Pixel => {
    const p = toPx(pos)
    return { x: p.x, y: p.y - BODY_Y }
  }
  return (
    <div className="fx-layer">
      {batches.map((b) => {
        const tone = `is-${b.side}`
        const from = body(b.actorPos)
        const aim = body(b.toward)
        return (
          <Fragment key={b.id}>
            {b.projectile && (
              <div
                className={`fx fx-projectile fx-${b.projectile.type} ${tone}`}
                style={
                  {
                    '--delay': ms(b.hitAt - b.projectile.dur),
                    '--dur': ms(b.projectile.dur),
                    '--x0': px(from.x),
                    '--y0': px(from.y),
                    '--x1': px(aim.x),
                    '--y1': px(aim.y),
                    '--a': `${Math.atan2(aim.y - from.y, aim.x - from.x)}rad`,
                  } as CSSProperties
                }
              />
            )}
            {b.hits.map((hit) => {
              const at = body(hit.pos)
              return (
                <Fragment key={hit.unitId}>
                  <Impact
                    hit={hit}
                    at={at}
                    angle={Math.atan2(at.y - from.y, at.x - from.x)}
                    delay={b.hitAt}
                    tone={tone}
                  />
                  <div
                    className={`fx fx-number${hit.value > 0 ? ' is-heal' : ''}`}
                    style={
                      {
                        '--delay': ms(b.hitAt),
                        '--x1': px(at.x),
                        '--y1': px(at.y + BODY_Y - NUMBER_Y),
                      } as CSSProperties
                    }
                  >
                    {hit.value > 0 ? `+${hit.value}` : -hit.value}
                  </div>
                </Fragment>
              )
            })}
          </Fragment>
        )
      })}
    </div>
  )
}
