import { battleStageRegistry } from '../../../data/battleStages'
import HexGrid from '../../battle/components/HexGrid'

// 戦闘マップの盤面だけ（ユニットは置かない）。枠に合わせた縮小はCSS側
export default function StageBoard({ stageId }: { stageId: string }) {
  const stage = battleStageRegistry[stageId]
  if (!stage) return null

  return (
    <div className="story-map-stage-board">
      <HexGrid tiles={stage.tiles} units={[]} getUnitName={() => ''} getUnitChibi={() => null} />
    </div>
  )
}
