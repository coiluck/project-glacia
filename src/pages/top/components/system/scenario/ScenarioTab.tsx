import { useNavigate } from 'react-router-dom'
import { useTranslations } from '../../../../../i18n'
import { chapters } from '../../../../../data/stages'
import { scenarioRegistry } from '../../../../../data/scenarios'
import { paths } from '../../../../../router/paths'
import { useProgressStore } from '../../../../../stores/progressStore'
import { withNumbers } from '../format'

// シナリオのある章とステージだけを残す
const CHAPTERS = chapters
  .map((c) => ({ ...c, stages: c.stages.filter((s) => scenarioRegistry[s.id]) }))
  .filter((c) => c.stages.length > 0)

const CHAPTER_TITLES = Object.fromEntries(CHAPTERS.map((c) => [c.titleKey, c.titleKey]))

export default function ScenarioTab() {
  const t = useTranslations('system', {
    chapter: 'scenarioChapter',
    read: 'scenarioRead',
    locked: 'scenarioLocked',
  })
  const titles = useTranslations('common', CHAPTER_TITLES)
  const clearedIds = useProgressStore((s) => s.clearedStageIds)
  const navigate = useNavigate()

  return (
    <div className="system-scenario">
      {CHAPTERS.map((c) => (
        <section key={c.id} className="system-scenario-chapter">
          <h3>
            {t.chapter && withNumbers(t.chapter, c.id)}
            <span>{titles[c.titleKey]}</span>
          </h3>
          <div className="system-scenario-grid">
            {c.stages.map((s) => {
              const cleared = clearedIds.includes(s.id)
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`system-scenario-row system-notch${cleared ? '' : ' is-locked'}`}
                  disabled={!cleared}
                  onClick={() => navigate(paths.scenarioReplay(s.id))}
                >
                  <span className="system-scenario-id">{s.id}</span>
                  <span className="system-scenario-state">{cleared ? t.read : t.locked}</span>
                </button>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
