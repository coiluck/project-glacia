import { useEffect, useState, type CSSProperties } from 'react'
import { useTranslations } from '../../../i18n'
import { items } from '../../../data/items'
import { LOGIN_BONUS, type LoginReward } from '../../../data/loginBonus'
import { calendarOf, daysInMonth } from '../../../features/daily/day'
import BillIcon from '../../../components/common/BillIcon'
import GemIcon from '../../../components/common/GemIcon'
import ItemIcon from '../../../components/common/ItemIcon'

const COMMON_TRANSLATION_MAPPING = {
  loginBonus: 'loginBonus',
  gems: 'gems',
  currency: 'currency',
  year: 'year',
  month: 'month',
}

const ITEM_TRANSLATION_MAPPING = Object.fromEntries(
  LOGIN_BONUS.flatMap((r) =>
    r.kind === 'item' ? [[items[r.itemId].nameKey, items[r.itemId].nameKey]] : [],
  ),
)

// カレンダーを開いてから獲得の一枚へ移るまで（ms）。スタンプが落ち着くのを待つ
const GAIN_AT = 2200

// 六角形のスタンプ
const HEX_POINTS = '50,4 89.8,27 89.8,73 50,96 10.2,73 10.2,27'
const HEX_FRAME_POINTS = '50,2 91.6,26 91.6,74 50,98 8.4,74 8.4,26'

const stamp = (
  <svg className="login-bonus-stamp" viewBox="0 0 100 100" aria-hidden>
    <polygon points={HEX_POINTS} strokeWidth={3.5} />
    <polygon points="50,12 82.9,31 82.9,69 50,88 17.1,69 17.1,31" strokeWidth={1} />
    <path d="M32 52l12 12 25-27" strokeWidth={5} />
  </svg>
)
const stampWave = (
  <svg className="login-bonus-stamp-wave" viewBox="0 0 100 100" aria-hidden>
    <polygon points={HEX_POINTS} />
  </svg>
)
const hexFrame = (className: string) => (
  <svg className={className} viewBox="0 0 100 100" aria-hidden>
    <polygon points={HEX_FRAME_POINTS} />
  </svg>
)

const kindClass = (r: LoginReward) =>
  r.kind === 'item' ? `is-rarity-${items[r.itemId].rarity}` : `is-${r.kind}`

function RewardIcon({ reward, className }: { reward: LoginReward; className: string }) {
  if (reward.kind === 'gems') return <GemIcon className={`${className} is-gem`} />
  if (reward.kind === 'currency') return <BillIcon className={`${className} is-bill`} />
  return <ItemIcon item={items[reward.itemId]} className={`${className} is-item`} />
}

// 個数。アイテムだけ × を付ける
function Amount({ reward }: { reward: LoginReward }) {
  return (
    <>
      {reward.kind === 'item' && <i>×</i>}
      {reward.amount}
    </>
  )
}

// カレンダーに今日のスタンプが落ちる → 自動で獲得した品物の一枚 → タップで閉じる
type Phase = 'calendar' | 'leaving' | 'gain' | 'closing'

type Props = {
  count: number // 今月何回目のログインボーナスか（1 から）
  day: number // 今日（dayIndex）。月とその日数を出す
  onClose: () => void
}

export default function LoginBonus({ count, day, onClose }: Props) {
  const t = useTranslations('common', COMMON_TRANSLATION_MAPPING)
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)
  const [phase, setPhase] = useState<Phase>('calendar')

  // カレンダーはスタンプが落ち着いたら自動で獲得の一枚へ
  useEffect(() => {
    if (phase !== 'calendar') return
    const timer = setTimeout(() => setPhase('leaving'), GAIN_AT)
    return () => clearTimeout(timer)
  }, [phase])

  // カレンダーのタップは待たずに進める。獲得の一枚のタップで閉じる
  const tap = () => {
    if (phase === 'calendar') setPhase('leaving')
    else if (phase === 'gain') setPhase('closing')
  }

  const reward = LOGIN_BONUS[count - 1]
  const { year, month } = calendarOf(day)
  const rewardName =
    reward.kind === 'gems'
      ? t.gems
      : reward.kind === 'currency'
        ? t.currency
        : tItem[items[reward.itemId].nameKey]

  return (
    <div
      className={`login-bonus is-${phase}`}
      onClick={tap}
      onAnimationEnd={(e) => phase === 'closing' && e.target === e.currentTarget && onClose()}
    >
      {/* セーフエリアと同じ箱。暗幕はビューポート全体、中身は設計座標で組む */}
      <div className="login-bonus-safe">
        {phase === 'calendar' || phase === 'leaving' ? (
          <div
            className={`login-bonus-calendar${phase === 'leaving' ? ' is-leaving' : ''}`}
            onAnimationEnd={(e) =>
              phase === 'leaving' && e.target === e.currentTarget && setPhase('gain')
            }
          >
            <div className="login-bonus-head">
              <span className="login-bonus-title">{t.loginBonus}</span>
              <span className="login-bonus-month">
                {year}
                <small>{t.year}</small>
                {month}
                <small>{t.month}</small>
              </span>
            </div>
            {/* 枠は今月の日数ぶん。n 番目の枠 = 今月 n 回目のログイン */}
            <ul className="login-bonus-grid">
              {LOGIN_BONUS.slice(0, daysInMonth(day)).map((r, i) => {
                const n = i + 1
                const state = n < count ? ' is-claimed' : n === count ? ' is-today' : ''
                return (
                  <li
                    key={n}
                    className={`login-bonus-cell ${kindClass(r)}${state}`}
                    style={{ '--i': i } as CSSProperties}
                  >
                    <div className="login-bonus-tile">
                      <span className="login-bonus-cell-day">{n}</span>
                      <RewardIcon reward={r} className="login-bonus-cell-icon" />
                      <span className="login-bonus-cell-amount">
                        <Amount reward={r} />
                      </span>
                    </div>
                    {n === count && stampWave}
                    {n <= count && stamp}
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <div className={`login-bonus-gain ${kindClass(reward)}`}>
            <span className="login-bonus-title">{t.loginBonus}</span>
            <div className="login-bonus-gain-stage">
              <div className="login-bonus-gain-rays" />
              <div className="login-bonus-gain-glow" />
              {hexFrame('login-bonus-gain-frame')}
              {hexFrame('login-bonus-gain-frame is-inner')}
              {hexFrame('login-bonus-gain-ring')}
              <RewardIcon reward={reward} className="login-bonus-gain-icon" />
            </div>
            <span className="login-bonus-gain-amount">
              <Amount reward={reward} />
            </span>
            <span className="login-bonus-gain-name">{rewardName}</span>
          </div>
        )}
      </div>
    </div>
  )
}
