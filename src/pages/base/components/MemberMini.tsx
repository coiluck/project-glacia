import { memberLimit } from '../../../features/base/base'
import { faceUrl } from '../view'
import type { BaseView, BoardMember } from '../view'

type Props = {
  view: BaseView
  members: BoardMember[]
  open: boolean // 大きい一覧を出している
  onOpen: () => void
}

export default function MemberMini({ view, members, open, onOpen }: Props) {
  const limit = memberLimit(view.clearedStageIds)

  return (
    <button type="button" className={`base-members-mini${open ? ' is-open' : ''}`} onClick={onOpen}>
      <span className="base-members-mini-head">
        <span>{view.t.memberStrip}</span>
      </span>
      <span className="base-members-mini-main">
        <span className="base-members-mini-faces">
          {Array.from({ length: limit }, (_, i) =>
            members[i] ? (
              <img key={i} src={faceUrl(members[i].id)} alt="" draggable={false} />
            ) : (
              <i key={i} />
            ),
          )}
        </span>
        <b>
          {members.length}
          <small>/ {limit}</small>
        </b>
      </span>
    </button>
  )
}
