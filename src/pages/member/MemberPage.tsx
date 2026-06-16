import { Link } from 'react-router-dom'
import { paths } from '../../router/paths'

// 人員画面。所持キャラ一覧・詳細・育成など。
export default function MemberPage() {
  return (
    <div className="page page-member">
      <h1>人員 / MEMBER</h1>
      <Link to={paths.top}>← 戻る</Link>
    </div>
  )
}
