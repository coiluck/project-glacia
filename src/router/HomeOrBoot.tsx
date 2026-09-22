import { Navigate } from 'react-router-dom'
import { paths } from './paths'
import TopPage from '../pages/top/TopPage'

// 起動フロー（ロゴ→スタート）を通過済みかどうかでホーム表示を出し分ける
export default function HomeOrBoot() {
  if (!sessionStorage.getItem('glacia:booted')) {
    return <Navigate to={paths.boot} replace />
  }
  return <TopPage />
}
