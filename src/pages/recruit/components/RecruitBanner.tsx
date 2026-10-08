import { PICK_UP_ENDS_AT, PICK_UP_IDS, PICK_UP_RATE, type BannerId } from '../../../data/gacha'
import { rarityRates } from '../../../features/gacha/roll'
import { useStaminaStore } from '../../../stores/staminaStore'

const RARITY_ROWS = [3, 2, 1] as const

// 常設の集合絵
const STANDARD_LINEUP = [
  { id: 'alma', left: 680, back: true },
  { id: 'vermilia', left: 1440, back: true },
  { id: 'oboro', left: 880, back: false },
  { id: 'soleil', left: 1170, back: false },
]

const DAY = 24 * 60 * 60

function endLabel(): string {
  const d = new Date((PICK_UP_ENDS_AT + 9 * 60 * 60) * 1000)
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mm = String(d.getUTCMinutes()).padStart(2, '0')
  return `${d.getUTCMonth() + 1}月${d.getUTCDate()}日 ${hh}:${mm}まで`
}

interface RecruitBannerProps {
  banner: BannerId
  title: string
  nameOf: (masterId: string) => string
}

export default function RecruitBanner({ banner, title, nameOf }: RecruitBannerProps) {
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

  const pickUp = PICK_UP_IDS[0]
  const daysLeft = Math.ceil((PICK_UP_ENDS_AT - now) / DAY)
  const pickUpRate = (rates[3] * PICK_UP_RATE) / PICK_UP_IDS.length

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
          {endLabel()}
          {daysLeft > 0 && `・残り${daysLeft}日`}
        </p>
        {rateList}
        <p className="recruit-line is-rarity-3">
          うち{nameOf(pickUp)} {pickUpRate.toFixed(1)}%
        </p>
      </div>
    </>
  )
}
