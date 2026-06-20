import { Outlet, useLocation } from 'react-router-dom'
import ResourceBar from '../components/common/ResourceBar'

// 全画面共通の枠。上部にリソースバー（スタミナ・通貨・ジェム）、下に各ページを描画する。
export default function RootLayout() {
  // パスを key にして、ページ遷移のたびに描画領域を作り直す＝毎回 fade-in を走らせる。
  // リソースバーは枠の外なのでフェードせず据え置きになる。
  const location = useLocation()
  return (
    <div className="app-shell">
      <ResourceBar />
      <main key={location.pathname} className="app-main fade-in">
        <Outlet />
      </main>
    </div>
  )
}
