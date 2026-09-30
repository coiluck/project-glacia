import { battleStageRegistry } from '../../../data/battleStages'
import { enemyDefs } from '../../../data/enemies'
import { useTranslations } from '../../../i18n'

const ENEMY_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(enemyDefs).map((e) => [e.nameKey, e.nameKey]),
)

// 出てくる敵の種類
export default function StageEnemies({ stageId }: { stageId: string }) {
  const tBattle = useTranslations('battle', ENEMY_TRANSLATION_MAPPING)
  const spawns = battleStageRegistry[stageId]?.enemies ?? []
  const enemyIds = [...new Set(spawns.map((s) => s.enemyId))]

  return (
    <ul className="story-map-stage-enemies">
      {enemyIds.map((id) => (
        <li key={id} className="story-map-stage-enemy">
          <img
            className="story-map-stage-enemy-image"
            src={`${import.meta.env.BASE_URL}images/enemy/${id}.avif`}
            alt=""
            draggable={false}
          />
          <span className="story-map-stage-enemy-name">{tBattle[enemyDefs[id].nameKey]}</span>
        </li>
      ))}
    </ul>
  )
}
