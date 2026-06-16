import { Outlet } from 'react-router-dom'
import ResourceBar from '../components/common/ResourceBar'

// 全画面共通の枠。上部にリソースバー（スタミナ・通貨・ジェム）、下に各ページを描画する。
export default function RootLayout() {
  return (
    <div className="app-shell">
      <ResourceBar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
