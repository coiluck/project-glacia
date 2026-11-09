import { PICK_UP_RATE, type BannerId } from '../../../data/gacha'
import { pickUpEndsAt, pickUpIdsOf, pickUpPeriod } from '../../../features/gacha/pickUp'
import { rarityRates } from '../../../features/gacha/roll'
import { useStaminaStore } from '../../../stores/staminaStore'
import { fill } from '../../../i18n'
import type { RecruitTexts } from '../texts'

const RARITY_ROWS = [3, 2, 1] as const

// 常設の集合絵
const STANDARD_LINEUP = [
  { id: 'alma', left: 680, back: true },
  { id: 'vermilia', left: 1440, back: true },
  { id: 'oboro', left: 880, back: false },
  { id: 'soleil', left: 1170, back: false },
]

const DAY = 24 * 60 * 60

function endLabel(template: string, endsAt: number): string {
  const d = new Date((endsAt + 9 * 60 * 60) * 1000)
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mm = String(d.getUTCMinutes()).padStart(2, '0')
  return fill(template, d.getUTCMonth() + 1, d.getUTCDate(), hh, mm)
}

interface RecruitBannerProps {
  banner: BannerId
  title: string
  nameOf: (masterId: string) => string
  t: RecruitTexts
}

export default function RecruitBanner({ banner, title, nameOf, t }: RecruitBannerProps) {
  const now = useStaminaStore((s) => s.now)
  const rates = rarityRates()

  const rateList = (
    <p className="recruit-rates">
      {RARITY_ROWS.filter((r) => rates[r] > 0).map((r) => (
        <span key={r} className={`is-rarity-${r}`}>
          {'★'.repeat(r)}
          <b>{rates[r].toFixed(1)}%</b>
        </span>
      ))}
    </p>
  )

  if (banner === 'standard') {
    return (
      <>
        <div className="recruit-lineup">
          {STANDARD_LINEUP.map((c) => (
            <img
              key={c.id}
              className={`recruit-lineup-art is-${c.id}${c.back ? ' is-back' : ''}`}
              style={{ left: c.left }}
              src={`${import.meta.env.BASE_URL}images/character/full_body/${c.id}.avif`}
              alt=""
            />
          ))}
        </div>
        <div className="recruit-type">
          <h1 className="recruit-name">{title}</h1>
          {rateList}
        </div>
      </>
    )
  }

  const period = pickUpPeriod(now)
  const pickUpIds = pickUpIdsOf(period)
  const pickUp = pickUpIds[0]
  const endsAt = pickUpEndsAt(now) - 60 // 終了は替わる1分前（04:59）として出す
  const daysLeft = Math.ceil((endsAt - now) / DAY)
  const pickUpRate = (rates[3] * PICK_UP_RATE) / pickUpIds.length

  return (
    <>
      <img
        className="recruit-art"
        src={`${import.meta.env.BASE_URL}images/character/full_body/${pickUp}.avif`}
        alt=""
      />
      <div className="recruit-type">
        <p className="recruit-kicker">{title}</p>
        <h1 className="recruit-name">{nameOf(pickUp)}</h1>
        <p className="recruit-stars">★★★</p>
        <p className="recruit-line">
          {endLabel(t.endsAt, endsAt)}
          {daysLeft > 0 && fill(t.daysLeft, daysLeft)}
        </p>
        {rateList}
        <p className="recruit-line is-rarity-3">
          {fill(t.pickUpRate, nameOf(pickUp), pickUpRate.toFixed(1))}
        </p>
      </div>
    </>
  )
}
