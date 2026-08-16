import { Link, useParams } from 'react-router-dom'
import { paths } from '../../router/paths'

// キャラ詳細・強化画面。編成のキャラ選択と人員一覧から遷移する。
// TODO: 中身（レベル上げ・上限解放・スキル強化）を実装する。
export default function MemberDetailPage() {
  const { characterId } = useParams()

  return (
    <div className="page page-member-detail">
      <h1>強化 / {characterId}</h1>
      <Link to={paths.member}>← 戻る</Link>
    </div>
  )
}
