import type { ReactNode } from 'react'
import BillIcon from '../../../components/common/BillIcon'
import { ART_TOP, pts, ring } from './art'
import type { ArtKind } from './art'
import BuildingArt from './BuildingArt'
import OreArt from './OreArt'
import { PipeHalf, PipeHub } from './PipeArt'

// マスの詳細の右パネル（建物のあるマスと空いたマス）で使う部品

// 見出しの六角の印。配管と空いたマスはただの六角
const HEX_ICON = 'M12 3l8 4.5v9L12 21l-8-4.5v-9Z'

export function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d={d} />
    </svg>
  )
}

export const FlameIcon = () => (
  <Icon className="bp-flame" d="M12 3c1 3.5 4.6 5.6 4.6 9.8a4.6 4.6 0 0 1-9.2 0c0-2.1 1-3.4 2.1-4.2 0 1.7.8 2.7 1.8 3.1.3-3.3-.6-5.9.7-8.7Z" />
)
export const LockIcon = () => <Icon className="bp-lock" d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3 M5.5 11h13v10h-13Z" />

// 枠。見出し、中身、下の固定の欄
export function DetailCard({
  emblem,
  title,
  level,
  closeLabel,
  onClose,
  foot,
  children,
}: {
  emblem?: string
  title: string
  level?: number
  closeLabel: string
  onClose: () => void
  foot?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="bp-card">
      <header className="bp-head">
        <span className="bp-emblem">
          <Icon d={emblem ?? HEX_ICON} />
        </span>
        <h2>
          {title}
          {level !== undefined && (
            <span className="bp-lv">
              Lv<b>{level}</b>
            </span>
          )}
        </h2>
        <button type="button" className="bp-close" aria-label={closeLabel} onClick={onClose} />
      </header>
      <div className="bp-body">{children}</div>
      {foot && <footer className="bp-foot">{foot}</footer>}
    </section>
  )
}

// 建物の絵を浮かべる投影。low は低い投影、warm は暖房塔の暖色
export function Stage({
  idle = false,
  low = false,
  preview = false,
  warm = false,
  tags,
  children,
}: {
  idle?: boolean
  low?: boolean
  preview?: boolean
  warm?: boolean
  tags?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={`bp-stage${idle ? ' is-idle' : ''}${low ? ' is-low' : ''}${preview ? ' is-preview' : ''}${warm ? ' is-warm' : ''}`}>
      {tags && <div className="bp-stage-tags">{tags}</div>}
      {children}
    </div>
  )
}

// 投影や一覧に置く建物の絵。kind が無ければ鉱脈か、置き場所の六角
export function HoloArt({
  kind,
  idle,
  ore,
  className,
}: {
  kind?: ArtKind | 'pipe'
  idle: boolean
  ore?: 1 | 2
  className: string
}) {
  const top = kind && kind !== 'pipe' ? ART_TOP[kind] : -60
  const box = { x: -80, y: top - 4, width: 160, height: -top + 44 }
  let body: ReactNode
  if (kind === 'pipe')
    body = (
      <>
        {/* 盤面の base-glow は範囲が盤面の座標なので、この枠では管の左半分の光が切れる。枠に合わせた範囲で作り直す */}
        <defs>
          <filter id="bp-pipe-glow" filterUnits="userSpaceOnUse" {...box}>
            <feGaussianBlur stdDeviation={2.5} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform="translate(0,-6)">
          <PipeHalf from={[0, 0]} to={[-56, 29]} hot={!idle} outward toTower={false} />
          <PipeHalf from={[0, 0]} to={[56, -29]} hot={!idle} outward={false} toTower={false} />
          <PipeHub at={[0, 0]} hot={!idle} />
        </g>
      </>
    )
  else if (kind)
    body = (
      <g className={`base-art is-${kind}${idle ? ' is-idle' : ''}`}>
        <BuildingArt kind={kind} />
      </g>
    )
  else if (ore) body = <OreArt step={ore} cold={idle} />
  else body = <polygon className="bp-slot" points={pts(ring(50, 0))} />
  return (
    <svg className={className} viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`} aria-hidden>
      {body}
    </svg>
  )
}

// 熱の目盛り。add は増える分（出力を超えた分は赤）
export function HeatCells({ used, total, add = 0 }: { used: number; total: number; add?: number }) {
  return (
    <span className="bp-cells">
      {Array.from({ length: Math.max(total, used + add) }, (_, i) => (
        <i
          key={i}
          className={i < used ? 'is-on' : i < used + add ? (i >= total ? 'is-over' : 'is-add') : ''}
        />
      ))}
    </span>
  )
}

// 金のボタン。紙幣を使うなら cost、できないときは理由を下に出す（disabled は理由を出さずに止める）
export function GoldButton({
  label,
  cost,
  reason = null,
  disabled = false,
  pending,
  onClick,
}: {
  label: string
  cost?: number
  reason?: string | null
  disabled?: boolean
  pending: boolean
  onClick: () => void
}) {
  return (
    <>
      <button type="button" className="bp-gold" disabled={pending || disabled || reason !== null} onClick={onClick}>
        <span>{label}</span>
        {cost !== undefined && (
          <span className="bp-gold-cost">
            <BillIcon className="bp-bill" />
            {cost.toLocaleString('en-US')}
          </span>
        )}
      </button>
      {reason && <p className="bp-ng">{reason}</p>}
    </>
  )
}
