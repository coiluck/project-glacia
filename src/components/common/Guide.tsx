import { useEffect, useEffectEvent, useRef, useState } from 'react'
import ViewportLayer from '../../layouts/ViewportLayer'
import { readScale } from './guideTarget'
import type { GuideTarget, Point } from './guideTarget'

// チュートリアルのガイド。背景を暗くして注目箇所に穴を開け、矢印と吹き出しを出す。
// どこを指すかはページごとに違うので、実画面の座標は呼び出し側が targets で返す（guideTarget.ts）

// 1文字あたりの表示間隔
const TYPE_MS = 28

const toPoints = (pts: Point[]) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')

interface GuideProps {
  index: number
  total: number
  // tap: 説明（どこかをタップで次へ）/ action: 操作を待つ / wait: 何かが起きるのを待つ
  kind: 'tap' | 'action' | 'wait'
  delay?: number // 出すまでの待ち時間（ms）
  left?: boolean // 吹き出しを左上に出す。右上の物を指すとき
  text: string // 翻訳済みの台詞
  speakerId?: string // CharacterMaster.id
  speakerName: string
  nudge: number // 変わったら揺らす
  targets: (scale: number) => GuideTarget[] // 注目箇所。毎フレーム呼ぶ。先頭に矢印が付く
  // 渡すと、操作を待つ間は注目箇所の外の入力を止めてこれを呼ぶ
  onMiss?: () => void
  dragCharId?: string // 配置のドラッグのお手本。targets[1] から targets[0] へちび絵を飛ばす
  onNext: () => void
}

export default function Guide({
  index,
  total,
  kind,
  delay,
  left,
  text,
  speakerId,
  speakerName,
  nudge,
  targets,
  onMiss,
  dragCharId,
  onNext,
}: GuideProps) {
  const isLast = index === total - 1

  // ステップが変わったら表示の状態を最初に戻す
  const [seen, setSeen] = useState(index)
  const [shown, setShown] = useState(!delay)
  const [typed, setTyped] = useState(0)
  const [leaving, setLeaving] = useState(false)
  if (seen !== index) {
    setSeen(index)
    setShown(!delay)
    setTyped(0)
    setLeaving(false)
  }
  const typedAll = text !== '' && typed >= text.length

  // delay の間は出さない
  useEffect(() => {
    if (shown) return
    const id = setTimeout(() => setShown(true), delay)
    return () => clearTimeout(id)
  }, [shown, delay])

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

  // 操作を待つ間、注目箇所の外の入力は止める（onMiss を渡したときだけ）
  const isAllowed = useEffectEvent((target: EventTarget | null) => {
    if (!(target instanceof Node)) return false
    return targets(readScale()).some((f) => f.els?.some((el) => el.contains(target)))
  })
  const miss = useEffectEvent(() => onMiss?.())
  const blocks = kind === 'action' && onMiss !== undefined
  useEffect(() => {
    if (!blocks) return
    const guard = (e: Event) => {
      if (isAllowed(e.target)) return
      e.stopPropagation()
      e.preventDefault()
      if (e.type === 'pointerdown') miss()
    }
    document.addEventListener('pointerdown', guard, true)
    document.addEventListener('click', guard, true)
    return () => {
      document.removeEventListener('pointerdown', guard, true)
      document.removeEventListener('click', guard, true)
    }
  }, [blocks, index])

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
  const getTargets = useEffectEvent((scale: number) => targets(scale))
  useEffect(() => {
    const holesEl = holesRef.current!
    const ringsEl = ringsRef.current!
    const pointerEl = pointerRef.current!
    const clear = () => {
      holesEl.innerHTML = ''
      ringsEl.innerHTML = ''
      pointerEl.innerHTML = ''
    }
    if (!shown || leaving) {
      clear()
      return
    }
    let raf = 0
    let structure = ''
    let dragKey = ''
    let dragAnim: Animation | null = null

    const frame = () => {
      raf = requestAnimationFrame(frame)
      const scale = readScale()
      const focus = getTargets(scale)
      const holes = focus.flatMap((f) => f.holes)
      const rings = holes.filter((h) => h.ring)
      const head = focus[0]

      // 数が変わったときだけ作り直す。枠の登場アニメーションを毎フレーム流し直さないため
      const nextStructure = `${holes.map((h) => (h.ellipse ? 'e' : 'p')).join('')}:${!!head}:${!!head?.below}`
      if (nextStructure !== structure) {
        structure = nextStructure
        holesEl.innerHTML = holes.map((h) => (h.ellipse ? '<ellipse fill="#000"/>' : '<polygon fill="#000"/>')).join('')
        ringsEl.innerHTML = rings.map(() => '<polygon class="guide-ring"/>').join('')
        pointerEl.innerHTML = head
          ? '<g><g class="guide-pointer"><path d="M-20 -34 L20 -34 L0 0 Z"/></g></g>'
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
  }, [shown, leaving, index, dragCharId])

  const base = import.meta.env.BASE_URL

  return (
    <ViewportLayer>
      <div ref={layerRef} className={`guide${shown && !leaving ? ` is-${kind}` : ''}`}>
        <svg className="guide-veil" aria-hidden>
          <defs>
            <filter id="guide-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur ref={blurRef} stdDeviation={5} />
            </filter>
            <mask id="guide-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              <rect width="100%" height="100%" fill="#fff" />
              <g ref={holesRef} filter="url(#guide-soft)" />
            </mask>
          </defs>
          <rect className="guide-veil-fill" width="100%" height="100%" mask="url(#guide-mask)" />
          <g ref={ringsRef} />
          <g ref={pointerRef} />
        </svg>

        {dragCharId && (
          <div ref={dragRef} className="guide-drag-hint">
            <img src={`${base}images/character/chibi/${dragCharId}.avif`} alt="" draggable={false} />
          </div>
        )}

        {/* 吹き出しは設計座標で置く */}
        <div className="guide-safe">
          <div
            key={index}
            className={`guide-box-wrap is-${kind}${left ? ' is-left' : ''}${shown ? (leaving ? ' is-out' : ' is-in') : ''}`}
            onAnimationEnd={(e) => {
              if (e.animationName === 'guide-box-out') onNext()
            }}
          >
            <div ref={boxRef} className={`guide-box battle-panel${typedAll ? ' is-typed' : ''}`}>
              {/* 喋るキャラがいなければ背景だけ */}
              <div className="guide-portrait">
                {speakerId && (
                  <img src={`${base}images/character/face/${speakerId}.avif`} alt="" draggable={false} />
                )}
              </div>
              <div className="guide-main">
                <div className="guide-head">
                  <span className="guide-name">{speakerName}</span>
                  <span className="battle-label guide-count">
                    TUTORIAL {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>
                <p className="guide-text">{text.slice(0, typed)}</p>
              </div>
              <span className="guide-next">TAP</span>
            </div>
          </div>
        </div>
      </div>
    </ViewportLayer>
  )
}
