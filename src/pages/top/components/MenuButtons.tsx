import { Link } from 'react-router-dom'
import { paths } from '../../../router/paths'

// Top画面下部のメインメニュー（任務 / 召集 / 人員 / 基地 / 編成）。
export default function MenuButtons() {
  return (
    <nav className="menu-buttons">
      <Link to={paths.story}>任務 / MISSION</Link>
      <Link to={paths.recruit}>召集 / RECRUIT</Link>
      <Link to={paths.member}>人員 / MEMBER</Link>
      <Link to={paths.base}>基地 / BASE</Link>
      <Link to={paths.party}>編成 / PARTY</Link>
    </nav>
  )
}
