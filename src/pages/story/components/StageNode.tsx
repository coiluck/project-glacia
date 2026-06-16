import { Link } from 'react-router-dom'
import { paths } from '../../../router/paths'

// マップ上の1ステージノード。クリックで該当ステージの戦闘へ。
export default function StageNode({ stageId }: { stageId: string }) {
  return (
    <Link className="stage-node" to={paths.battle(stageId)}>
      STAGE {stageId}
    </Link>
  )
}
