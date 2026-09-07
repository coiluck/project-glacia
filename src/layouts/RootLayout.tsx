import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { paths } from '../router/paths'
import { hasToken } from '../api/session'
import ViewportLayer from './ViewportLayer'
import ResourceBar from '../components/common/ResourceBar'
import { useStaminaStore } from '../stores/staminaStore'

// 全画面共通の枠（上部にリソースバー）
export default function RootLayout() {
  const location = useLocation()

  // スタミナの残り秒を1秒ずつ進める
  useEffect(() => {
    const tick = useStaminaStore.getState().tick
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  // 未ログイン
  if (!hasToken()) return <Navigate to={paths.start} replace />

  return (
    <div className="app-shell">
      <ViewportLayer>
        <ResourceBar />
      </ViewportLayer>
      <main key={location.pathname} className="app-main fade-in">
        <Outlet />
      </main>
    </div>
  )
}
