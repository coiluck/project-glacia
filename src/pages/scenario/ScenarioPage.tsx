import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams, Navigate } from 'react-router-dom'
import { paths } from '../../router/paths'
import { scenarioRegistry } from '../../data/scenarios'
import { battleStageRegistry } from '../../data/battleStages'
import { createInitialState, resetGameEngine, useGameEngine } from '../../hooks/useGameEngine'
import { useGameStore } from '../../stores/gameStore'
import type { SceneSnapshot } from '../../features/scenario/types'
import { useProgressStore } from '../../stores/progressStore'
import { useSettingsStore } from '../../stores/settingsStore'
import { TEXT_SIZE_PX, TEXT_SPEED_MS } from '../../data/settings'
import { useTranslations } from '../../i18n'
import ViewportLayer from '../../layouts/ViewportLayer'
import { Background } from './components/Background'
import { CharacterSprite, CharacterFace } from './components/Character'
import { ScenarioMenu } from './components/ScenarioMenu'
import { ScenarioLog } from './components/ScenarioLog'

// log に表示する過去の行数
const LOG_MAX_LINES = 50

const SCENARIO_TRANSLATION_MAPPING = {
  prev: 'prev',
  log: 'log',
  skip: 'skip',
  close: 'close',
}

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
  const t = useTranslations('scenario', SCENARIO_TRANSLATION_MAPPING)

  const advancingRef = useRef(false)
  const typingIdRef = useRef(0)
  const instantNextRef = useRef(false)

  // どの文の何文字目まで打ったか。文が変わったら打った分は 0 として読む。
  // 進行中セーブから復元する文は最初から全文を出す
  const [typed, setTyped] = useState(() => {
    const saved = useProgressStore.getState()
    const text = !replay && saved.scenarioId === scenarioId ? saved.scenarioState?.snapshot.text ?? '' : ''
    return { text, count: text.length }
  })
  const displayedText = typed.text === snapshot.text ? snapshot.text.slice(0, typed.count) : ''
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

    if (!target) return

    // ホイール skip や goBack 直後はタイピングを省略して即フル表示（全文は呼んだ側が typed に入れる）。
    if (instantNextRef.current) {
      instantNextRef.current = false
      return
    }

    const stepMs = TEXT_SPEED_MS[useSettingsStore.getState().textSpeed]
    let i = 0
    const tick = () => {
      if (id !== typingIdRef.current) return
      i += 1
      setTyped({ text: target, count: i })
      if (i < target.length) window.setTimeout(tick, stepMs)
    }
    const timer = window.setTimeout(tick, stepMs)

    return () => window.clearTimeout(timer)
  }, [snapshot.text])

  const isTyping = !!snapshot.text && displayedText.length < snapshot.text.length

  // シナリオおしまい -> 戦闘へ。読み返しと、戦闘マップの無いシナリオ（エピローグ）はトップへ戻る
  const finishScenario = () => {
    if (replay) {
      navigate(paths.top, { replace: true })
      return
    }
    useProgressStore.getState().clearScenario()
    navigate(battleStageRegistry[scenarioId] ? paths.battle(scenarioId) : paths.top, { replace: true })
  }

  const handleClick = async () => {
    // log 表示中はモーダル外クリックで閉じるだけ
    if (isLogOpen) {
      setIsLogOpen(false)
      return
    }
    if (isTyping) {
      typingIdRef.current += 1
      setTyped({ text: snapshot.text, count: snapshot.text.length })
      return
    }
    if (pendingChoice || advancingRef.current) return
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
    if (engine.goBack()) {
      const text = engine.getState().snapshot.text
      setTyped({ text, count: text.length })
      persistProgress()
    } else instantNextRef.current = false
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
        </div>

        <ScenarioMenu
          isLogOpen={isLogOpen}
          labels={t}
          onPrev={handlePrev}
          onLog={handleLogToggle}
          onSkip={handleSkip}
        />

        {isLogOpen && <ScenarioLog entries={logEntries} />}

        {/* 選択肢は同じ行のテキストを表示し終えてから出す */}
        {pendingChoice && !isTyping && (
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
