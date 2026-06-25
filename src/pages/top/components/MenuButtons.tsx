import { Link } from 'react-router-dom'
import { paths } from '../../../router/paths'

// Top画面下部のメインメニュー
export default function MenuButtons() {
  return (
    <nav className="top-menu-buttons">
      <div className="top-menu-buttons-row">
        <Link to={paths.story} className="top-menu-button-battle">
          <div className="top-menu-button-stamina-container">
            <div className="top-menu-button-stamina-icon" />

            <div className="top-menu-button-stamina-value-container">
              <span className="top-menu-button-stamina-value">100</span>
              <span className="top-menu-button-stamina-max">MAX 100</span>
            </div>
          </div>

          <span>戦闘</span>
        </Link>
      </div>

      <div className="top-menu-buttons-row">
        <Link to={paths.party} className="top-menu-button-party">
          <span>編成</span>
          <div className="top-menu-button-party-icon" />
        </Link>
        <Link to={paths.member} className="top-menu-button-member">
          <span>人員</span>
          <div className="top-menu-button-member-icon" />
        </Link>
      </div>

      <div className="top-menu-buttons-row">
        <Link to={paths.story}>
          <span>任務</span>
          <div className="top-menu-button-mission-icon" />
        </Link>
        <Link to={paths.story}>
          <span>取引所</span>
          <div className="top-menu-button-exchange-icon" />
        </Link>
        <Link to={paths.recruit}>
          <span>召集</span>
          <div className="top-menu-button-recruit-icon" />
        </Link>
      </div>

      <div className="top-menu-buttons-row">
        <Link to={paths.base} className="top-menu-button-base">
          <span>基地</span>
          <div className="top-menu-button-base-icon" />
        </Link>
        <Link to={paths.base} className="top-menu-button-store">倉庫</Link>
      </div>
    </nav>
  )
}
