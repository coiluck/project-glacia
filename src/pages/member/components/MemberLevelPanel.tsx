import { useState } from 'react'
import { useTranslations } from '../../../i18n'
import MaterialCostList from './MaterialCostList'
import BillIcon from '../../../components/common/BillIcon'
import { enhanceCharacter } from '../../../api/actions/characters'
import type { EnhancePayload } from '../../../api/types'
import { LIMIT_BREAK_LEVELS, MAX_LEVEL } from '../../../data/characters/types'
import { items } from '../../../data/items'
import { expToCap, gainExp, maxLevel } from '../../../features/characters/growth'
import { hasItems } from '../../../features/inventory/inventory'
import type { ResolvedCharacter } from '../../../features/characters/resolve'
import { useInventoryStore } from '../../../stores/inventoryStore'
import { useResourceStore } from '../../../stores/resourceStore'

// 育成記録データ
const RECORDS = Object.values(items)
  .filter((i) => i.kind === 'exp')
  .sort((a, b) => (a.exp ?? 0) - (b.exp ?? 0))

const RECORD_TRANSLATION_MAPPING = Object.fromEntries(RECORDS.map((r) => [r.nameKey, r.nameKey]))

// レールのマス数
const RAIL_CELLS = Math.max(...Object.values(MAX_LEVEL))

const arrow = (
  <svg className="member-detail-arrow" viewBox="0 0 24 24" aria-hidden>
    <path d="M3 12h16 M13 6l6 6-6 6" />
  </svg>
)

// 通貨
const bill = <BillIcon className="member-detail-bill" />

type GateState = 'open' | 'ready' | 'locked'

// 壁ノード。凸のノードと同じ六角形で、色だけ accent にする
function Gate({ level, state, large }: { level: number; state: GateState; large?: boolean }) {
  return (
    <span
      className={`member-detail-gate${state === 'open' ? ' is-open' : ''}${
        state === 'ready' ? ' is-ready' : ''
      }${large ? ' is-large' : ''}`}
    >
      <span>{level}</span>
    </span>
  )
}

// レベルアップと上限解放。上のレールに両方の位置関係を出し、下で操作する
export default function MemberLevelPanel({ character }: { character: ResolvedCharacter }) {
  const { master, user } = character
  const tItem = useTranslations('items', RECORD_TRANSLATION_MAPPING)
  const owned = useInventoryStore((s) => s.items)
  const currency = useResourceStore((s) => s.currency)
  const [use, setUse] = useState<Record<string, number>>({}) // 使う育成記録の個数
  const [pending, setPending] = useState(false) // 応答待ち。二重に押させない
  const [error, setError] = useState<string | null>(null)

  const walls = LIMIT_BREAK_LEVELS[master.rarity]
  const rarityMax = MAX_LEVEL[master.rarity]
  const cap = character.maxLevel
  const room = expToCap(master, user) // 上限まであと何経験値か。0 なら上限
  const total = RECORDS.reduce((sum, r) => sum + (r.exp ?? 0) * (use[r.id] ?? 0), 0)
  const afterLevel = gainExp(master, user, total).level

  const run = async (payload: EnhancePayload) => {
    if (pending) return
    setPending(true)
    setError(null)
    try {
      await enhanceCharacter(payload)
      setUse({})
    } catch (e) {
      setError(e instanceof Error ? e.message : '失敗した')
    } finally {
      setPending(false)
    }
  }

  // レベルアップ
  // 上限を超える分は捨てられるので、超える前の1つまでは足せる
  const canAdd = (id: string) => (owned[id] ?? 0) > (use[id] ?? 0) && total < room
  const step = (id: string, delta: number) =>
    setUse({ ...use, [id]: Math.max(0, (use[id] ?? 0) + delta) })

  // 上限まで自動で選ぶ
  const fillToCap = () => {
    const next: Record<string, number> = {}
    let sum = 0
    while (sum < room) {
      const rem = room - sum
      const avail = RECORDS.filter((r) => (owned[r.id] ?? 0) > (next[r.id] ?? 0))
      if (avail.length === 0) break
      const pick = [...avail].reverse().find((r) => (r.exp ?? 0) <= rem) ?? avail[0]
      next[pick.id] = (next[pick.id] ?? 0) + 1
      sum += pick.exp ?? 0
    }
    setUse(next)
  }

  const levelUp = () =>
    run({
      kind: 'level',
      masterId: master.id,
      use: RECORDS.filter((r) => use[r.id]).map((r) => ({ itemId: r.id, count: use[r.id] })),
    })

  const canFill = room > 0 && RECORDS.some((r) => (owned[r.id] ?? 0) > 0)
  const shortCurrency = currency < total
  const cappedText =
    user.limitBreak < walls.length
      ? `上限に達している。上限解放で Lv ${maxLevel(master.rarity, user.limitBreak + 1)} まで上げられる`
      : '最大レベルに達している'

  // 上限解放
  const cost = character.nextLimitBreakCost
  const nextWall = walls[user.limitBreak]
  const canRelease = character.canLimitBreak && cost !== null && hasItems(owned, cost)
  const release = () => run({ kind: 'limitBreak', masterId: master.id })

  const gateState = (i: number): GateState =>
    i < user.limitBreak ? 'open' : i === user.limitBreak && character.canLimitBreak ? 'ready' : 'locked'
  const gateCaption = (i: number) => {
    const state = gateState(i)
    return state === 'open' ? '解放済み' : state === 'ready' ? '解放できる' : `Lv${walls[i]} で解放`
  }

  // ─ レール ─
  const cells = []
  for (let l = 1; l <= RAIL_CELLS; l++) {
    const state =
      l <= character.level
        ? ' is-reached'
        : l <= afterLevel
          ? ' is-preview'
          : l <= cap
            ? ''
            : l <= rarityMax
              ? ' is-locked'
              : ' is-none'
    cells.push(<span key={l} className={`member-detail-rail-cell${state}`} />)
  }

  return (
    <>
      <section className="member-detail-rail">
        <div className="member-detail-block-head">
          <h2 className="member-detail-section-title">レベル</h2>
          <span className="member-detail-level-note">
            {room === 0 ? cappedText : `上限 Lv${cap} まで あと ${room} EXP`}
          </span>
        </div>

        <div className="member-detail-rail-track">
          <span
            className="member-detail-rail-mark"
            style={{ width: `${(character.level / RAIL_CELLS) * 100}%` }}
          >
            <span className="member-detail-rail-mark-text">
              LV {character.level}
              {afterLevel !== character.level && (
                <span className="member-detail-rail-mark-preview">
                  {arrow}
                  {afterLevel}
                </span>
              )}
            </span>
          </span>

          <div className="member-detail-rail-cells">{cells}</div>

          {walls.map((wall, i) => (
            <span
              key={wall}
              className="member-detail-rail-gate"
              style={{ left: `${(wall / RAIL_CELLS) * 100}%` }}
            >
              <Gate level={wall} state={gateState(i)} />
              <span className="member-detail-rail-gate-caption">{gateCaption(i)}</span>
            </span>
          ))}
          <span className="member-detail-rail-end" style={{ left: 0 }}>
            1
          </span>
          <span
            className="member-detail-rail-end"
            style={{ left: `${(rarityMax / RAIL_CELLS) * 100}%` }}
          >
            {rarityMax}
          </span>
        </div>
      </section>

      <div className="member-detail-level-cols">
        <section className="member-detail-levelup">
          <div className="member-detail-block-head">
            <h2 className="member-detail-section-title">レベルアップ</h2>
            {room > 0 && (
              <span className="member-detail-level-note">上限まで あと {room} EXP</span>
            )}
          </div>

          {room === 0 ? (
            <div className="member-detail-level-capped">
              <span className="member-detail-level-capped-lv">
                LV {character.level} / {cap}
              </span>
              <span className="member-detail-level-note">{cappedText}</span>
            </div>
          ) : (
            <>
              <div className="member-detail-record-rows">
                {RECORDS.map((r) => {
                  const have = owned[r.id] ?? 0
                  const count = use[r.id] ?? 0
                  return (
                    <div
                      key={r.id}
                      className={`member-detail-record${have ? '' : ' is-empty'}`}
                    >
                      <svg
                        className={`member-detail-record-icon is-rarity-${r.rarity}`}
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path d={r.icon} />
                      </svg>
                      <span className="member-detail-record-name">{tItem[r.nameKey]}</span>
                      <span className="member-detail-record-exp">+{r.exp}</span>
                      <span className="member-detail-record-owned">
                        所持 <b>{have}</b>
                      </span>
                      <div className={`member-detail-stepper${count ? ' is-active' : ''}`}>
                        <button
                          type="button"
                          disabled={count === 0}
                          onClick={() => step(r.id, -1)}
                        >
                          -
                        </button>
                        <span>{count}</span>
                        <button
                          type="button"
                          disabled={!canAdd(r.id)}
                          onClick={() => step(r.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <span className={`member-detail-level-cost${shortCurrency ? ' is-short' : ''}`}>
                {bill}
                <b>−{total}</b>
                <span className="member-detail-level-cost-owned">
                  所持 <b>{currency}</b>
                </span>
              </span>

              <div className="member-detail-levelup-actions">
                <button
                  type="button"
                  className="member-detail-levelup-preset"
                  disabled={!canFill}
                  onClick={fillToCap}
                >
                  上限まで
                </button>
                <button
                  type="button"
                  className="member-detail-levelup-preset"
                  disabled={total === 0}
                  onClick={() => setUse({})}
                >
                  クリア
                </button>
                <button
                  type="button"
                  className="member-detail-levelup-button"
                  disabled={pending || total === 0 || shortCurrency}
                  onClick={levelUp}
                >
                  レベルアップ
                </button>
              </div>
            </>
          )}
        </section>

        <section className="member-detail-limit-break">
          <div className="member-detail-block-head">
            <h2 className="member-detail-section-title">上限解放</h2>
            <span className="member-detail-block-count">
              {user.limitBreak}/{walls.length}
            </span>
          </div>

          <div className="member-detail-gate-head">
            <Gate
              level={cost ? nextWall : walls[walls.length - 1]}
              state={cost ? gateState(user.limitBreak) : 'open'}
              large
            />
            <div className="member-detail-gate-text">
              <span className="member-detail-cap-jump">
                <span className="member-detail-cap-jump-label">上限</span>
                {cost ? (
                  <>
                    <b>{cap}</b>
                    {arrow}
                    <b className="is-accent">{maxLevel(master.rarity, user.limitBreak + 1)}</b>
                  </>
                ) : (
                  <b className="is-accent">{cap}</b>
                )}
              </span>
            </div>
          </div>

          {cost && (
            <>
              {/* 素材が足りない */}
              {!character.canLimitBreak ? (
                <span className="member-detail-limit-break-state">
                  Lv {nextWall} に到達すると解放できる（あと {nextWall - character.level} レベル）
                </span>
              ) : (
                canRelease && (
                  <span className="member-detail-limit-break-state is-ok">解放できる</span>
                )
              )}
              <MaterialCostList costs={cost} />
              <div>
                <button
                  type="button"
                  className="member-detail-limit-break-button"
                  disabled={pending || !canRelease}
                  onClick={release}
                >
                  解放する
                </button>
              </div>
            </>
          )}
        </section>
      </div>

      {error && <span className="member-detail-enhance-error">{error}</span>}
    </>
  )
}
