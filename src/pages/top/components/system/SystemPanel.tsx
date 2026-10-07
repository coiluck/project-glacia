// システムメニューから開くパネル全体
import { useState, type CSSProperties } from 'react'
import { useBackHandler } from '../../../../hooks/useBackHandler'
import { useTranslations } from '../../../../i18n'
import ViewportLayer from '../../../../layouts/ViewportLayer'
import { useClaimableMailCount } from '../../../../features/mail/useMails'
import { useUnreadNewsCount } from '../../../../features/news/newsReadStore'
import { SYSTEM_TABS, SYSTEM_TAB_LABELS, type SystemTabKey } from './tabs'
import NewsTab from './news/NewsTab'
import MailTab from './mail/MailTab'
import ScenarioTab from './scenario/ScenarioTab'
import SettingsTab from './settings/SettingsTab'

interface SystemPanelProps {
  initialTab: SystemTabKey
  onClose: () => void
}

export default function SystemPanel({ initialTab, onClose }: SystemPanelProps) {
  const t = useTranslations('system', SYSTEM_TAB_LABELS)
  const [tab, setTab] = useState<SystemTabKey>(initialTab)

  // タブに出す件数
  const counts: Partial<Record<SystemTabKey, number>> = {
    news: useUnreadNewsCount(),
    mail: useClaimableMailCount(),
  }

  useBackHandler(() => {
    onClose()
    return true
  })

  return (
    <ViewportLayer>
      <div className="system-panel fade-in">
        <div className="system-panel-back resource-bar-move-container">
          <button type="button" className="resource-bar-move-button back-button" onClick={onClose} />
        </div>

        <div className="system-panel-safe">
          <nav className="system-panel-tabs">
            {SYSTEM_TABS.map((it) => (
              <button
                key={it.key}
                type="button"
                className={`system-panel-tab${it.key === tab ? ' is-active' : ''}`}
                style={{ '--icon-url': `url(${import.meta.env.BASE_URL}${it.icon})` } as CSSProperties}
                onClick={() => setTab(it.key)}
              >
                <i />
                {t[it.labelKey]}
                {!!counts[it.key] && <span className="system-panel-tab-count">{counts[it.key]}</span>}
              </button>
            ))}
          </nav>

          <div className="system-panel-body">
            {tab === 'news' && <NewsTab />}
            {tab === 'mail' && <MailTab />}
            {tab === 'scenario' && <ScenarioTab />}
            {tab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </ViewportLayer>
  )
}
