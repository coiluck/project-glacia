import { useState } from 'react'
import { DAILY_TOKENS } from '../../../data/exchange'
import TokenIcon from './TokenIcon'

type Props = {
  labels: { supply: string; tapToClose: string }
  onClose: () => void
}

// 本日分の交換材料を受け取ったときのオーバーレイ
export default function DailySupply({ labels, onClose }: Props) {
  const [closing, setClosing] = useState(false)

  return (
    <div
      className={`exchange-supply${closing ? ' is-closing' : ''}`}
      onClick={() => setClosing(true)}
      onAnimationEnd={(e) => closing && e.target === e.currentTarget && onClose()}
    >
      <div className="exchange-supply-body">
        <span className="exchange-supply-caption">DAILY SUPPLY</span>
        <span className="exchange-supply-label">{labels.supply}</span>
        <span className="exchange-supply-amount">
          <TokenIcon />
          <b>+{DAILY_TOKENS}</b>
        </span>
        <span className="exchange-supply-hint">{labels.tapToClose}</span>
      </div>
    </div>
  )
}
