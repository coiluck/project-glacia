import type { CSSProperties } from 'react'
import GemIcon from '../../../components/common/GemIcon'
import type { MissionTier } from '../../../data/missions'

// 任務1行ぶんの表示用データ
export interface MissionRowData {
  key: string
  tier?: MissionTier // デイリーだけ
  caption: string
  text: string // 目標値を入れる箇所は {0}
  value: string // {0} に入れる値
  current: number
  target: number
  gems: number
  claimed: boolean
}

type Props = {
  row: MissionRowData
  index: number // 表示順
  disabled: boolean
  labels: { claim: string; inProgress: string }
  onClaim: () => void
}

const fmt = (n: number) => n.toLocaleString('en-US')

// 任務1行
export default function MissionRow({ row, index, disabled, labels, onClaim }: Props) {
  const achieved = row.current >= row.target
  const [before, after] = row.text.split('{0}')
  const className = [
    'mission-row',
    row.tier ? `is-tier-${row.tier}` : '',
    achieved ? 'is-achieved' : '',
    row.claimed ? 'is-claimed' : '',
  ].join(' ')

  return (
    <li className={className} style={{ '--i': index } as CSSProperties}>
      <span className="mission-row-caption">{row.caption} //</span>
      <div className="mission-row-main">
        <span className="mission-row-text">
          {before}
          {after !== undefined && (
            <>
              <b>{row.value}</b>
              {after}
            </>
          )}
        </span>
        <div className="mission-progress">
          <span className="mission-progress-bar">
            <i style={{ width: `${Math.min(1, row.current / row.target) * 100}%` }} />
          </span>
          <span className="mission-progress-value">
            <b>{fmt(Math.min(row.current, row.target))}</b> / {fmt(row.target)}
          </span>
        </div>
      </div>

      <span className="mission-reward">
        <GemIcon className="" />
        <b>{fmt(row.gems)}</b>
      </span>

      {row.claimed ? (
        <span className="mission-stamp">CLEAR</span>
      ) : (
        <button
          type="button"
          className="mission-button"
          disabled={disabled || !achieved}
          onClick={onClaim}
        >
          {achieved ? labels.claim : labels.inProgress}
        </button>
      )}
    </li>
  )
}
