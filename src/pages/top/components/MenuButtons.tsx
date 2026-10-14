import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslations } from '../../../i18n'
import { paths } from '../../../router/paths'
import { selectStamina, useStaminaStore } from '../../../stores/staminaStore'
import { formatHms } from '../../../utils/format'

const TRANSLATION_MAPPING = {
  battle: 'battle',
  party: 'party',
  member: 'member',
  mission: 'mission',
  exchange: 'exchange',
  recruit: 'recruit',
  base: 'base',
  warehouse: 'warehouse',
  staminaFull: 'staminaFull',
  staminaToNext: 'staminaToNext',
  staminaToFull: 'staminaToFull',
}

// Top画面右のメインメニュー
export default function MenuButtons() {
  const t = useTranslations('top', TRANSLATION_MAPPING)
  const stamina = useStaminaStore((s) => selectStamina(s).stamina)
  const staminaMax = useStaminaStore((s) => s.base.stamina_max)
  const toNext = useStaminaStore((s) => selectStamina(s).stamina_recovering_seconds)
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
              <dl className="top-menu-button-stamina-modal">
                {stamina >= staminaMax ? (
                  <dt>{t.staminaFull}</dt>
                ) : (
                  <>
                    <dt>{t.staminaToNext}</dt>
                    <dd>{formatHms(toNext)}</dd>
                    <dt>{t.staminaToFull}</dt>
                    <dd>{formatHms(toFull)}</dd>
                  </>
                )}
              </dl>
            )}
          </div>

          <span>{t.battle}</span>
        </Link>
      </div>

      <div className="top-menu-buttons-row">
        <Link to={paths.party} className="top-menu-button-party">
          <span>{t.party}</span>
          <div className="top-menu-button-icon top-menu-button-party-icon" />
        </Link>
        <Link to={paths.member} className="top-menu-button-member">
          <span>{t.member}</span>
          <div className="top-menu-button-icon top-menu-button-member-icon" />
        </Link>
      </div>

      <div className="top-menu-buttons-row">
        <Link to={paths.mission}>
          <span>{t.mission}</span>
          <div className="top-menu-button-icon top-menu-button-mission-icon" />
        </Link>
        <Link to={paths.exchange}>
          <span>{t.exchange}</span>
          <div className="top-menu-button-icon top-menu-button-exchange-icon" />
        </Link>
        <Link to={paths.recruit}>
          <span>{t.recruit}</span>
          <div className="top-menu-button-icon top-menu-button-recruit-icon" />
        </Link>
      </div>

      <div className="top-menu-buttons-row">
        <Link to={paths.base} className="top-menu-button-base">
          <span>{t.base}</span>
          <div className="top-menu-button-icon top-menu-button-base-icon" />
        </Link>
        <Link to={paths.warehouse} className="top-menu-button-store">{t.warehouse}</Link>
      </div>
    </nav>
  )
}
