import type { RefObject } from 'react'
import ViewportLayer from '../../../layouts/ViewportLayer'
import type { MemberDragState } from '../useMemberDrag'
import { chibiUrl } from '../view'

// 持ち上げているキャラ。マスの上では is-snapped でピタッと止まる
export default function MemberGhost({ drag, ghostRef }: { drag: MemberDragState | null; ghostRef: RefObject<HTMLDivElement | null> }) {
  return (
    <ViewportLayer>
      {drag && (
        <div
          ref={ghostRef}
          className={`base-ghost${drag.target ? ' is-snapped' : ''}`}
          style={{ transform: `translate(${drag.x}px, ${drag.y}px)` }}
        >
          <div className="base-ghost-swing">
            <img className="base-ghost-body" src={chibiUrl(drag.id)} alt="" draggable={false} />
          </div>
        </div>
      )}
    </ViewportLayer>
  )
}
