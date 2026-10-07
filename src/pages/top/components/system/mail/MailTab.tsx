// メール：届いたものの一覧と、まとめて受け取り
import { useTranslations } from '../../../../../i18n'
import { useMails } from '../../../../../features/mail/useMails'
import { useStaminaStore } from '../../../../../stores/staminaStore'
import { withNumbers } from '../format'
import MailReward from './MailReward'

const DAY = 24 * 60 * 60

export default function MailTab() {
  const t = useTranslations('system', {
    claimable: 'mailClaimable',
    empty: 'mailEmpty',
    daysLeft: 'mailDaysLeft',
    claimed: 'mailClaimed',
    claimAll: 'mailClaimAll',
  })
  const mails = useMails()
  const now = useStaminaStore((s) => s.now)
  const claimable = mails.filter((m) => !m.claimed).length

  return (
    <>
      <p className="system-panel-summary">{t.claimable && withNumbers(t.claimable, claimable)}</p>
      {mails.length === 0 ? (
        <p className="system-panel-empty">{t.empty}</p>
      ) : (
        <div className="system-mail-list">
          {mails.map((m) => {
            const days = Math.ceil((m.expiresAt - now) / DAY)
            return (
              <div key={m.id} className={`system-mail-row system-notch${m.claimed ? ' is-claimed' : ''}`}>
                <i className={`system-dot${m.claimed ? ' is-off' : ''}`} />
                <div className="system-mail-main">
                  <span className="system-mail-from">{m.from}</span>
                  <span className="system-mail-subject">{m.subject}</span>
                </div>
                <span className={`system-mail-limit${!m.claimed && days <= 1 ? ' is-soon' : ''}`}>
                  {m.claimed ? t.claimed : t.daysLeft && withNumbers(t.daysLeft, days)}
                </span>
                {m.rewards.map((r, i) => (
                  <MailReward key={i} reward={r} />
                ))}
              </div>
            )
          })}
        </div>
      )}
      <div className="system-panel-foot">
        <button type="button" className="system-button is-primary" disabled={claimable === 0}>
          {t.claimAll}
        </button>
      </div>
    </>
  )
}
