import { Link } from 'react-router-dom'
import { paths } from '../../../router/paths'

// 左下のイベントバナー。開催中イベントへ誘導する。
// TODO: イベントデータ（タイトル・期間・遷移先）と接続する。遷移先は暫定でストーリーへ。
export default function EventBanner() {
  return (
    <Link to={paths.story} className="top-event-banner">
      <span className="top-event-banner-tag">NEW EVENT</span>
      <span className="top-event-banner-title">ゲームスタート！</span>
    </Link>
  )
}
