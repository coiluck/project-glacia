import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { paths } from '../../router/paths'
import { scenarioRegistry } from '../../data/scenarios'
import { createInitialState, resetGameEngine, useGameEngine } from '../../features/scenario/useGameEngine'
import { useGameStore } from '../../features/scenario/gameStore'
import { useProgressStore } from '../../stores/progressStore'
import ViewportLayer from '../../layouts/ViewportLayer'
import { Background } from './components/Background'
import { CharacterSprite, CharacterFace } from './components/Character'

// useSettingsStore 未作成のため定数で仮置き。作成したら差し替える。
const TEXT_SIZE = 22 // px（設計解像度 1920x1080 基準）
const TEXT_SPEED = 5 // 1文字あたり (40 - TEXT_SPEED * 3) ms

// skip で next 連鎖がループしていても止まれるようにする上限
const SKIP_MAX_LINES = 1000

export default function ScenarioPage() {
  const { scenarioId } = useParams<{ scenarioId: string }>()

  // 不正なシナリオID
  if (!scenarioId || !scenarioRegistry[scenarioId]) {
    return <Navigate to={paths.story} replace />
  }

  return <ScenarioRunner key={scenarioId} scenarioId={scenarioId} />
}

function ScenarioRunner({ scenarioId }: { scenarioId: string }) {
  const navigate = useNavigate()
  // エンジンを初期化
  useState(() => resetGameEngine(createInitialState(scenarioId)))
  const engine = useGameEngine(createInitialState(scenarioId))

  const snapshot = useGameStore((s) => s.snapshot)
  const motion = useGameStore((s) => s.motion)
  const pendingChoice = useGameStore((s) => s.pendingChoice)

  const advancingRef = useRef(false)
  const typingIdRef = useRef(0)
  const skipPendingRef = useRef(0)
  const instantNextRef = useRef(false)

  const [displayedText, setDisplayedText] = useState('')
  const [auto, setAuto] = useState(false)

  // 進行位置を progressStore に保存する（スロット無しの単一セーブ）
  const persistProgress = () => {
    useProgressStore.getState().saveScenario(scenarioId, engine.getState())
  }

  // 進行中セーブがあれば復元し、なければ先頭の行を表示
  useEffect(() => {
    const saved = useProgressStore.getState()
    if (saved.scenarioId === scenarioId && saved.scenarioState) {
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

    const stepMs = Math.max(0, 40 - TEXT_SPEED * 3)
    if (stepMs === 0) {
      setDisplayedText(target)
      return
    }

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

  const isTyping = !!snapshot.text && displayedText.length < snapshot.text.length

  // シナリオ終端。セーブを消して対応するステージの戦闘へ
  const finishScenario = () => {
    useProgressStore.getState().clearScenario()
    navigate(paths.battle(scenarioId))
  }

  const handleClick = async () => {
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

  // ホイールで複数行スキップ。skipPendingRef に積まれた回数だけ advance を回す。
  const runSkipLoop = async () => {
    if (advancingRef.current) return
    advancingRef.current = true
    try {
      while (skipPendingRef.current > 0) {
        skipPendingRef.current -= 1
        if (useGameStore.getState().pendingChoice) {
          skipPendingRef.current = 0
          return
        }
        instantNextRef.current = true
        const result = await engine.advance()
        if (result.kind === 'end') {
          skipPendingRef.current = 0
          finishScenario()
          return
        }
        persistProgress()
        if (result.kind === 'choice') {
          skipPendingRef.current = 0
          return
        }
      }
    } finally {
      advancingRef.current = false
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (pendingChoice) return
    if (e.deltaY > 0) {
      skipPendingRef.current = Math.min(skipPendingRef.current + 1, 50)
      void runSkipLoop()
    } else if (e.deltaY < 0) {
      if (advancingRef.current) return
      instantNextRef.current = true
      if (engine.goBack()) persistProgress()
      else instantNextRef.current = false
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

  // skip: シナリオを全部飛ばす（選択肢が出たらそこで止まる）
  const handleSkip = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (pendingChoice || advancingRef.current) return
    advancingRef.current = true
    try {
      for (let i = 0; i < SKIP_MAX_LINES; i++) {
        instantNextRef.current = true
        const result = await engine.advance()
        if (result.kind === 'end') {
          finishScenario()
          return
        }
        persistProgress()
        if (result.kind === 'choice') return
      }
    } finally {
      advancingRef.current = false
    }
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
      <div className="scenario-page fade-in" onClick={handleClick} onWheel={handleWheel}>
        <Background bg={bg} motion={motion} />
        <CharacterSprite />
        <CharacterFace />

        <div className="scenario-text-container">
          <div className="scenario-speaker-name" style={{ visibility: snapshot.speaker ? 'visible' : 'hidden' }}>
            {snapshot.speaker}
          </div>
          <div className="scenario-text-message" style={{ fontSize: `calc(${TEXT_SIZE}px * var(--scale))` }}>
            <span className="scenario-text-message-text">{snapshot.text ? displayedText : '...'}</span>
            <span className="scenario-text-message-cursor" />
          </div>

          {/* アイコン未用意のため文字表示 */}
          <nav className="scenario-menu">
            <button className="scenario-menu-button" onClick={handlePrev}>prev</button>
            <button className="scenario-menu-button">log</button>
            <button className="scenario-menu-button" onClick={handleSkip}>skip</button>
            <button
              className={`scenario-menu-button${auto ? ' is-on' : ''}`}
              onClick={handleAutoToggle}
            >
              auto {auto ? 'ON' : 'OFF'}
            </button>
          </nav>
        </div>

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
