import { CEILING_PULLS } from '../../../data/gacha'
import { fill } from '../../../i18n'
import { dupeEffect } from '../dupe'
import type { RecruitTexts } from '../texts'

interface RecruitConfirmProps {
  name: string
  masterId: string
  dupe: number | null
  points: number
  pending: boolean
  onCancel: () => void
  onConfirm: () => void
  t: RecruitTexts
}

// 交換の確認
export default function RecruitConfirm({
  name,
  masterId,
  dupe,
  points,
  pending,
  onCancel,
  onConfirm,
  t,
}: RecruitConfirmProps) {
  return (
    <div className="recruit-confirm-back">
      <div className="recruit-confirm" role="dialog" aria-modal="true">
        <h2 className="recruit-confirm-title">{fill(t.confirmTitle, name)}</h2>
        <dl className="recruit-confirm-list">
          <dt>{t.points}</dt>
          <dd>
            <b>{points}</b> → <b>{points - CEILING_PULLS}</b>
          </dd>
          <dt>{t.confirmReceive}</dt>
          <dd>{dupeEffect(masterId, dupe, name, t)}</dd>
        </dl>
        <div className="recruit-confirm-actions">
          <button type="button" className="is-cancel" onClick={onCancel}>
            {t.cancel}
          </button>
          <button type="button" className="is-ok" disabled={pending} onClick={onConfirm}>
            {t.exchange}
          </button>
        </div>
      </div>
    </div>
  )
}
