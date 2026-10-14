import { useRef, useState } from 'react'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import { baseBuildings } from '../../../data/base'
import type { BaseBuildingKind } from '../../../data/base'
import type { BaseView } from '../view'

// 内訳に並べる順。BuildSection の建物の並びと同じ
const KINDS: BaseBuildingKind[] = ['mine', 'library', 'storage', 'pipe']

// 熱の出力ぶんの目盛り。from から heat 個を光らせる
function HeatCells({ total, from, heat }: { total: number; from: number; heat: number }) {
  return (
    <span className="base-heat-cells">
      {Array.from({ length: total }, (_, i) => (
        <i key={i} className={i >= from && i < from + heat ? 'is-on' : ''} />
      ))}
    </span>
  )
}

// 盤面の左上に常に出す熱の使用量
export default function BaseStatus({ view }: { view: BaseView }) {
  const { t, base, analysis } = view
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)
  useOutsideClick(open, (target) => ref.current?.contains(target) ?? false, () => setOpen(false))
  const statuses = Object.values(analysis.buildings)
  const { heatUsed, heatOutput } = analysis

  // 建物の種類ごとの数。from は上の目盛りのどこからがその種類の分か
  const counts = KINDS.map((kind) => {
    const all = statuses.filter((s) => s.building.kind === kind)
    const active = all.filter((s) => s.active).length
    return { kind, active, idle: all.length - active, heat: active * baseBuildings[kind].heat }
  })
  const rows = counts
    .map((c, i) => ({ ...c, from: counts.slice(0, i).reduce((sum, p) => sum + p.heat, 0) }))
    .filter((r) => r.active + r.idle > 0)

  return (
    <section ref={ref} data-guide="heat" className={`base-heat${open ? ' is-open' : ''}${heatUsed >= heatOutput ? ' is-max' : ''}`}>
      <button type="button" className="base-heat-head" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="base-heat-tab">
          <span>{t.heat}</span>
          <small>
            {t.tower} Lv{base.base_tower_level}
          </small>
        </span>
        <span className="base-heat-main">
          <b className="base-heat-value">
            {heatUsed}
            <small>/ {heatOutput}</small>
          </b>
          <HeatCells total={heatOutput} from={0} heat={heatUsed} />
          <i className="base-heat-chevron" />
        </span>
      </button>

      {/* 内訳 */}
      <div className="base-heat-detail">
        <dl className="base-heat-rows">
          {rows.map((r) => (
            <div key={r.kind}>
              <dt>
                {t[r.kind]}
                <small>×{r.active}</small>
                {r.idle > 0 && (
                  <em>
                    {t.stateIdle} {r.idle}
                  </em>
                )}
              </dt>
              <dd>
                <HeatCells total={heatOutput} from={r.from} heat={r.heat} />
                <b>{r.heat}</b>
              </dd>
            </div>
          ))}
          <div className="is-output">
            <dt>{t.towerHeat}</dt>
            <dd>
              <b>{heatOutput}</b>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
