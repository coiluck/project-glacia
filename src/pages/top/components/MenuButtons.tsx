import { useState } from 'react'
import { Link } from 'react-router-dom'
import { paths } from '../../../router/paths'
import { selectStamina, useStaminaStore } from '../../../stores/staminaStore'
import { formatHms } from '../../../utils/format'

// Top画面右のメインメニュー
export default function MenuButtons() {
  const stamina = useStaminaStore((s) => selectStamina(s).stamina)
  const staminaMax = useStaminaStore((s) => s.base.stamina_max)
  const toFull = useStaminaStore((s) => selectStamina(s).stamina_recovering_seconds_max)

  const [isStaminaOpen, setIsStaminaOpen] = useState(false)

  return (
    <nav className="top-menu-buttons">
      <div className="top-menu-buttons-row">
        <Link to={paths.story} className="top-menu-button-battle">
          <div className="top-menu-button-stamina-container">
            <div className="top-menu-button-stamina-icon" />

            <div className="top-menu-button-stamina-value-container">
              <span className="top-menu-button-stamina-value">{stamina}</span>
              <span className="top-menu-button-stamina-max">MAX {staminaMax}</span>
            </div>

            <div className="top-menu-button-stamina-button-container">
              {/* Link の中にあるので遷移させない */}
              <button
                type="button"
                className={`top-menu-button-stamina-button${isStaminaOpen ? ' is-open' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsStaminaOpen(!isStaminaOpen)
                }}
              />
            </div>
            {isStaminaOpen && (
              <div className="top-menu-button-stamina-modal">
                <p>回復まで</p>
                <p>{formatHms(toFull)}</p>
              </div>
            )}
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
        <Link to={paths.exchange}>
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
        <Link to={paths.warehouse} className="top-menu-button-store">倉庫</Link>
      </div>
    </nav>
  )
}
