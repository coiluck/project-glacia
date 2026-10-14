import { axialKey, neighbors } from '../../../features/battle/hex'
import type { BaseGuideFocus, BaseGuideStep } from '../../../features/tutorial/guide'
import Guide from '../../../components/common/Guide'
import { hexShape, uiTarget } from '../../../components/common/guideTarget'
import type { GuideTarget } from '../../../components/common/guideTarget'

// 注目箇所を実画面の座標に直す。pressable でなければマスは指すだけで押せない
function resolveFocus(focus: BaseGuideFocus, pressable: boolean, scale: number): GuideTarget | null {
  if ('ui' in focus) return uiTarget(focus.ui, scale)
  if ('around' in focus) {
    const tops = neighbors(focus.around)
      .map((n) => document.querySelector(`.base-tile[data-key="${axialKey(n)}"] .base-tile-top`)?.getBoundingClientRect())
      .filter((b): b is DOMRect => b !== undefined)
    if (tops.length === 0) return null
    return { holes: tops.map((b) => ({ pts: hexShape(b, 2 * scale) })), arrow: [tops[0].left + tops[0].width / 2, tops[0].top] }
  }
  const key = axialKey(focus.tile)
  const tile = document.querySelector(`.base-tile[data-key="${key}"]`)
  const b = tile?.querySelector('.base-tile-top')?.getBoundingClientRect()
  if (!tile || !b) return null
  const target: GuideTarget = {
    holes: [{ pts: hexShape(b, 6 * scale), ring: hexShape(b, 3 * scale) }],
    arrow: [b.left + b.width / 2, b.top],
    els: [],
  }
  // 建物の絵や立っているキャラは、まわりも抜いてそちらを指す
  const art = document.querySelector(`.base-art[data-key="${key}"]`)
  const member = document.querySelector(`.base-member[data-key="${key}"] .base-member-body`)
  for (const el of [art, member]) {
    if (!el) continue
    const a = el.getBoundingClientRect()
    target.holes.push({ ellipse: [a.left + a.width / 2, a.top + a.height / 2, a.width * 0.62, a.height * 0.62] })
    target.arrow = [a.left + a.width / 2, a.top]
  }
  if (pressable) target.els = art ? [tile, art] : [tile]
  return target
}

interface BaseGuideProps {
  step: BaseGuideStep
  index: number
  total: number
  text: string // 翻訳済みの台詞
  speakerName: string
  nudge: number
  onMiss: () => void
  onNext: () => void
}

// 基地のガイド。操作を待つ間は注目箇所の外を押せない
export default function BaseGuide({ step, ...props }: BaseGuideProps) {
  const wait = step.wait
  // マスを押せるのは、マスを押すのを待つときだけ。キャラを置く間に押すと一覧が閉じて進めなくなる
  const pressable = typeof wait === 'object' && 'select' in wait
  const dragCharId = step.dragHint && typeof wait === 'object' && 'place' in wait ? wait.place : undefined
  return (
    <Guide
      {...props}
      kind={wait === 'tap' ? 'tap' : 'action'}
      left={step.left}
      speakerId={step.speaker}
      targets={(scale) =>
        (step.focus ?? [])
          .map((f) => resolveFocus(f, pressable, scale))
          .filter((f): f is GuideTarget => f !== null)
      }
      dragCharId={dragCharId}
    />
  )
}
