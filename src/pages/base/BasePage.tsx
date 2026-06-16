import { Link } from 'react-router-dom'
import { paths } from '../../router/paths'

// 基地画面。
export default function BasePage() {
  return (
    <div className="page page-base">
      <h1>基地 / BASE</h1>
      <Link to={paths.top}>← 戻る</Link>
    </div>
  )
}
