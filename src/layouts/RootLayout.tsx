import { Outlet, useLocation } from 'react-router-dom'
import ViewportLayer from './ViewportLayer'
import ResourceBar from '../components/common/ResourceBar'

// 全画面共通の枠（上部にリソースバー）
export default function RootLayout() {
  const location = useLocation()

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
