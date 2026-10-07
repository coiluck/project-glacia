// 画面下のシステムメニュー
import { useState, type CSSProperties } from 'react'
import { useTranslations } from '../../../i18n'
import SystemPanel from './system/SystemPanel'
import { SYSTEM_TABS, SYSTEM_TAB_LABELS, type SystemTabKey } from './system/tabs'

export default function SystemMenu() {
  const t = useTranslations('system', SYSTEM_TAB_LABELS)

  // 開いているタブ
  const [opened, setOpened] = useState<SystemTabKey | null>(null)

  return (
    <>
      <nav className="top-system-menu">
        {SYSTEM_TABS.map((it) => (
          <button key={it.key} className="top-system-menu-item notice" type="button" onClick={() => setOpened(it.key)}>
            <span
              className="top-system-menu-item-icon"
              style={{ '--icon-url': `url(${import.meta.env.BASE_URL}${it.icon})` } as CSSProperties}
            />
            <span className="top-system-menu-item-label">{t[it.labelKey]}</span>
          </button>
        ))}
      </nav>
      {opened && <SystemPanel initialTab={opened} onClose={() => setOpened(null)} />}
    </>
  )
}
