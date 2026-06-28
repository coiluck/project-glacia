import { useState } from 'react'
import { Link } from 'react-router-dom'
import { paths } from '../../router/paths'
import Screen from '../../layouts/Screen'
import ViewportLayer from '../../layouts/ViewportLayer'
import StageNode from './components/StageNode'
import '../../styles/pages/story.css'

// ステージの進行状態
export type StageStatus = 'cleared' | 'next' | 'locked'

export interface StageNodeData {
  id: string // ステージ番号（例: '1-3'）
  x: number // マップ上の中心X（設計座標 1920×1080 基準）
  y: number // マップ上の中心Y
  status: StageStatus
}

// TODO: data/stages から読み込む。
const CHAPTERS = [
  { id: 1, name: 'Chapter 1' },
  { id: 2, name: 'Chapter 2' },
  { id: 3, name: 'Chapter 3' },
  { id: 4, name: 'Chapter 4' },
]

const STAGES: StageNodeData[] = [
  { id: '1-1', x: 320, y: 670, status: 'cleared' },
  { id: '1-2', x: 870, y: 460, status: 'cleared' },
  { id: '1-3', x: 1340, y: 840, status: 'next'},
  { id: '1-4', x: 1820, y: 580, status: 'locked'},
  { id: '1-5', x: 2480, y: 760, status: 'locked'},
  { id: '1-6', x: 3030, y: 430, status: 'locked'},
]

// ノード間の接続
const EDGES: [string, string][] = [
  ['1-1', '1-2'],
  ['1-2', '1-3'],
  ['1-3', '1-4'],
  ['1-4', '1-5'],
  ['1-5', '1-6'],
]

export default function StoryMapPage() {
  const [currentChapter, setCurrentChapter] = useState(1)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const current = CHAPTERS.find((c) => c.id === currentChapter)
  const selected = STAGES.find((s) => s.id === selectedId) ?? null

  return (
    <>
      <ViewportLayer>
        {/* チャプター選択 */}
        <div className="story-map-chapter-select-container">
          <div className="story-map-chapter-select-header">
            <span className="story-map-chapter-select-header-text">chapter {currentChapter}</span>
          </div>
          <div className="story-map-chapter-select-main">
            <div className="story-map-chapter-select-main-title">都市の影</div>
            <div className="story-map-chapter-select-main-progress">
              <div className="story-map-chapter-select-main-progress-bar">
                <div className="story-map-chapter-select-main-progress-bar-fill" style={{ width: `${currentChapter / CHAPTERS.length * 100}%` }}></div>
              </div>
              <div className="story-map-chapter-select-main-progress-text">80%</div>
            </div>
          </div>
        </div>

        {/* 選択中ステージの情報 */}
        {selected && (
          <>
            <div className="story-map-stage-info-overlay" onClick={() => setSelectedId(null)}></div>

            <div className="story-map-stage-info-container" key={selected.id}>
              <div className="story-map-stage-info-thumbnail-container">
                <img src={`/project-glacia/images/story/thumbnail/${selected.id}.png`} alt={selected.id} />
                <div className="story-map-stage-info-thumbnail-number">{selected.id}</div>
              </div>

              <div className="story-map-stage-info-description-container">
                <section className="story-map-stage-info-item">
                  <div className="story-map-stage-info-item-title">敵</div>
                  <p>敵はここに書きます。</p>
                </section>
                <section className="story-map-stage-info-item">
                  <div className="story-map-stage-info-item-title">報酬</div>
                  <p>報酬はここに書きます。</p>
                </section>
              </div>

              <div className="story-map-stage-info-button-container">
                {selected.status === 'locked' ? (
                  <div className="story-map-stage-info-button locked">未解放</div>
                ) : (
                  <Link className="story-map-stage-info-button sortie" to={paths.battle(selected.id)}>
                    出撃
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </ViewportLayer>

      <Screen background="images/story/1.png">
        <div className="page-story fade-in">

          <div className="story-map">
            {/* ノード間のパス */}
            <svg className="story-paths" viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden>
              {EDGES.map(([from, to]) => {
                const a = STAGES.find((s) => s.id === from)!
                const b = STAGES.find((s) => s.id === to)!
                const locked = b.status === 'locked'
                return (
                  <line
                    key={`${from}-${to}`}
                    className={`story-path${locked ? ' locked' : ''}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                  />
                )
              })}
            </svg>

            {STAGES.map((node) => (
              <StageNode
                key={node.id}
                node={node}
                selected={node.id === selectedId}
                onSelect={() => setSelectedId(node.id)}
              />
            ))}
          </div>
        </div>
      </Screen>
    </>
  )
}
