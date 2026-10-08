import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams, Navigate } from 'react-router-dom'
import { paths } from '../../router/paths'
import { scenarioRegistry } from '../../data/scenarios'
import { createInitialState, resetGameEngine, useGameEngine } from '../../features/scenario/useGameEngine'
import { useGameStore } from '../../features/scenario/gameStore'
import type { SceneSnapshot } from '../../features/scenario/types'
import { useProgressStore } from '../../stores/progressStore'
import { useSettingsStore } from '../../stores/settingsStore'
import { TEXT_SIZE_PX, TEXT_SPEED_MS } from '../../data/settings'
import ViewportLayer from '../../layouts/ViewportLayer'
import { Background } from './components/Background'
import { CharacterSprite, CharacterFace } from './components/Character'

// log に表示する過去の行数
const LOG_MAX_LINES = 50

export default function ScenarioPage() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  // システムメニューからの読み返し
  const [searchParams] = useSearchParams()
  const replay = searchParams.has('replay')

  // シナリオ未登録なら、そのまま同じステージの戦闘へ進む
  if (scenarioId && !scenarioRegistry[scenarioId]) {
    return <Navigate to={paths.battle(scenarioId)} replace />
  }

  // シナリオID自体がない場合
  if (!scenarioId) {
    return <Navigate to={paths.story} replace />
  }

  return <ScenarioRunner key={`${scenarioId}:${replay}`} scenarioId={scenarioId} replay={replay} />
}

function ScenarioRunner({ scenarioId, replay }: { scenarioId: string; replay: boolean }) {
  const navigate = useNavigate()
  // エンジンを初期化
  useState(() => resetGameEngine(createInitialState(scenarioId)))
  const engine = useGameEngine(createInitialState(scenarioId))

  const snapshot = useGameStore((s) => s.snapshot)
  const motion = useGameStore((s) => s.motion)
  const pendingChoice = useGameStore((s) => s.pendingChoice)
  const textSize = useSettingsStore((s) => s.textSize)

  const advancingRef = useRef(false)
  const typingIdRef = useRef(0)
  const instantNextRef = useRef(false)
  const logContainerRef = useRef<HTMLDivElement>(null)

  const [displayedText, setDisplayedText] = useState('')
  const [auto, setAuto] = useState(false)
  const [isLogOpen, setIsLogOpen] = useState(false)
  const [logEntries, setLogEntries] = useState<SceneSnapshot[]>([])

  // 進行位置を progressStore に保存する（スロット無しの単一セーブ）。
  // 読み返しでは本編のセーブを上書きしない
  const persistProgress = () => {
    if (replay) return
    useProgressStore.getState().saveScenario(scenarioId, engine.getState())
  }

  // 進行中セーブがあれば復元、なければ先頭の行を表示
  useEffect(() => {
    const saved = useProgressStore.getState()
    if (!replay && saved.scenarioId === scenarioId && saved.scenarioState) {
      instantNextRef.current = true
      engine.restore(saved.scenarioState)
    } else {
      void engine.start().then(persistProgress)
    }
  }, [])

  // snapshot.text が変わるたびに1文字ずつ表示する
  useEffect(() => {
    const target = snapshot.text
    const id = ++typingIdRef.current

    if (!target) {
      setDisplayedText('')
      return
    }

    // ホイール skip や goBack 直後はタイピングを省略して即フル表示。
    if (instantNextRef.current) {
      instantNextRef.current = false
      setDisplayedText(target)
      return
    }

    const stepMs = TEXT_SPEED_MS[useSettingsStore.getState().textSpeed]
    setDisplayedText('')
    let i = 0
    const tick = () => {
      if (id !== typingIdRef.current) return
      i += 1
      setDisplayedText(target.slice(0, i))
      if (i < target.length) window.setTimeout(tick, stepMs)
    }
    const timer = window.setTimeout(tick, stepMs)

    return () => window.clearTimeout(timer)
  }, [snapshot.text])

  // log を開いたら最新までスクロール
  useLayoutEffect(() => {
    if (!isLogOpen) return
    const el = logContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [isLogOpen])

  const isTyping = !!snapshot.text && displayedText.length < snapshot.text.length

  // シナリオおしまい -> 戦闘へ。読み返しならトップへ戻る
  const finishScenario = () => {
    if (replay) {
      navigate(paths.top, { replace: true })
      return
    }
    useProgressStore.getState().clearScenario()
    navigate(paths.battle(scenarioId), { replace: true })
  }

  const handleClick = async () => {
    // log 表示中はモーダル外クリックで閉じるだけ
    if (isLogOpen) {
      setIsLogOpen(false)
      return
    }
    if (pendingChoice || advancingRef.current) return
    if (isTyping) {
      typingIdRef.current += 1
      setDisplayedText(snapshot.text)
      return
    }
    advancingRef.current = true
    try {
      const result = await engine.advance()
      if (result.kind === 'end') finishScenario()
      else persistProgress()
    } finally {
      advancingRef.current = false
    }
  }

  // prev: 1個前の状態に戻す
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (advancingRef.current) return
    instantNextRef.current = true
    if (engine.goBack()) persistProgress()
    else instantNextRef.current = false
  }

  // skip: 選択肢ごとシナリオを全部飛ばす。
  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (advancingRef.current) return
    finishScenario()
  }

  // log: 現在の行を末尾にした過去 LOG_MAX_LINES 件を開くたびに取得する
  const handleLogToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLogOpen) {
      setLogEntries(
        [...engine.getHistorySnapshots(), engine.getState().snapshot].slice(-LOG_MAX_LINES),
      )
    }
    setIsLogOpen((v) => !v)
  }

  const handleAutoToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAuto((v) => !v)
  }

  const handleChoice = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!pendingChoice || advancingRef.current) return
    advancingRef.current = true
    try {
      const result = await engine.selectChoice(pendingChoice.choiceId, index)
      if (result.kind === 'end') finishScenario()
      else persistProgress()
    } finally {
      advancingRef.current = false
    }
  }

  const bg = snapshot.background
    ? { file: snapshot.background.file, transition: snapshot.background.transition }
    : { file: null, transition: 'fade' as const }

  return (
    <ViewportLayer>
      <div className="scenario-page fade-in" onClick={handleClick}>
        <Background bg={bg} motion={motion} />
        <CharacterSprite />
        <CharacterFace />

        <div className="scenario-text-container">
          <div className="scenario-speaker-name" style={{ visibility: snapshot.speaker ? 'visible' : 'hidden' }}>
            {snapshot.speaker}
          </div>
          <div className="scenario-text-message" style={{ fontSize: `calc(${TEXT_SIZE_PX[textSize]}px * var(--scale))` }}>
            <span className="scenario-text-message-text">{snapshot.text ? displayedText : '...'}</span>
            <span className="scenario-text-message-cursor" />
          </div>

          {/* アイコン未用意のため文字表示 */}
          <nav className="scenario-menu">
            <button className="scenario-menu-button" onClick={handlePrev}>prev</button>
            <button className="scenario-menu-button" onClick={handleLogToggle}>log</button>
            <button className="scenario-menu-button" onClick={handleSkip}>skip</button>
            <button
              className={`scenario-menu-button${auto ? ' is-on' : ''}`}
              onClick={handleAutoToggle}
            >
              auto {auto ? 'ON' : 'OFF'}
            </button>
          </nav>
        </div>

        {isLogOpen && (
          <div
            ref={logContainerRef}
            className="scenario-log-container"
            onClick={(e) => e.stopPropagation()}
          >
            {logEntries.map((s, i) => {
              const face = s.faceId ? s.characters.find((x) => x.id === s.faceId) : null
              return (
                <Fragment key={i}>
                  <div className="scenario-log-line">
                    {face ? (
                      <img
                        className="scenario-log-face"
                        src={`${import.meta.env.BASE_URL}images/character/face/${face.id}.avif`}
                        alt={face.id}
                     />
                    ) : (
                      <div className="scenario-log-face-dummy" />
                    )}
                    <div className="scenario-log-text">{s.text}</div>
                  </div>

                  {/* 最後以外はhr */}
                  {i !== logEntries.length - 1 && (
                    <div className="scenario-log-horizonal-line" />
                  )}
                </Fragment>
              )
            })}
          </div>
        )}

        {pendingChoice && (
          <div className="scenario-choice-container" onClick={(e) => e.stopPropagation()}>
            {pendingChoice.choices.map((c, i) => (
              <button
                key={i}
                className="scenario-choice-button"
                onClick={(e) => handleChoice(i, e)}
                style={{ '--delay': `${i * 80}ms` } as React.CSSProperties}
              >
                <span className="scenario-choice-button-decorator left" aria-hidden="true">
                  <span className="scenario-choice-button-line" />
                  <span className="scenario-choice-button-diamond" />
                </span>

                <span className="scenario-choice-button-text">{c.buttonText}</span>

                <span className="scenario-choice-button-decorator right" aria-hidden="true">
                  <span className="scenario-choice-button-diamond" />
                  <span className="scenario-choice-button-line" />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </ViewportLayer>
  )
}
