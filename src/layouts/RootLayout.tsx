import { Outlet, useLocation } from 'react-router-dom'
import Screen from './Screen'
import ResourceBar from '../components/common/ResourceBar'

// 全画面共通の枠。上部にリソースバー（スタミナ・通貨・ジェム）、下に各ページを描画する。
export default function RootLayout() {
  const location = useLocation()

  return (
    <div className="app-shell">
      <Screen viewport={<ResourceBar />} background={'images/top/ice_port.jpg'}>
        <main key={location.pathname} className="app-main fade-in">
          <Outlet />
        </main>
      </Screen>
    </div>
  )
}
