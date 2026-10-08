import { CEILING_PULLS } from '../../../data/gacha'
import { dupeEffect } from '../dupe'

interface RecruitConfirmProps {
  name: string
  masterId: string
  dupe: number | null
  points: number
  pending: boolean
  onCancel: () => void
  onConfirm: () => void
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
}: RecruitConfirmProps) {
  return (
    <div className="recruit-confirm-back">
      <div className="recruit-confirm" role="dialog" aria-modal="true">
        <h2 className="recruit-confirm-title">{name}と交換する</h2>
        <dl className="recruit-confirm-list">
          <dt>交換pt</dt>
          <dd>
            <b>{points}</b> → <b>{points - CEILING_PULLS}</b>
          </dd>
          <dt>受け取り</dt>
          <dd>{dupeEffect(masterId, dupe, name)}</dd>
        </dl>
        <div className="recruit-confirm-actions">
          <button type="button" className="is-cancel" onClick={onCancel}>
            やめる
          </button>
          <button type="button" className="is-ok" disabled={pending} onClick={onConfirm}>
            交換する
          </button>
        </div>
      </div>
    </div>
  )
}
