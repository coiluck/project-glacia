import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { PartyMember } from '../../../features/characters/build'
import type { Axial } from '../../../features/battle/hex'
import ViewportLayer from '../../../layouts/ViewportLayer'

// ちび絵の足元が画像の top 何%の位置にあるか
// deploy.css の .is-snapped の translateY とそろえる
const FOOT_RATIO = 0.9

// 持ち上げ中の状態。x/y はクライアント座標でのゴーストの吊り下げ位置
interface DragState {
  pointerId: number // このドラッグを握っているポインタ。他の指・他のボタンは無視する
  index: number
  x: number
  y: number
  target: Axial | null // 吸着中の配置先。null ならマウス追従
}

interface DeployDockProps {
  party: PartyMember[]
  isDeployed: (charId: string) => boolean
  hint: string
  startLabel: string
  canStart: boolean
  onStart: () => void
  onDeploy: (member: PartyMember, pos: Axial) => void
}

// 画面下に並んだ face をドラッグすると chibi がマウスにぶら下がる
// 配置可能マス（.hex-tile.is-deploy）の上でそのマスに吸着して、離すと配置される
export default function DeployDock({
  party,
  isDeployed,
  hint,
  startLabel,
  canStart,
  onStart,
  onDeploy,
}: DeployDockProps) {
  const ghostRef = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState<DragState | null>(null)

  // ポインタ位置から次のドラッグ状態を作る
  const track = (
    index: number,
    clientX: number,
    clientY: number,
  ): Omit<DragState, 'pointerId'> => {
    // 吸着はカーソルではなく足元で判定
    const ghostHeight = ghostRef.current?.getBoundingClientRect().height ?? 0
    const footY = clientY + ghostHeight * FOOT_RATIO

    // ドックに隠れたマスも拾えるように、重なっている要素を上から順に見る
    let tile: Element | null = null
    for (const el of document.elementsFromPoint(clientX, footY)) {
      tile = el.closest('.hex-tile.is-deploy')
      if (tile) break
    }
    if (tile) {
      const box = tile.getBoundingClientRect()
      return {
        index,
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
        target: {
          q: Number(tile.getAttribute('data-q')),
          r: Number(tile.getAttribute('data-r')),
        },
      }
    }
    return { index, x: clientX, y: clientY, target: null }
  }

  const handleDown = (index: number) => (e: ReactPointerEvent<HTMLElement>) => {
    // 右クリック等の主ボタン以外と、掴んでいる最中の2本目の指は無視する
    if (e.button !== 0 || drag) return

    e.currentTarget.setPointerCapture(e.pointerId)
    setDrag({ ...track(index, e.clientX, e.clientY), pointerId: e.pointerId, target: null })
  }

  const handleMove = (index: number) => (e: ReactPointerEvent<HTMLElement>) => {
    if (drag?.pointerId !== e.pointerId) return
    setDrag({ ...track(index, e.clientX, e.clientY), pointerId: e.pointerId })
  }

  const handleUp = (e: ReactPointerEvent<HTMLElement>) => {
    if (drag?.pointerId !== e.pointerId) return
    if (drag.target) onDeploy(party[drag.index], drag.target)
    setDrag(null)
  }

  const handleCancel = (e: ReactPointerEvent<HTMLElement>) => {
    if (drag?.pointerId !== e.pointerId) return
    setDrag(null)
  }

  const holding = drag ? party[drag.index] : null

  return (
    <div className="battle-deploy-layer">
      <div className="battle-deploy-dock">
        <p className="battle-deploy-hint">{hint}</p>
        <div className="battle-deploy-faces">
          {party.map((m, i) => {
            const deployed = isDeployed(m.character.id)
            return (
              <button
                key={m.character.id}
                type="button"
                className={`battle-deploy-face${deployed ? ' is-deployed' : ''}${drag?.index === i ? ' is-holding' : ''}`}
                disabled={deployed}
                onPointerDown={handleDown(i)}
                onPointerMove={handleMove(i)}
                onPointerUp={handleUp}
                onPointerCancel={handleCancel}
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/character/face/${m.character.id}.png`}
                  alt=""
                  draggable={false}
                />
              </button>
            )
          })}
        </div>
      </div>

      <button className="battle-button battle-deploy-start" disabled={!canStart} onClick={onStart}>
        {startLabel}
      </button>

      {/* 持ち上げているキャラ。マスの上では is-snapped でピタッと止まる */}
      <ViewportLayer>
        {drag && holding && (
          <div
            ref={ghostRef}
            className={`battle-deploy-ghost${drag.target ? ' is-snapped' : ''}`}
            style={{ transform: `translate(${drag.x}px, ${drag.y}px)` }}
          >
            <div className="battle-deploy-ghost-swing">
              <img
                className="battle-deploy-ghost-body"
                src={`${import.meta.env.BASE_URL}images/character/chibi/${holding.character.id}.png`}
                alt=""
                draggable={false}
              />
            </div>
          </div>
        )}
      </ViewportLayer>
    </div>
  )
}
