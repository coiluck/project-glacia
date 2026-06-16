import { Link } from 'react-router-dom'
import { paths } from '../../router/paths'

// 召集（ガチャ）画面。
export default function RecruitPage() {
  return (
    <div className="page page-recruit">
      <h1>召集 / RECRUIT</h1>
      <Link to={paths.top}>← 戻る</Link>
    </div>
  )
}
