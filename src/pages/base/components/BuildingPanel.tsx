import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { baseBuildings, STORAGE_HOURS } from '../../../data/base'
import { items } from '../../../data/items'
import { keyToAxial, outputsOf } from '../../../features/base/board'
import BillIcon from '../../../components/common/BillIcon'
import ItemIcon from '../../../components/common/ItemIcon'
import { EMBLEMS } from './art'
import { DetailCard, GoldButton, HeatCells, HoloArt, Stage } from './detail'
import { OutputPicker } from './parts'
import { boostOf, faceUrl, fill, formatPerHour, previewWith } from '../view'
import type { BaseView, Stock } from '../view'

type Props = {
  view: BaseView
  tileKey: string
  stock: Stock | undefined
  onClose: () => void
}

// 建物のあるマスの詳細。上に絵と大きい輪（採掘場と書庫）、下に状態の行と強化
export default function BuildingPanel({ view, tileKey, stock, onClose }: Props) {
  const { t, tItem, tName, base, analysis, currency, pending, run } = view
  const [sub, setSub] = useState<'output' | null>(null)
  const [why, setWhy] = useState(false) // 止まっている理由のモーダルを開いている
  const status = analysis.buildings[tileKey]
  const { building } = status
  const { kind } = building
  const def = baseBuildings[kind]
  const pos = keyToAxial(tileKey)
  const level = kind === 'pipe' ? undefined : building.level
  const outputCost = outputsOf(kind).find((o) => o.itemId === building.output)?.cost
  const heat = status.active ? def.heat : 0

  const card = (children: ReactNode) => (
    <DetailCard
      emblem={kind === 'pipe' ? undefined : EMBLEMS[kind]}
      title={t[kind]}
      level={level}
      closeLabel={t.close}
      onClose={onClose}
    >
      {children}
    </DetailCard>
  )

  // 作る物を選ぶ
  if (sub === 'output' && building.output !== undefined) {
    return card(
      <>
        <button type="button" className="bp-back" onClick={() => setSub(null)}>
          {fill(t.backTo, t[kind])}
        </button>
        <OutputPicker
          view={view}
          kind={kind}
          level={building.level}
          value={building.output}
          onPick={(output) => run({ kind: 'output', pos, output })}
        />
      </>,
    )
  }

  // 採掘場と書庫は貯まった数の大きい輪を出す
  let hero: ReactNode = null
  // 貯蔵庫と配管は輪の代わりに効果の行を出す
  let effect: string | null = null
  if (outputCost !== undefined) {
    const perHour = status.rate / outputCost
    const cap = Math.floor((status.rate * status.hours) / outputCost)
    const count = stock?.count ?? 0
    hero = (
      <div className={`bp-hero${stock?.full ? ' is-gold' : ''}`}>
        <div className="bp-ring" style={{ '--p': stock?.next ?? 0 } as CSSProperties}>
          <div className="bp-ring-in">
            <ItemIcon item={items[building.output!]} className="base-item-icon" />
            <b>{count}</b>
            {cap > 0 && <small>/ {cap}</small>}
          </div>
        </div>
        <div className="bp-hero-list">
          <div className={`bp-hero-row${status.active ? '' : ' is-bad'}`}>
            <small>{t.perHourLabel}</small>
            <b>
              {formatPerHour(perHour)}
              <i>{t.pieceUnit}</i>
            </b>
          </div>
          <div className="bp-hero-row">
            <small>{t.heatUse}</small>
            <HeatCells used={heat} total={def.heat} />
          </div>
        </div>
      </div>
    )
  } else if (kind === 'storage') {
    effect = fill(t.storageEffect, fill(t.hours, STORAGE_HOURS[building.level - 1]))
  } else {
    effect = t.warmTiles
  }

  // 強化
  const nextCost = kind === 'pipe' ? undefined : def.costs[building.level]
  const refund = def.costs.slice(0, building.level).reduce((a, b) => a + b, 0)
  const upgraded =
    nextCost === undefined
      ? null
      : previewWith(view, {
          base_board: { ...base.base_board, [tileKey]: { ...building, level: building.level + 1 } },
        }).buildings[tileKey]

  return card(
    <>
      <Stage idle={!status.active}>
        <HoloArt kind={kind} idle={!status.active} className="bp-holo" />
      </Stage>

      {hero}

      <div className="bp-rows">
        {status.active ? (
          <Row label={t.operation}>
            <span className="bp-dot" />
            {t.stateActive}
          </Row>
        ) : (
          <>
            <div className="bp-row is-bad">
              <span className="bp-row-label">{t.operation}</span>
              <span className="bp-row-val">
                <span className="bp-dot is-off" />
                {t.stateIdle}
                <button
                  type="button"
                  className={`bp-info${why ? ' is-on' : ''}`}
                  aria-label={t.whyIdle}
                  onClick={() => setWhy(!why)}
                >
                  i
                </button>
              </span>
            </div>
          </>
        )}
        {effect && (
          <>
            <Row label={t.heatUse}>
              <HeatCells used={heat} total={def.heat} />
            </Row>
            <Row label={t.effect}>{effect}</Row>
          </>
        )}
        {building.output !== undefined && (
          <>
            <button type="button" className="bp-row" onClick={() => setSub('output')}>
              <span className="bp-row-label">{t.output}</span>
              <span className="bp-row-val">
                <ItemIcon item={items[building.output]} className="base-item-icon" />
                <b>{tItem[building.output]}</b>
              </span>
              <i className="bp-chev" />
            </button>
            <Row label={t.worker}>
              {status.workerIds.length > 0 ? (
                <>
                  {status.workerIds.map((id) => (
                    <img key={id} className="bp-face" src={faceUrl(id)} alt={tName[id]} draggable={false} />
                  ))}
                  <b className="bp-boost">
                    +{Math.round(status.workerIds.reduce((sum, id) => sum + boostOf(view, id), 0) * 100)}%
                  </b>
                </>
              ) : (
                <span className="bp-none">{t.none}</span>
              )}
            </Row>
            <Row label={t.storeTime}>{fill(t.fullAfter, status.hours)}</Row>
          </>
        )}
      </div>

      {kind !== 'pipe' && (
        <section className="bp-sec">
          <h3 className="bp-sec-title">{t.upgrade}</h3>
          {upgraded === null ? (
            <p className="bp-hint">{t.maxLevel}</p>
          ) : (
            <>
              <dl className="bp-cmp">
                {outputCost !== undefined && status.active && (
                  <div>
                    <dt>{t.perHourLabel}</dt>
                    <dd>
                      {formatPerHour(status.rate / outputCost)} → <b>{formatPerHour(upgraded.rate / outputCost)}</b>
                    </dd>
                  </div>
                )}
                {kind === 'storage' && (
                  <div>
                    <dt>{t.storageHours}</dt>
                    <dd>
                      {fill(t.hours, STORAGE_HOURS[building.level - 1])} →{' '}
                      <b>{fill(t.hours, STORAGE_HOURS[building.level])}</b>
                    </dd>
                  </div>
                )}
              </dl>
              <GoldButton
                label={t.upgrade}
                cost={nextCost!}
                reason={currency < nextCost! ? t.reasonCurrency : null}
                pending={pending}
                onClick={() => run({ kind: 'upgrade', pos })}
              />
            </>
          )}
        </section>
      )}

      <button type="button" className="bp-remove" disabled={pending} onClick={() => run({ kind: 'remove', pos })}>
        {t.remove}
        <span>
          <BillIcon className="bp-bill" />+{refund.toLocaleString('en-US')}
        </span>
      </button>

      {/* 止まっている理由。パネルの中央に出し、外側を押すと閉じる */}
      {why && (
        <div className="bp-modal" onClick={() => setWhy(false)}>
          <div className="bp-modal-box" onClick={(e) => e.stopPropagation()}>
            <p className="bp-pop">{kind === 'pipe' ? t.whyCut : t.whyCold}</p>
            <button type="button" className="bp-modal-close" onClick={() => setWhy(false)}>
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>,
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="bp-row">
      <span className="bp-row-label">{label}</span>
      <span className="bp-row-val">{children}</span>
    </div>
  )
}
