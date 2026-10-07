// 設定。値はまだ保存しない（settingsStore を作ったらそこへつなぐ）
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../../../api/actions/auth'
import { useTranslations } from '../../../../../i18n'
import { paths } from '../../../../../router/paths'
import { useAccountStore } from '../../../../../stores/accountStore'
import SettingsSegment from './SettingsSegment'
import SettingsSlider from './SettingsSlider'

const TEXT_SPEEDS = ['slow', 'normal', 'fast'] as const
const LANGS = ['ja', 'en'] as const

export default function SettingsTab() {
  const t = useTranslations('system', {
    bgm: 'settingsBgm',
    se: 'settingsSe',
    textSpeed: 'settingsTextSpeed',
    slow: 'settingsSlow',
    normal: 'settingsNormal',
    fast: 'settingsFast',
    language: 'settingsLanguage',
    ja: 'settingsJa',
    en: 'settingsEn',
    account: 'settingsAccount',
    logout: 'settingsLogout',
  })
  const username = useAccountStore((s) => s.username)
  const navigate = useNavigate()

  const [bgm, setBgm] = useState(80)
  const [se, setSe] = useState(80)
  const [textSpeed, setTextSpeed] = useState<(typeof TEXT_SPEEDS)[number]>('normal')
  const [lang, setLang] = useState<(typeof LANGS)[number]>('ja')
  const [pending, setPending] = useState(false)

  const handleLogout = async () => {
    if (pending) return
    setPending(true)
    await logout()
    navigate(paths.start, { replace: true })
  }

  return (
    <div className="system-settings">
      <SettingsSlider label={t.bgm} value={bgm} onChange={setBgm} />
      <SettingsSlider label={t.se} value={se} onChange={setSe} />
      <SettingsSegment
        label={t.textSpeed}
        options={TEXT_SPEEDS.map((v) => ({ value: v, label: t[v] }))}
        value={textSpeed}
        onChange={setTextSpeed}
      />
      <SettingsSegment
        label={t.language}
        options={LANGS.map((v) => ({ value: v, label: t[v] }))}
        value={lang}
        onChange={setLang}
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
    </div>
  )
}
