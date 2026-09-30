import { Fragment, type ReactNode } from 'react'

export type MissionTab = 'daily' | 'permanent'

type Props = {
  tab: MissionTab
  counts: Record<MissionTab, number> // 受け取れる数
  labels: { tabDaily: string; tabPermanent: string }
  onChange: (tab: MissionTab) => void
}

const ICONS: Record<MissionTab, ReactNode> = {
  daily: (
    <svg viewBox="0 0 24 24">
      <rect x="3.5" y="5" width="17" height="15.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M8.5 14.5l2.5 2.5 4.5-4.5" />
    </svg>
  ),
  permanent: (
    <svg viewBox="0 0 24 24">
      <path d="M8 3h8l-1.5 6h-5z" />
      <circle cx="12" cy="15" r="5.5" />
      <path d="M12 12.2l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2-1.45-1.4 2-.3z" />
    </svg>
  ),
}

// 下のデイリー / 永続の切り替え
export default function MissionTabBar({ tab, counts, labels, onChange }: Props) {
  const tabs: { key: MissionTab; label: string }[] = [
    { key: 'daily', label: labels.tabDaily },
    { key: 'permanent', label: labels.tabPermanent },
  ]

  return (
    <nav className="mission-tabbar">
      {tabs.map((it, index) => (
        <Fragment key={it.key}>
          <div
            className="mission-tab-container"
            onClick={() => onChange(it.key)}
          >
            <button
              type="button"
              className={`mission-tab${tab === it.key ? ' is-active' : ''}`}
            >
              {ICONS[it.key]}
              {it.label}
              {counts[it.key] > 0 && <span className="mission-tab-badge">{counts[it.key]}</span>}
            </button>
          </div>

          {index < tabs.length - 1 &&
            <div className="mission-tab-separator" />
          }
        </Fragment>
      ))}
    </nav>
  )
}
