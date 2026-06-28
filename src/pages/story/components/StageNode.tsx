import type { StageNodeData } from '../StoryMapPage'

// マップ上の1ステージノード。選ぶと右下に情報パネルが出る。
export default function StageNode({
  node,
  selected,
  onSelect,
}: {
  node: StageNodeData
  selected: boolean
  onSelect: () => void
}) {
  const cleared = node.status === 'cleared'
  const locked = node.status === 'locked'

  return (
    <button
      type="button"
      className={`story-stage-node-card${selected ? ' selected' : ''}`}
      style={{ left: `${node.x}px`, top: `${node.y}px`, filter: locked ? 'grayscale(0.6) brightness(0.4)' : 'none' }}
      onClick={onSelect}
    >
      <span className="story-stage-card-header">
        Mission
      </span>
      <span className="story-stage-card-main">
        {cleared ? (
          <div className="story-stage-card-main-cleared-icon" />
        ) : (
          <div className="story-stage-card-main-locked-icon" />
        )}
        <span className="story-stage-card-main-id">{node.id}</span>
      </span>
    </button>
  )
}
