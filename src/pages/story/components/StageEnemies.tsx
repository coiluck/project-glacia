import { battleStageRegistry } from '../../../data/battleStages'
import { enemyDefs } from '../../../data/enemies'
import { useTranslations } from '../../../i18n'

const ENEMY_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(enemyDefs).map((e) => [e.nameKey, e.nameKey]),
)

// 出てくる敵の種類と数
export default function StageEnemies({ stageId }: { stageId: string }) {
  const tBattle = useTranslations('battle', ENEMY_TRANSLATION_MAPPING)
  const spawns = battleStageRegistry[stageId]?.enemies ?? []
  const counts = new Map<string, number>()
  for (const s of spawns) counts.set(s.enemyId, (counts.get(s.enemyId) ?? 0) + 1)

  return (
    <ul className="story-map-stage-enemies">
      {[...counts].map(([id, count]) => (
        <li key={id} className="story-map-stage-enemy">
          <span className="story-map-stage-hex">
            <span className="story-map-stage-hex-rim" />
            <span className="story-map-stage-hex-face">
              <img
                className="story-map-stage-enemy-image"
                src={`${import.meta.env.BASE_URL}images/enemy/${id}.avif`}
                alt=""
                draggable={false}
              />
            </span>
            <span className="story-map-stage-hex-count">×{count}</span>
          </span>
          <span className="story-map-stage-enemy-name">{tBattle[enemyDefs[id].nameKey]}</span>
        </li>
      ))}
    </ul>
  )
}
