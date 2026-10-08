// 設定。変えた値はすぐ反映し、タブを離れたときにまとめて保存する
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../../../api/actions/auth'
import { saveSettings } from '../../../../../api/actions/settings'
import { LANGS, TEXT_SIZES, TEXT_SPEEDS } from '../../../../../data/settings'
import { useTranslations } from '../../../../../i18n'
import { paths } from '../../../../../router/paths'
import { useAccountStore } from '../../../../../stores/accountStore'
import { useSettingsStore } from '../../../../../stores/settingsStore'
import SettingsSegment from './SettingsSegment'
import SettingsSlider from './SettingsSlider'

export default function SettingsTab() {
  const t = useTranslations('system', {
    music: 'settingsSectionMusic',
    scenario: 'settingsSectionScenario',
    others: 'settingsSectionOthers',
    bgm: 'settingsBgm',
    se: 'settingsSe',
    textSpeed: 'settingsTextSpeed',
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

  const { bgm, se, textSpeed, textSize, lang, set } = useSettingsStore()
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
      <section className="system-settings-section">
        <h3>{t.music}</h3>
        <SettingsSlider label={t.bgm} value={bgm} onChange={(v) => set({ bgm: v })} />
        <SettingsSlider label={t.se} value={se} onChange={(v) => set({ se: v })} />
      </section>
      <section className="system-settings-section">
        <h3>{t.scenario}</h3>
        <SettingsSegment
          label={t.textSpeed}
          options={TEXT_SPEEDS.map((v) => ({ value: v, label: t[v] }))}
          value={textSpeed}
          onChange={(v) => set({ textSpeed: v })}
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
  )
}
