import GemIcon from '../../../components/common/GemIcon'
import { DAILY_ALL_CLEAR_GEMS, DAILY_SLOTS } from '../../../data/missions'
import { dayIndex, secondsUntilReset } from '../../../features/daily/day'
import {
  dailyMissionToday,
  dailyMissionsFor,
  type DailyMissionBase,
} from '../../../features/mission/daily'
import { formatHms } from '../../../utils/format'
import { EVENT_KEYS } from '../keys'
import MissionRow, { type MissionRowData } from './MissionRow'

const TIER_CAPTION = { light: 'LIGHT', medium: 'MEDIUM', heavy: 'HEAVY' } as const

type Props = {
  base: DailyMissionBase
  now: number
  pending: boolean
  t: Record<string, string>
  onClaim: (slot: number) => void
  onClaimAll: () => void
}

// デイリーの欄
export default function DailyPanel({ base, now, pending, t, onClaim, onClaimAll }: Props) {
  const { counts, claimed } = dailyMissionToday(base, now)
  const allClear = claimed.length === DAILY_SLOTS.length

  const rows: MissionRowData[] = dailyMissionsFor(dayIndex(now)).map((m, slot) => ({
    key: `${slot}-${m.event}`,
    tier: DAILY_SLOTS[slot].tier,
    caption: TIER_CAPTION[DAILY_SLOTS[slot].tier],
    text: t[EVENT_KEYS[m.event]],
    value: m.target.toLocaleString('en-US'),
    current: counts[m.event] ?? 0,
    target: m.target,
    gems: m.gems,
    claimed: claimed.includes(slot),
  }))
  const claimable = rows.some((r) => !r.claimed && r.current >= r.target)

  return (
    <>
      <div className="mission-head">
        <div className="mission-head-title">
          <span>{t.dailyTitle}</span>
        </div>
        <span className="mission-reset">
          {t.reset} <b>{formatHms(secondsUntilReset(now))}</b>
        </span>
      </div>

      <ul className="mission-list">
        {rows.map((row, slot) => (
          <MissionRow
            key={row.key}
            row={row}
            index={slot}
            disabled={pending}
            labels={{ claim: t.claim, inProgress: t.inProgress }}
            onClaim={() => onClaim(slot)}
          />
        ))}
      </ul>

      <div className="mission-foot is-tier-bonus">
        <div className="mission-foot-summary">
          <span className="mission-row-caption">ALL CLEAR //</span>
          <span className="mission-foot-label">
            {t.allClearLabel.replace('{0}', String(DAILY_SLOTS.length))}
          </span>
          <div className="mission-pips">
            {DAILY_SLOTS.map((_, i) => (
              <span
                key={i}
                className={`mission-pip${i < claimed.length ? ' is-claimed' : ''}`}
              />
            ))}
          </div>
        </div>
        <span className={`mission-reward${allClear ? ' is-claimed' : ''}`}>
          <GemIcon className="" />
          <b>{DAILY_ALL_CLEAR_GEMS}</b>
        </span>
        <button
          type="button"
          className="mission-claim-all"
          disabled={pending || !claimable}
          onClick={onClaimAll}
        >
          {t.claimAll}
        </button>
      </div>
    </>
  )
}
