import { characterMasters } from '../../../data/characters'
import { classIcons } from '../../../data/characters/classIcons'
import { memberLimit } from '../../../features/base/base'
import type { DragHandlers } from '../useMemberDrag'
import { boostOf, faceUrl, fill, memberWork } from '../view'
import type { BaseView } from '../view'
import { EMBLEMS } from './art'
import { Icon } from './detail'

const SPEED_ICON = 'M4 18 9 12l4 3 7-8 M15 7h5v5'
const WARM_ICON = 'M12 3c1 3.5 4.6 5.6 4.6 9.8a4.6 4.6 0 0 1-9.2 0c0-2.1 1-3.4 2.1-4.2 0 1.7.8 2.7 1.8 3.1.3-3.3-.6-5.9.7-8.7Z'

type Props = {
  view: BaseView
  selectedId: string | null
  heldId: string | null // 持ち上げているキャラ
  onSelect: (id: string) => void
  grab: (id: string, enabled: boolean) => DragHandlers
}

// 立っているキャラが動かしている建物の数
function Work({ view, id }: { view: BaseView; id: string }) {
  const work = memberWork(view, id)
  const parts = [
    { kind: 'speed', d: SPEED_ICON, n: work.speed },
    { kind: 'carry', d: EMBLEMS.storage, n: work.carry },
    { kind: 'warm', d: WARM_ICON, n: work.warm },
  ].filter((p) => p.n > 0)
  if (parts.length === 0) return null
  return (
    <span className="base-left-work">
      {parts.map((p) => (
        <span key={p.kind} className={`is-${p.kind}`}>
          <Icon d={p.d} />
          <b>{p.n}</b>
        </span>
      ))}
    </span>
  )
}

// 基地のキャラの一覧。行を盤面へドラッグすると立たせる
export default function MemberPanel({ view, selectedId, heldId, onSelect, grab }: Props) {
  const { t, tName, tClass, base, characters, pending } = view
  const members = base.base_members
  const limit = memberLimit(view.clearedStageIds)
  const full = Object.keys(members).length >= limit

  // 立っているキャラを先に。動かしても行が入れ替わらないよう、どちらも所持の順
  const ids = characters.map((c) => c.masterId)
  const rows = [...ids.filter((id) => members[id] !== undefined), ...ids.filter((id) => members[id] === undefined)]
  const selectedPlaced = selectedId !== null && members[selectedId] !== undefined

  return (
    <section className="base-left">
      <div className="base-left-head">
        <span className="base-left-tag">{t.memberStrip}</span>
        <b>{fill(t.progressCount, Object.keys(members).length, limit)}</b>
      </div>

      <ul className="base-left-list">
        {rows.map((id) => {
          const master = characterMasters[id]
          const level = characters.find((c) => c.masterId === id)?.level ?? 1
          const placed = members[id] !== undefined
          const className = [
            'base-left-row',
            id === selectedId && 'is-active',
            id === heldId && 'is-held',
            // 上限まで立っていれば、立っていないキャラは持ち上げられない
            !placed && full && 'is-locked',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <li key={id}>
              <button
                type="button"
                className={className}
                onClick={() => onSelect(id)}
                {...grab(id, !pending && (placed || !full))}
              >
                <span className="base-left-face">
                  <img src={faceUrl(id)} alt="" draggable={false} />
                </span>
                <span className="base-left-text">
                  <b>
                    {tName[id]}
                    {placed && <span className="base-left-placed">{t.placed}</span>}
                  </b>
                  <span>
                    <svg className="base-left-class" viewBox="0 0 24 24" aria-hidden>
                      <path d={classIcons[master.classId]} />
                    </svg>
                    {tClass[master.classId]} Lv{level} ・ +{Math.round(boostOf(view, id) * 100)}%
                  </span>
                </span>
                {placed && <Work view={view} id={id} />}
              </button>
            </li>
          )
        })}
      </ul>

      {/* 立っているキャラを選んだときだけ押せる */}
      <div className="base-left-foot">
        <button
          type="button"
          className="base-left-remove"
          disabled={!selectedPlaced || pending}
          onClick={() => selectedId && view.run({ kind: 'place', characterId: selectedId, pos: null })}
        >
          {selectedPlaced && t.unplace}
        </button>
      </div>
    </section>
  )
}
