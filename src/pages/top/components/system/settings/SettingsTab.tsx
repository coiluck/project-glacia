// 設定。変えた値はすぐ反映し、タブを離れたときにまとめて保存する
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../../../api/actions/auth'
import { saveSettings } from '../../../../../api/actions/settings'
import { AUTO_SPEEDS, LANGS, TEXT_SIZES, TEXT_SPEEDS } from '../../../../../data/settings'
import { useTranslations } from '../../../../../i18n'
import { paths } from '../../../../../router/paths'
import { useAccountStore } from '../../../../../stores/accountStore'
import { useSettingsStore } from '../../../../../stores/settingsStore'
import SettingsPreview from './SettingsPreview'
import SettingsSegment from './SettingsSegment'
import SettingsSlider from './SettingsSlider'

export default function SettingsTab() {
  const t = useTranslations('system', {
    scenario: 'settingsSectionScenario',
    others: 'settingsSectionOthers',
    textSpeed: 'settingsTextSpeed',
    autoSpeed: 'settingsAutoSpeed',
    slow: 'settingsSlow',
    normal: 'settingsNormal',
    fast: 'settingsFast',
    textSize: 'settingsTextSize',
    small: 'settingsSmall',
    large: 'settingsLarge',
    language: 'settingsLanguage',
    ja: 'settingsJa',
    en: 'settingsEn',
    account: 'settingsAccount',
    logout: 'settingsLogout',
  })
  const username = useAccountStore((s) => s.username)
  const navigate = useNavigate()

  const { textSpeed, autoSpeed, textSize, lang, set } = useSettingsStore()
  const [pending, setPending] = useState(false)

  // タブを切り替えたりパネルを閉じたりしたら保存
  useEffect(() => () => void saveSettings(), [])

  const handleLogout = async () => {
    if (pending) return
    setPending(true)
    await saveSettings().catch(() => undefined)
    await logout()
    navigate(paths.start, { replace: true })
  }

  return (
    <div className="system-settings">
      <SettingsPreview />
      <div className="system-settings-columns">
        <section className="system-settings-section">
          <h3>{t.scenario}</h3>
          <SettingsSlider
            label={t.textSpeed}
            value={TEXT_SPEEDS.indexOf(textSpeed)}
            max={TEXT_SPEEDS.length - 1}
            minLabel={t.slow}
            maxLabel={t.fast}
            onChange={(i) => set({ textSpeed: TEXT_SPEEDS[i] })}
          />
          <SettingsSlider
            label={t.autoSpeed}
            value={AUTO_SPEEDS.indexOf(autoSpeed)}
            max={AUTO_SPEEDS.length - 1}
            minLabel={t.slow}
            maxLabel={t.fast}
            onChange={(i) => set({ autoSpeed: AUTO_SPEEDS[i] })}
          />
          <SettingsSegment
            label={t.textSize}
            options={TEXT_SIZES.map((v) => ({ value: v, label: t[v] }))}
            value={textSize}
            onChange={(v) => set({ textSize: v })}
          />
        </section>
        <section className="system-settings-section">
          <h3>{t.others}</h3>
          <SettingsSegment
            label={t.language}
            options={LANGS.map((v) => ({ value: v, label: t[v] }))}
            value={lang}
            onChange={(v) => set({ lang: v })}
          />
          <div className="system-settings-row system-notch">
            <span>{t.account}</span>
            <div className="system-settings-control">
              <span className="system-settings-account">{username}</span>
              <button type="button" className="system-button" onClick={handleLogout} disabled={pending}>
                {t.logout}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
