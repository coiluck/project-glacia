import { isActionWait, isPhaseWait } from '../../../features/tutorial/guide'
import type { GuideFocus, GuideStep } from '../../../features/tutorial/guide'
import type { Axial } from '../../../features/battle/hex'
import Guide from '../../../components/common/Guide'
import { hexShape, uiTarget } from '../../../components/common/guideTarget'
import type { GuideTarget } from '../../../components/common/guideTarget'

const tileTop = (pos: Axial) =>
  document.querySelector(`.hex-tile[data-q="${pos.q}"][data-r="${pos.r}"] .hex-top`)

// 注目箇所を実画面の座標に直す
function resolveFocus(
  focus: GuideFocus,
  unitPos: (unitId: string) => Axial | undefined,
  scale: number,
): GuideTarget | null {
  if ('tile' in focus) {
    const b = tileTop(focus.tile)?.getBoundingClientRect()
    if (!b) return null
    return {
      holes: [{ pts: hexShape(b, 6 * scale), ring: hexShape(b, 3 * scale) }],
      arrow: [b.left + b.width / 2, b.top],
    }
  }
  if ('unit' in focus) {
    const pos = unitPos(focus.unit)
    const tile = pos && tileTop(pos)?.getBoundingClientRect()
    const body = document
      .querySelector(`.battle-unit[data-unit-id="${focus.unit}"] .battle-unit-body`)
      ?.getBoundingClientRect()
    if (!tile || !body) return null
    return {
      holes: [
        { pts: hexShape(tile, 6 * scale), ring: hexShape(tile, 3 * scale) },
        // 絵のまわりは楕円で抜く（四角だと角が目立つので）
        {
          ellipse: [
            body.left + body.width / 2,
            body.top + body.height / 2,
            body.width * 0.58,
            body.height * 0.6,
          ],
        },
      ],
      arrow: [body.left + body.width / 2, body.top],
    }
  }
  if ('highlight' in focus) {
    const tops = [...document.querySelectorAll(`.hex-tile.is-${focus.highlight} .hex-top`)].map((el) =>
      el.getBoundingClientRect(),
    )
    if (tops.length === 0) return null
    return { holes: tops.map((b) => ({ pts: hexShape(b, 2 * scale) })), arrow: [tops[0].left + tops[0].width / 2, tops[0].top] }
  }
  return uiTarget(focus.ui, scale)
}

interface BattleGuideProps {
  step: GuideStep
  index: number
  total: number
  text: string // 翻訳済みの台詞
  speakerId?: string // CharacterMaster.id
  speakerName: string
  nudge: number
  unitPos: (unitId: string) => Axial | undefined
  onNext: () => void
}

// 戦闘中のガイド
export default function BattleGuide({ step, unitPos, ...props }: BattleGuideProps) {
  const kind = step.wait === 'tap' ? 'tap' : isPhaseWait(step.wait) ? 'wait' : 'action'
  const dragCharId =
    step.dragHint && isActionWait(step.wait) && step.wait.type === 'deploy' ? step.wait.charId : undefined

  return (
    <Guide
      {...props}
      kind={kind}
      delay={step.delay}
      targets={(scale) =>
        (step.focus ?? [])
          .map((f) => resolveFocus(f, unitPos, scale))
          .filter((f): f is GuideTarget => f !== null)
      }
      dragCharId={dragCharId}
    />
  )
}
