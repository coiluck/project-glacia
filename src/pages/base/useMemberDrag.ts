import { useEffect, useEffectEvent, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

// 押してからこれだけ動いたらドラッグにする。動かなければただのクリック
const DRAG_THRESHOLD = 8

// 持ち上げ中の状態。x/y はクライアント座標でのゴーストの吊り下げ位置
export interface MemberDragState {
  pointerId: number // このドラッグを握っているポインタ。他の指・他のボタンは無視する
  id: string // 持ち上げているキャラ
  startX: number
  startY: number
  active: boolean // しきい値を超えて動いた
  x: number
  y: number
  target: string | null // 吸着中のマスの axialKey。null ならマウス追従
}

export interface DragHandlers {
  onPointerDown: (e: ReactPointerEvent<HTMLElement>) => void
}

// ドラッグを終えた直後のクリックを捨てる。盤面のマスを選んだり、欄を閉じたりさせない
function swallowNextClick() {
  const stop = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }
  window.addEventListener('click', stop, { capture: true, once: true })
  setTimeout(() => window.removeEventListener('click', stop, { capture: true }), 0)
}

// 基地のキャラを持ち上げて盤面のマスに置く（戦闘の DeployDock と同じ作り）
// 一覧の行と盤面のちび絵の両方から握れる。canStand が通るマスにだけ吸着する
// 押した後の動き・離す・中断は window で受ける。握った要素が描き直しで消えても、ゴーストが残らないように
export function useMemberDrag(canStand: (id: string, key: string) => boolean, onDrop: (id: string, key: string) => void) {
  const ghostRef = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState<MemberDragState | null>(null)

  // ポインタ位置から吸着先を探す
  const track = (id: string, clientX: number, clientY: number): Pick<MemberDragState, 'x' | 'y' | 'target'> => {
    // 吸着はカーソルではなく足元で判定
    const footY = clientY + (ghostRef.current?.getBoundingClientRect().height ?? 0)

    // 建物の絵や貯まった数の札に隠れたマスも拾えるように、重なっている要素を上から順に見る
    let tile: Element | null = null
    for (const el of document.elementsFromPoint(clientX, footY)) {
      if (el.closest('.base-left')) break // 一覧の下に隠れたマスには置かない
      tile = el.closest('.base-tile')
      if (tile) break
    }
    const key = tile?.getAttribute('data-key')
    const top = tile?.querySelector('.base-tile-top')
    if (key && top && canStand(id, key)) {
      const box = top.getBoundingClientRect()
      return { x: box.left + box.width / 2, y: box.top + box.height / 2, target: key }
    }
    return { x: clientX, y: clientY, target: null }
  }

  const onMove = useEffectEvent((e: PointerEvent) => {
    if (drag?.pointerId !== e.pointerId) return
    if (!drag.active && Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) < DRAG_THRESHOLD) return
    setDrag({ ...drag, ...track(drag.id, e.clientX, e.clientY), active: true })
  })

  const onUp = useEffectEvent((e: PointerEvent) => {
    if (drag?.pointerId !== e.pointerId) return
    if (drag.active) {
      // 直前の pointermove の setDrag がまだ描画に反映されていないことがあるので、離した位置で判定し直す
      const { target } = track(drag.id, e.clientX, e.clientY)
      if (target) onDrop(drag.id, target)
      swallowNextClick()
    }
    setDrag(null)
  })

  const holding = drag !== null
  useEffect(() => {
    if (!holding) return
    const move = (e: PointerEvent) => onMove(e)
    const up = (e: PointerEvent) => onUp(e)
    // 指が離れずに中断されたときや、別のウィンドウへ移ったときは置かずにやめる
    const cancel = () => setDrag(null)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', cancel)
    window.addEventListener('blur', cancel)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', cancel)
      window.removeEventListener('blur', cancel)
    }
  }, [holding])

  const handlers = (id: string, enabled: boolean): DragHandlers => ({
    onPointerDown: (e) => {
      // 主ボタン以外と、掴んでいる最中の2本目の指は無視する
      if (!enabled || e.button !== 0 || drag) return
      // 指で握ったときに、ポインタイベントが押した要素から離れないようにする
      e.currentTarget.setPointerCapture(e.pointerId)
      setDrag({
        pointerId: e.pointerId,
        id,
        startX: e.clientX,
        startY: e.clientY,
        active: false,
        x: e.clientX,
        y: e.clientY,
        target: null,
      })
    },
  })

  return { drag: drag?.active ? drag : null, ghostRef, handlers, cancel: () => setDrag(null) }
}
