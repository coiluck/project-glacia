import { useState } from 'react'
import { logout } from '../../../api/actions/auth'
import { useTranslations } from '../../../i18n'
import ViewportLayer from '../../../layouts/ViewportLayer'
import { useAccountStore } from '../../../stores/accountStore'

interface AccountPanelProps {
  onClose: () => void
  onLoggedOut: () => void
}

// アカウント管理画面
export default function AccountPanel({ onClose, onLoggedOut }: AccountPanelProps) {
  const t = useTranslations('start', {
    manageAccount: 'manageAccount',
    name: 'name',
    transferCode: 'transferCode',
    transferNote: 'transferNote',
    logout: 'logout',
  })
  const c = useTranslations('common', { close: 'close' })

  const id = useAccountStore((s) => s.id)
  const username = useAccountStore((s) => s.username)
  const [pending, setPending] = useState(false)

  const handleLogout = async () => {
    if (pending) return
    setPending(true)
    await logout()
    onLoggedOut()
  }

  // セーフエリア内だと scale が二重に掛かってサイズが狂うため、
  // 規約・クレジットのmodalと同じくビューポート層へ出す
  return (
    <ViewportLayer>
      <div className="start-actions-overlay fade-in" onClick={onClose}>
        <div className="start-actions-modal fade-in" onClick={(e) => e.stopPropagation()}>
          <h2 className="start-actions-title">{t.manageAccount}</h2>

          <dl className="start-account-rows">
            <dt>{t.name}</dt>
            <dd>{username ?? '---'}</dd>
            <dt>{t.transferCode}</dt>
            <dd>{id ?? '---'}</dd>
          </dl>

          <p className="start-account-note">{t.transferNote}</p>

          <div className="start-account-buttons">
            <button type="button" className="start-actions-close" onClick={handleLogout} disabled={pending}>
              {t.logout}
            </button>
            <button type="button" className="start-actions-close" onClick={onClose}>
              {c.close}
            </button>
          </div>
        </div>
      </div>
    </ViewportLayer>
  )
}
