import { TOWER_LEVELS } from '../../../data/base'
import { chapters, isChapterCleared } from '../../../data/stages'
import { EMBLEMS } from './art'
import { DetailCard, GoldButton, HoloArt, LockIcon, Stage } from './detail'
import { fill } from '../view'
import type { BaseView } from '../view'

type Props = {
  view: BaseView
  onClose: () => void
}

// 強化の条件1つ。progress は「今 / 要る数」の表示
interface Condition {
  label: string
  ok: boolean
  progress: string
  ratio: number
}

// 暖房塔。Lv1〜4 を同じ高さの行で縦に並べ、次の Lv の条件を下にまとめる
export default function TowerPanel({ view, onClose }: Props) {
  const { t, base, rank, clearedStageIds, currency, pending, run } = view
  const level = base.base_tower_level
  const next = TOWER_LEVELS[level]

  const conditions: Condition[] = []
  if (next?.clearedChapter !== undefined) {
    const need = next.clearedChapter
    const have = chapters.filter((c) => c.id <= need && isChapterCleared(c, clearedStageIds)).length
    conditions.push({
      label: fill(t.condChapter, need),
      ok: have >= need,
      progress: fill(t.progressCount, have, need),
      ratio: have / need,
    })
  }
  if (next?.rank !== undefined) {
    conditions.push({
      label: fill(t.condRank, next.rank),
      ok: rank >= next.rank,
      progress: fill(t.progressCount, Math.min(rank, next.rank), next.rank),
      ratio: Math.min(1, rank / next.rank),
    })
  }

  return (
    <DetailCard
      emblem={EMBLEMS.tower}
      title={t.tower}
      level={level}
      closeLabel={t.close}
      onClose={onClose}
      foot={
        next && (
          <GoldButton
            label={t.upgrade}
            cost={next.cost}
            reason={currency < next.cost ? t.reasonCurrency : null}
            disabled={conditions.some((c) => !c.ok)}
            pending={pending}
            onClick={() => run({ kind: 'upgradeTower' })}
          />
        )
      }
    >
      <Stage low warm>
        <HoloArt kind="tower" idle={false} className="bp-holo" />
      </Stage>

      <ol className="bp-ladder">
        {TOWER_LEVELS.map((def, i) => {
          const n = i + 1
          const state = n < level ? 'is-done' : n === level ? 'is-now' : 'is-lock'
          return (
            <li key={n} className={`bp-step ${state}`}>
              <span className="bp-step-node" />
              <div className="bp-step-card">
                <b className="bp-step-lv">Lv{n}</b>
                {n > level && <LockIcon />}
                <span className="bp-step-vals">
                  <span>
                    <small>{t.towerHeat}</small>
                    <b>{def.heat}</b>
                  </span>
                  <span>
                    <small>{t.storage}</small>
                    <b>{def.storages}</b>
                  </span>
                </span>
              </div>
            </li>
          )
        })}
      </ol>

      {next ? (
        <section className="bp-sec">
          <h3 className="bp-sec-title">{fill(t.condFor, level + 1)}</h3>
          <ul className="bp-conds">
            {conditions.map((c) => (
              <li key={c.label} className={`bp-cond${c.ok ? ' is-ok' : ''}`}>
                <span className="bp-cond-mark" />
                <span className="bp-cond-main">
                  <b>{c.label}</b>
                  <span className="bp-cond-bar">
                    <span>
                      <i style={{ width: `${c.ratio * 100}%` }} />
                    </span>
                    <small>{c.progress}</small>
                  </span>
                </span>
                <span className="bp-cond-state">{c.ok ? t.achieved : t.notAchieved}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="bp-hint">{t.maxLevel}</p>
      )}
    </DetailCard>
  )
}
