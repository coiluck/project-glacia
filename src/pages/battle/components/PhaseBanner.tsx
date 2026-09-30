import { useEffect, useState } from 'react'

// 出しておく時間。hud.css の battle-phase-banner のアニメーション長と揃える
const BANNER_MS = 1500

const pad2 = (n: number) => String(n).padStart(2, '0')

interface PhaseBannerProps {
  phase: 'player' | 'enemy'
  turn: number
}

// フェーズが切り替わったときに画面中央へ出す告知。時間が来たら自分で消える
export default function PhaseBanner({ phase, turn }: PhaseBannerProps) {
  const [shown, setShown] = useState(true)
  useEffect(() => {
    const id = setTimeout(() => setShown(false), BANNER_MS)
    return () => clearTimeout(id)
  }, [])
  if (!shown) return null
  return (
    <div className={`battle-phase-banner is-${phase}`}>
      <div className="battle-phase-banner-title">
        {phase === 'enemy' ? 'ENEMY PHASE' : 'PLAYER PHASE'}
      </div>
      <div className="battle-phase-banner-sub">TURN {pad2(turn)}</div>
    </div>
  )
}
