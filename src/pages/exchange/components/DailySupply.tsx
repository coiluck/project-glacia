import { useState } from 'react'
import { DAILY_TOKENS } from '../../../data/exchange'
import TokenIcon from './TokenIcon'

type Props = {
  balance: number // 受け取ったあとの残高
  labels: { supply: string; token: string; owned: string }
  onClose: () => void
}

// 本日分の交換材料を受け取ったときのオーバーレイ。ログインボーナスの獲得と同じ組み方
export default function DailySupply({ balance, labels, onClose }: Props) {
  const [closing, setClosing] = useState(false)

  return (
    <div
      className={`exchange-supply${closing ? ' is-closing' : ''}`}
      onClick={() => setClosing(true)}
      onAnimationEnd={(e) => closing && e.target === e.currentTarget && onClose()}
    >
      <span className="exchange-supply-title">{labels.supply}</span>

      <div className="exchange-supply-stage">
        <span className="exchange-supply-rays" />
        <span className="exchange-supply-glow" />
        <svg className="exchange-supply-frame" viewBox="0 0 100 100" aria-hidden>
          <path d="M50 2 91.6 26v48L50 98 8.4 74V26Z" />
        </svg>
        <svg className="exchange-supply-frame is-inner" viewBox="0 0 100 100" aria-hidden>
          <path d="M50 2 91.6 26v48L50 98 8.4 74V26Z" />
        </svg>
        <span className="exchange-supply-icon">
          <TokenIcon />
        </span>
      </div>

      <span className="exchange-supply-amount">
        <i>+</i>
        {DAILY_TOKENS}
      </span>
      <span className="exchange-supply-name">{labels.token}</span>
      <span className="exchange-supply-balance">
        {labels.owned}
        <b>{balance.toLocaleString('en-US')}</b>
      </span>
    </div>
  )
}
