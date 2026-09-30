// 画面下のシステムメニュー
import type { CSSProperties } from 'react'

const items = [
  { key: 'news', iconPath: 'images/top/menu/warning.svg', label: 'お知らせ' },
  { key: 'mail', iconPath: 'images/top/menu/mail.svg', label: 'メール' },
  { key: 'calendar', iconPath: 'images/top/menu/calendar.svg', label: 'カレンダー' },
  { key: 'friends', iconPath: 'images/top/menu/friend.svg', label: 'フレンド' },
  { key: 'settings', iconPath: 'images/top/menu/gear.svg', label: '設定' },
] as const

export default function SystemMenu() {
  return (
    <nav className="top-system-menu">
      {items.map((it) => (
        <button key={it.key} className="top-system-menu-item notice" type="button">
          <span
            className="top-system-menu-item-icon"
            style={{ '--icon-url': `url(${import.meta.env.BASE_URL}${it.iconPath})` } as CSSProperties}
          />
          <span className="top-system-menu-item-label">{it.label}</span>
        </button>
      ))}
    </nav>
  )
}
