// メール：左に届いたものの一覧、右に選んだ1通の本文と、添付をまとめた柱
import { useState } from 'react'
import { claimMail } from '../../../../../api/actions/mail'
import { MAILS } from '../../../../../data/mails'
import type { MailPayload } from '../../../../../features/contract'
import { useMails } from '../../../../../hooks/useMails'
import { fill, useTranslations } from '../../../../../i18n'
import { useStaminaStore } from '../../../../../stores/staminaStore'
import { withNumbers } from '../format'
import MailReward, { MailChip } from './MailReward'

const DAY = 24 * 60 * 60

const TEXT_MAPPING = Object.fromEntries(
  MAILS.flatMap((m) => ['from', 'title', 'body'].map((part) => [`${m.id}.${part}`, `${m.id}.${part}`])),
)

// 2027/01/01 のように年月日で出す
const dateOf = (seconds: number) => {
  const d = new Date(seconds * 1000)
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map((n) => String(n).padStart(2, '0')).join('/')
}

export default function MailTab() {
  const t = useTranslations('system', {
    claimable: 'mailClaimable',
    empty: 'mailEmpty',
    daysLeft: 'mailDaysLeft',
    claimed: 'mailClaimed',
    claim: 'mailClaim',
    claimAll: 'mailClaimAll',
    expires: 'mailExpires',
  })
  const text = useTranslations('mail', TEXT_MAPPING)
  const mails = useMails()
  const now = useStaminaStore((s) => s.now)
  const claimable = mails.filter((m) => !m.claimed).length

  // 開いたときは、まだ受け取っていないものを先に見せる
  const [selectedId, setSelectedId] = useState(() => (mails.find((m) => !m.claimed) ?? mails[0])?.id)
  const selected = mails.find((m) => m.id === selectedId) ?? mails[0]
  const [pending, setPending] = useState(false)

  const claim = async (payload: MailPayload) => {
    if (pending) return
    setPending(true)
    try {
      await claimMail(payload)
    } catch (e) {
      console.error(e)
    } finally {
      setPending(false)
    }
  }

  if (!selected) return <p className="system-panel-empty">{t.empty}</p>

  return (
    <>
      <p className="system-panel-summary">{t.claimable && withNumbers(t.claimable, claimable)}</p>
      <div className="system-mail">
        <div className="system-mail-list">
          {mails.map((m) => {
            const days = Math.ceil((m.expiresAt - now) / DAY)
            return (
              <button
                key={m.id}
                type="button"
                className={`system-mail-row${m.id === selected.id ? ' is-selected' : ''}${m.claimed ? ' is-claimed' : ''}`}
                onClick={() => setSelectedId(m.id)}
              >
                <span className="system-mail-row-title">{text[`${m.id}.title`]}</span>
                <span className="system-mail-row-sub">
                  <i className={`system-dot${m.claimed ? ' is-off' : ''}`} />
                  <span className={!m.claimed && days <= 1 ? 'is-soon' : undefined}>
                    {m.claimed ? t.claimed : fill(t.daysLeft, days)}
                  </span>
                </span>
                <span className="system-mail-row-rewards">
                  {m.rewards.map((r, i) => (
                    <MailChip key={i} reward={r} />
                  ))}
                </span>
              </button>
            )
          })}
        </div>

        <article className="system-mail-body">
          <div className="system-mail-letter">
            <h3>{text[`${selected.id}.title`]}</h3>
            <p className="system-mail-text">{text[`${selected.id}.body`]}</p>
          </div>
          <div className="system-mail-attach">
            <div className="system-mail-rewards">
              {selected.rewards.map((r, i) => (
                <MailReward key={i} reward={r} />
              ))}
            </div>
            <div className="system-mail-foot">
              <span className="system-mail-expires">{fill(t.expires, dateOf(selected.expiresAt))}</span>
              <button
                type="button"
                className="system-mail-claim"
                disabled={selected.claimed || pending}
                onClick={() => claim({ kind: 'claim', id: selected.id })}
              >
                {selected.claimed ? t.claimed : t.claim}
              </button>
            </div>
          </div>
        </article>
      </div>
      <div className="system-panel-foot">
        <button
          type="button"
          className="system-button is-primary"
          disabled={claimable === 0 || pending}
          onClick={() => claim({ kind: 'claimAll' })}
        >
          {t.claimAll}
        </button>
      </div>
    </>
  )
}
