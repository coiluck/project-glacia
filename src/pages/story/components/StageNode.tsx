import type { StageNodeData } from '../StoryMapPage'

// マップ上の1ステージノード。選ぶと右に情報パネルが出る。
export default function StageNode({ node }: { node: StageNodeData }) {
  const cleared = node.status === 'cleared'
  const locked = node.status === 'locked'

  return (
    <button
      type="button"
      className="story-stage-node-card"
      style={{ left: `calc(${node.x} * 1vh)`, top: `calc(${node.y} * 1vh)`, filter: locked ? 'grayscale(0.6) brightness(0.4)' : 'none' }}
      data-stage-id={node.id}
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
