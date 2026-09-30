import { useEffect, useRef, useState } from 'react'
import Screen from '../../layouts/Screen'
import { claimLoginBonus } from '../../api/actions/loginBonus'
import { dayIndex } from '../../features/daily/day'
import { loginClaimedToday } from '../../features/daily/loginBonus'
import { useLoginBonusStore } from '../../stores/loginBonusStore'
import { useStaminaStore } from '../../stores/staminaStore'
import CharacterStage from './components/CharacterStage'
import EventBanner from './components/EventBanner'
import LoginBonus from './components/LoginBonus'
import MenuButtons from './components/MenuButtons'
import SystemMenu from './components/SystemMenu'

// ホーム画面
export default function TopPage() {
  const base = useLoginBonusStore((s) => s.base)
  const now = useStaminaStore((s) => s.now)
  const today = dayIndex(now)
  const claimed = loginClaimedToday(base, now)

  // 表示中のログインボーナス（今月何回目か）。null なら出ていない
  const [bonusCount, setBonusCount] = useState<number | null>(null)

  // 開いたときに本日分を受け取る
  const claimedDay = useRef<number | null>(null)
  useEffect(() => {
    if (claimed || claimedDay.current === today) return
    claimedDay.current = today
    claimLoginBonus().then(setBonusCount).catch(console.error)
  }, [claimed, today])

  return (
    <Screen
      background="images/top/ice_port.jpg"
      viewport={
        <>
          <div className="page-top">
            <CharacterStage />
            <EventBanner />
            <MenuButtons />
            <SystemMenu />
          </div>
          {bonusCount !== null && (
            <LoginBonus count={bonusCount} day={today} onClose={() => setBonusCount(null)} />
          )}
        </>
      }
    />
  )
}
