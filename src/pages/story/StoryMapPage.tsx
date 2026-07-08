import { useRef, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { paths } from '../../router/paths'
import Screen from '../../layouts/Screen'
import ViewportLayer from '../../layouts/ViewportLayer'
import StageNode from './components/StageNode'
import { useProgressStore } from '../../stores/progressStore'
import { chapters, type Stage, type StageStatus } from '../../data/stages'

// マップ描画用にstatusを付与
export type StageNodeData = Stage & { status: StageStatus }

export default function StoryMapPage() {
  const [selectedNode, setSelectedNode] = useState<StageNodeData | null>(null)
  const currentChapter = useProgressStore((s) => s.currentChapter)
  const clearedStageIds = useProgressStore((s) => s.clearedStageIds)
  const current = chapters.find((c) => c.id === currentChapter)

  if (!current) return

  const cleared = current.stages.filter((s) => clearedStageIds.includes(s.id))
  const clearRate = current.stages.length ? Math.round((cleared.length / current.stages.length) * 100) : 0

  // 各ステージのステータスを算出
  const clearedSet = new Set(cleared.map((s) => s.id))
  const getStatus = (stage: Stage): StageStatus => {
    if (clearedSet.has(stage.id)) return 'cleared'
    // 前提ステージは複数も可能
    const prereqs = current.stages.filter((s) => s.next?.includes(stage.id))
    const unlocked = prereqs.length === 0 || prereqs.every((s) => clearedSet.has(s.id))
    return unlocked ? 'next' : 'locked'
  }
  const nodes: StageNodeData[] = current.stages.map((s) => ({ ...s, status: getStatus(s) }))
  const edges = current.stages.flatMap((s) => (s.next ?? []).map((to) => [s.id, to] as const))
  // マップ幅（最後のノード + 右端の余白）。単位は vh。
  const mapWidth = current.stages.reduce((m, s) => Math.max(m, s.x), 0) + 100

  // クリック場所がカードならトグル、それ以外は閉じる。
  const handleMapClick = (e: MouseEvent<HTMLDivElement>) => {
    if (draggedRef.current) return
    const card = (e.target as HTMLElement).closest<HTMLElement>('.story-stage-node-card')
    const id = card?.dataset.stageId ?? null
    const node = id !== null ? nodes.find((n) => n.id === id) ?? null : null
    setSelectedNode((prev) => (node && prev?.id === node.id ? null : node))
  }

  // クリック&ドラッグで横スクロール
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ down: false, startX: 0, scrollLeft: 0 })
  const draggedRef = useRef(false)

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el) return
    dragRef.current = { down: true, startX: e.clientX, scrollLeft: el.scrollLeft }
    draggedRef.current = false
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el || !dragRef.current.down) return
    const dx = e.clientX - dragRef.current.startX
    if (Math.abs(dx) > 4) draggedRef.current = true
    el.scrollLeft = dragRef.current.scrollLeft - dx
  }

  const handleMouseUp = () => {
    dragRef.current.down = false
  }

  return (
    <>
      <ViewportLayer>
        {/* マップ */}
        <div
          ref={scrollRef}
          className="story-map-scroll fade-in"
          onClick={handleMapClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="story-map" style={{ width: `calc(${mapWidth} * 1vh)` }}>
            {/* ノード間のパス */}
            <svg className="story-paths" viewBox={`0 0 ${mapWidth} 100`} preserveAspectRatio="none" aria-hidden>
              {edges.map(([from, to]) => {
                const a = nodes.find((s) => s.id === from)!
                const b = nodes.find((s) => s.id === to)!
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

            {nodes.map((node) => (
              <StageNode
                key={node.id}
                node={node}
              />
            ))}
          </div>
        </div>

        {/* チャプター選択 */}
        <div className="story-map-chapter-select-container">
          <div className="story-map-chapter-select-header">
            <span className="story-map-chapter-select-header-text">chapter {currentChapter}</span>
          </div>
          <div className="story-map-chapter-select-main">
            <div className="story-map-chapter-select-main-title">都市の影</div>
            <div className="story-map-chapter-select-main-progress">
              <div className="story-map-chapter-select-main-progress-bar">
                <div className="story-map-chapter-select-main-progress-bar-fill" style={{ width: `${clearRate}%` }}></div>
              </div>
              <div className="story-map-chapter-select-main-progress-text">{clearRate}%</div>
            </div>
          </div>
        </div>

        {/* 選択中ステージの情報 */}
        {selectedNode && (
          <>
            <div className="story-map-stage-info-container" key={selectedNode.id}>
              <div className="story-map-stage-info-thumbnail-container">
                <img src={`/project-glacia/images/story/thumbnail/${selectedNode.id}.png`} alt={selectedNode.id} />
                <div className="story-map-stage-info-thumbnail-number">{selectedNode.id}</div>
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
                {selectedNode.status === 'locked' ? (
                  <div className="story-map-stage-info-button locked">未解放</div>
                ) : (
                  <Link className="story-map-stage-info-button sortie" to={paths.scenario(selectedNode.id)}>
                    出撃
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </ViewportLayer>

      <Screen background="images/story/1.png" />
    </>
  )
}
