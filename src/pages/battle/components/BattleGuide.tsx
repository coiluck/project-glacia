import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { isActionWait, isPhaseWait } from '../../../features/tutorial/guide'
import type { GuideFocus, GuideStep } from '../../../features/tutorial/guide'
import type { Axial } from '../../../features/battle/hex'
import ViewportLayer from '../../../layouts/ViewportLayer'

// 1文字あたりの表示間隔
const TYPE_MS = 28

type Point = [number, number]

// 背景オーバーレイに開ける穴。pts か ellipse のどちらか。ring があればその形で枠を描く
interface Hole {
  pts?: Point[]
  ellipse?: [number, number, number, number] // cx, cy, rx, ry
  ring?: Point[]
}

interface ResolvedFocus {
  holes: Hole[]
  arrow: Point // 矢印の先端
  below?: boolean // 上に余白が無いので下から指す
  box?: DOMRect
}

// 画面の拡大率。ScreenFrame が :root に置いている
const readScale = () =>
  Number(getComputedStyle(document.documentElement).getPropertyValue('--scale')) || 1

// タイルの天面の外接矩形から六角形（縦圧縮込みの pointy-top）を作る
function hexShape(b: DOMRect, grow: number): Point[] {
  const x = b.left - grow
  const y = b.top - grow
  const w = b.width + grow * 2
  const h = b.height + grow * 2
  const cx = x + w / 2
  const cy = y + h / 2
  return [
    [cx + w / 2, cy - h / 4],
    [cx + w / 2, cy + h / 4],
    [cx, y + h],
    [cx - w / 2, cy + h / 4],
    [cx - w / 2, cy - h / 4],
    [cx, y],
  ]
}

// 右下を切り欠いた矩形。戦闘 UI のパネルと同じ形
function rectShape(b: DOMRect, pad: number, cut: number): Point[] {
  const x = b.left - pad
  const y = b.top - pad
  const w = b.width + pad * 2
  const h = b.height + pad * 2
  return [
    [x, y],
    [x + w, y],
    [x + w, y + h - cut],
    [x + w - cut, y + h],
    [x, y + h],
  ]
}

const tileTop = (pos: Axial) =>
  document.querySelector(`.hex-tile[data-q="${pos.q}"][data-r="${pos.r}"] .hex-top`)

// 注目箇所を実画面の座標に直す
function resolveFocus(
  focus: GuideFocus,
  unitPos: (unitId: string) => Axial | undefined,
  scale: number,
): ResolvedFocus | null {
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
  const b = document.querySelector(`[data-guide="${focus.ui}"]`)?.getBoundingClientRect()
  if (!b) return null
  const below = b.top < 130 * scale
  return {
    holes: [{ pts: rectShape(b, 14 * scale, 14 * scale), ring: rectShape(b, 10 * scale, 14 * scale) }],
    arrow: [b.left + b.width / 2, below ? b.bottom + 10 * scale : b.top - 10 * scale],
    below,
    box: b,
  }
}

const toPoints = (pts: Point[]) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')

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

export default function BattleGuide({
  step,
  index,
  total,
  text,
  speakerId,
  speakerName,
  nudge,
  unitPos,
  onNext,
}: BattleGuideProps) {
  const kind = step.wait === 'tap' ? 'tap' : isPhaseWait(step.wait) ? 'phase' : 'action'
  const isLast = index === total - 1
  const dragCharId =
    step.dragHint && isActionWait(step.wait) && step.wait.type === 'deploy' ? step.wait.charId : undefined

  // ステップが変わったら表示の状態を最初に戻す
  const [seen, setSeen] = useState(index)
  const [shown, setShown] = useState(!step.delay)
  const [typed, setTyped] = useState(0)
  const [leaving, setLeaving] = useState(false)
  if (seen !== index) {
    setSeen(index)
    setShown(!step.delay)
    setTyped(0)
    setLeaving(false)
  }
  const typedAll = text !== '' && typed >= text.length

  // delay の間は出さない
  useEffect(() => {
    if (shown) return
    const id = setTimeout(() => setShown(true), step.delay)
    return () => clearTimeout(id)
  }, [shown, step.delay])

  // 台詞を1文字ずつ出す
  useEffect(() => {
    if (!shown || typed >= text.length) return
    const id = setTimeout(() => setTyped((n) => n + 1), TYPE_MS)
    return () => clearTimeout(id)
  }, [shown, typed, text])

  // 説明ステップはどこをタップしても次へ。ゲーム側には届けない
  const onTap = useEffectEvent(() => {
    if (!shown || leaving || text === '') return
    if (!typedAll) setTyped(text.length)
    else if (isLast) setLeaving(true) // 吹き出しが消えきってから onNext
    else onNext()
  })
  useEffect(() => {
    if (kind !== 'tap') return
    const swallow = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      if (e.type === 'click') onTap()
    }
    document.addEventListener('pointerdown', swallow, true)
    document.addEventListener('click', swallow, true)
    return () => {
      document.removeEventListener('pointerdown', swallow, true)
      document.removeEventListener('click', swallow, true)
    }
  }, [kind, index])

  // 違う操作をしたら、枠を光らせて吹き出しを揺らす
  const layerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const layer = layerRef.current
    const box = boxRef.current
    if (!nudge || !layer || !box) return
    layer.classList.add('is-nudge')
    box.classList.remove('is-nudge')
    void box.offsetWidth // 連続で来てもアニメーションを頭から流す
    box.classList.add('is-nudge')
    const id = setTimeout(() => layer.classList.remove('is-nudge'), 250)
    return () => clearTimeout(id)
  }, [nudge])

  // 背景オーバーレイの穴・枠・矢印。実画面座標を毎フレーム取り直す
  const holesRef = useRef<SVGGElement>(null)
  const ringsRef = useRef<SVGGElement>(null)
  const pointerRef = useRef<SVGGElement>(null)
  const blurRef = useRef<SVGFEGaussianBlurElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const getUnitPos = useEffectEvent((unitId: string) => unitPos(unitId))
  useEffect(() => {
    const holesEl = holesRef.current!
    const ringsEl = ringsRef.current!
    const pointerEl = pointerRef.current!
    const clear = () => {
      holesEl.innerHTML = ''
      ringsEl.innerHTML = ''
      pointerEl.innerHTML = ''
    }
    if (!shown || leaving || !step.focus) {
      clear()
      return
    }
    const focusList = step.focus
    let raf = 0
    let structure = ''
    let dragKey = ''
    let dragAnim: Animation | null = null

    const frame = () => {
      raf = requestAnimationFrame(frame)
      const scale = readScale()
      const focus = focusList
        .map((f) => resolveFocus(f, getUnitPos, scale))
        .filter((f): f is ResolvedFocus => f !== null)
      const holes = focus.flatMap((f) => f.holes)
      const rings = holes.filter((h) => h.ring)
      const head = focus[0]

      // 数が変わったときだけ作り直す。枠の登場アニメーションを毎フレーム流し直さないため
      const nextStructure = `${holes.map((h) => (h.ellipse ? 'e' : 'p')).join('')}:${!!head}:${!!head?.below}`
      if (nextStructure !== structure) {
        structure = nextStructure
        holesEl.innerHTML = holes.map((h) => (h.ellipse ? '<ellipse fill="#000"/>' : '<polygon fill="#000"/>')).join('')
        ringsEl.innerHTML = rings.map(() => '<polygon class="battle-guide-ring"/>').join('')
        pointerEl.innerHTML = head
          ? '<g><g class="battle-guide-pointer"><path d="M-20 -34 L20 -34 L0 0 Z"/></g></g>'
          : ''
      }
      holes.forEach((h, i) => {
        const el = holesEl.children[i]
        if (h.pts) el.setAttribute('points', toPoints(h.pts))
        else h.ellipse!.forEach((v, j) => el.setAttribute(['cx', 'cy', 'rx', 'ry'][j], v.toFixed(1)))
      })
      rings.forEach((h, i) => ringsEl.children[i].setAttribute('points', toPoints(h.ring!)))
      if (head) {
        const [x, y] = head.arrow
        const dy = (head.below ? 8 : -8) * scale
        pointerEl.firstElementChild!.setAttribute(
          'transform',
          `translate(${x.toFixed(1)},${(y + dy).toFixed(1)}) scale(${scale})${head.below ? ' rotate(180)' : ''}`,
        )
      }
      blurRef.current?.setAttribute('stdDeviation', (5 * scale).toFixed(2))

      // 配置のお手本。focus[1]（ドックの顔）から focus[0]（マス）へちび絵を飛ばす。画面サイズが変わったら作り直す
      const nextDragKey = dragCharId && focus.length === 2 && focus[1].box ? `${innerWidth}x${innerHeight}` : ''
      if (nextDragKey !== dragKey) {
        dragKey = nextDragKey
        dragAnim?.cancel()
        dragAnim = null
        if (nextDragKey && dragRef.current) {
          const face = focus[1].box!
          const [fx, fy] = [face.left + face.width / 2, face.top + face.height * 0.8]
          const tile = focus[0].holes[0].pts!
          const [tx, ty] = [tile[5][0], (tile[5][1] + tile[2][1]) / 2]
          dragAnim = dragRef.current.animate(
            [
              { transform: `translate(${fx}px, ${fy}px)`, opacity: 0 },
              { transform: `translate(${fx}px, ${fy}px)`, opacity: 0.85, offset: 0.12 },
              { transform: `translate(${tx}px, ${ty}px)`, opacity: 0.85, offset: 0.7 },
              { transform: `translate(${tx}px, ${ty}px)`, opacity: 0 },
            ],
            { duration: 1900, iterations: Infinity, easing: 'ease-in-out' },
          )
        }
      }
    }
    frame()
    return () => {
      cancelAnimationFrame(raf)
      dragAnim?.cancel()
      clear()
    }
  }, [shown, leaving, step, dragCharId])

  const base = import.meta.env.BASE_URL

  return (
    <ViewportLayer>
      <div ref={layerRef} className={`battle-guide${shown && !leaving ? ` is-${kind}` : ''}`}>
        <svg className="battle-guide-veil" aria-hidden>
          <defs>
            <filter id="battle-guide-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur ref={blurRef} stdDeviation={5} />
            </filter>
            <mask id="battle-guide-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              <rect width="100%" height="100%" fill="#fff" />
              <g ref={holesRef} filter="url(#battle-guide-soft)" />
            </mask>
          </defs>
          <rect className="battle-guide-veil-fill" width="100%" height="100%" mask="url(#battle-guide-mask)" />
          <g ref={ringsRef} />
          <g ref={pointerRef} />
        </svg>

        {dragCharId && (
          <div ref={dragRef} className="battle-guide-drag-hint">
            <img src={`${base}images/character/chibi/${dragCharId}.png`} alt="" draggable={false} />
          </div>
        )}

        {/* 吹き出しは設計座標で置く */}
        <div className="battle-guide-safe">
          <div
            key={index}
            className={`battle-guide-box-wrap is-${kind}${shown ? (leaving ? ' is-out' : ' is-in') : ''}`}
            onAnimationEnd={(e) => {
              if (e.animationName === 'battle-guide-box-out') onNext()
            }}
          >
            <div ref={boxRef} className={`battle-guide-box battle-panel${typedAll ? ' is-typed' : ''}`}>
              {/* 喋るキャラがいなければ背景だけ */}
              <div className="battle-guide-portrait">
                {speakerId && (
                  <img src={`${base}images/character/face/${speakerId}.png`} alt="" draggable={false} />
                )}
              </div>
              <div className="battle-guide-main">
                <div className="battle-guide-head">
                  <span className="battle-guide-name">{speakerName}</span>
                  <span className="battle-label battle-guide-count">
                    TUTORIAL {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>
                <p className="battle-guide-text">{text.slice(0, typed)}</p>
              </div>
              <span className="battle-guide-next">TAP</span>
            </div>
          </div>
        </div>
      </div>
    </ViewportLayer>
  )
}
