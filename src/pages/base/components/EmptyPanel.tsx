import { useState } from 'react'
import { baseBuildings, TOWER_LEVELS } from '../../../data/base'
import type { BaseBuildingKind } from '../../../data/base'
import { baseTileMap } from '../../../data/baseTerrain'
import { items } from '../../../data/items'
import { keyToAxial, outputsOf, resourceGrade } from '../../../features/base/board'
import type { BaseAnalysis, BuildingStatus } from '../../../features/base/board'
import BillIcon from '../../../components/common/BillIcon'
import ItemIcon from '../../../components/common/ItemIcon'
import { DetailCard, FlameIcon, GoldButton, HeatCells, HoloArt, LockIcon, Stage } from './detail'
import { fill, gradeStep, heatBlocked, previewWith } from '../view'
import type { BaseView } from '../view'

const KINDS: BaseBuildingKind[] = ['mine', 'library', 'storage', 'pipe']

// 建てられるかと、建てた後の値
interface Choice {
  kind: BaseBuildingKind
  cost: number
  output: string | undefined
  hard: string | null // 選べない理由
  soft: string | null // 選べるが建てられない理由
  after: BaseAnalysis
  status: BuildingStatus
  heat: number // 増える熱
}

// 選べる物の先頭。採掘場と書庫は建物 Lv1 で選べる物だけ
const firstOutput = (kind: BaseBuildingKind) => outputsOf(kind).find((o) => o.unlockLevel <= 1)?.itemId

function choiceOf(view: BaseView, tileKey: string, kind: BaseBuildingKind, output: string | undefined): Choice {
  const { t, base, analysis, currency } = view
  const tile = baseTileMap.get(tileKey)!
  const cost = baseBuildings[kind].costs[0]
  const after = previewWith(view, { base_board: { ...base.base_board, [tileKey]: { kind, level: 1, output } } })
  const status = after.buildings[tileKey]
  const storages = Object.values(base.base_board).filter((b) => b.kind === 'storage').length
  const storageLimit = TOWER_LEVELS[base.base_tower_level - 1].storages

  let hard: string | null = null
  if (kind === 'mine' && tile.kind !== 'resource') hard = t.mineOnly
  else if (kind === 'storage' && storages >= storageLimit) hard = fill(t.storageLimit, storageLimit)
  else if (kind === 'pipe' && !status.active) hard = t.reasonNotConnected

  let soft: string | null = null
  if (!hard && heatBlocked(analysis, after)) {
    const lack = after.heatUsed - after.heatOutput
    soft = fill(t.heatShort, lack)
  } else if (!hard && currency < cost) {
    soft = t.reasonCurrency
  }

  return {
    kind,
    cost,
    output,
    hard,
    soft,
    after,
    status,
    heat: after.heatUsed - analysis.heatUsed,
  }
}

// 作る物を1枚ずつめくる。下の小さい印で直接選べる
function OutputCarousel({
  view,
  kind,
  value,
  onPick,
}: {
  view: BaseView
  kind: BaseBuildingKind
  value: string
  onPick: (itemId: string) => void
}) {
  const { t, tItem, inventory } = view
  const list = outputsOf(kind)
  const open = list.filter((o) => o.unlockLevel <= 1)
  const index = open.findIndex((o) => o.itemId === value)
  const step = (d: number) => onPick(open[(index + d + open.length) % open.length].itemId)
  const single = open.length < 2

  return (
    <>
      <div className="bp-car">
        <button type="button" className="bp-arrow is-prev" aria-label={t.prev} disabled={single} onClick={() => step(-1)} />
        {/* key で作り直して、めくるたびに入ってくる動きを出す */}
        <div key={value} className="bp-car-card">
          <span className="bp-car-icon">
            <span>
              <ItemIcon item={items[value]} className="base-item-icon" />
            </span>
          </span>
          <span className="bp-car-text">
            <b>{tItem[value]}</b>
            <span>
              {t.ownedLabel} <em>{inventory[value] ?? 0}</em>
            </span>
          </span>
        </div>
        <button type="button" className="bp-arrow is-next" aria-label={t.next} disabled={single} onClick={() => step(1)} />
      </div>
      <div className="bp-dots">
        {list.map((o) => {
          const locked = o.unlockLevel > 1
          return (
            <button
              key={o.itemId}
              type="button"
              className={o.itemId === value ? 'is-on' : ''}
              disabled={locked}
              aria-label={locked ? fill(t.unlockAt, o.unlockLevel) : tItem[o.itemId]}
              onClick={() => onPick(o.itemId)}
            >
              {locked ? <LockIcon /> : <ItemIcon item={items[o.itemId]} className="base-item-icon" />}
            </button>
          )
        })}
      </div>
    </>
  )
}

type Props = {
  view: BaseView
  tileKey: string
  onClose: () => void
}

// 何も建っていないマスの詳細。建てる物を行で並べ、選んだ行が開く
export default function EmptyPanel({ view, tileKey, onClose }: Props) {
  const { t, analysis, pending, run } = view
  const tile = baseTileMap.get(tileKey)!
  const warm = analysis.warm.has(tileKey)
  const grade = tile.kind === 'resource' ? resourceGrade(tile.pos) : 1
  const [picked, setPicked] = useState<BaseBuildingKind | null>(null)
  const [outputs, setOutputs] = useState<Partial<Record<BaseBuildingKind, string>>>({})

  const choices = KINDS.map((kind) => choiceOf(view, tileKey, kind, outputs[kind] ?? firstOutput(kind)))
  // 選んでいなければ、建てられる物の先頭
  const pick =
    choices.find((c) => c.kind === picked && !c.hard) ??
    choices.find((c) => !c.hard && !c.soft) ??
    choices.find((c) => !c.hard)

  const tags = grade > 1 && <span className="bp-tag is-grade">{fill(t.grade, grade)}</span>

  const foot = pick && (
    <>
      <div className={`bp-heat-line${heatBlocked(analysis, pick.after) ? ' is-over' : ''}`}>
        <FlameIcon />
        <span>{t.heat}</span>
        <b>
          {analysis.heatUsed}
          {pick.heat > 0 && (
            <>
              {' → '}
              <em>{pick.after.heatUsed}</em>
            </>
          )}
          <i>/ {analysis.heatOutput}</i>
        </b>
        <HeatCells used={analysis.heatUsed} total={analysis.heatOutput} add={pick.heat} />
      </div>
      <GoldButton
        label={t.build}
        cost={pick.cost}
        reason={pick.soft}
        pending={pending}
        onClick={() => run({ kind: 'build', pos: keyToAxial(tileKey), building: pick.kind, output: pick.output })}
      />
    </>
  )

  return (
    <DetailCard title={t[tile.kind]} closeLabel={t.close} onClose={onClose} foot={foot}>
      <Stage low preview={pick !== undefined} idle={pick !== undefined && !pick.status.active} tags={tags}>
        {pick ? (
          <HoloArt kind={pick.kind} idle={!pick.status.active} className="bp-holo" />
        ) : (
          <HoloArt
            idle={!warm}
            ore={tile.kind === 'resource' ? (gradeStep(grade) === 2 ? 2 : 1) : undefined}
            className="bp-holo"
          />
        )}
      </Stage>

      <ul className="bp-builds">
        {choices.map((c) => {
          const on = c.kind === pick?.kind
          return (
            <li key={c.kind} className={`bp-build${on ? ' is-on' : ''}${c.hard ? ' is-ng' : ''}`}>
              <button type="button" className="bp-build-row" disabled={c.hard !== null} onClick={() => setPicked(c.kind)}>
                <span className="bp-build-icon">
                  <span className="bp-hex">
                    <span>
                      <HoloArt kind={c.kind} idle={false} className="bp-mini" />
                    </span>
                  </span>
                </span>
                <span className="bp-build-main">
                  <span className="bp-build-top">
                    <b>{t[c.kind]}</b>
                    <span className="bp-cost">
                      <BillIcon className="bp-bill" />
                      {c.cost.toLocaleString('en-US')}
                    </span>
                  </span>
                  {/* 建てられるなら何も出さない */}
                  {c.hard && <span className="bp-build-desc is-ng">{c.hard}</span>}
                </span>
              </button>
              {on && c.output !== undefined && (
                <div className="bp-build-open">
                  <OutputCarousel
                    view={view}
                    kind={c.kind}
                    value={c.output}
                    onPick={(itemId) => setOutputs({ ...outputs, [c.kind]: itemId })}
                  />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </DetailCard>
  )
}
