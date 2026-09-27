import GemIcon from '../../../components/common/GemIcon'
import { PERMANENT_MISSIONS, type PermanentCondition } from '../../../data/missions'
import { permanentProgress, type PermanentBase } from '../../../features/mission/permanent'
import { CATEGORIES, CONDITION_KEYS, type Category } from '../keys'
import MissionRow, { type MissionRowData } from './MissionRow'

type ConditionKind = PermanentCondition['kind']

const categoryOf = (kind: ConditionKind) => CATEGORIES.find((c) => c.kinds.includes(kind))!

// {0} に入れる値
function valueOf(c: PermanentCondition): string {
  switch (c.kind) {
    case 'stageClear':
      return c.stageId
    case 'rank':
      return String(c.rank)
    case 'characterLevel':
    case 'skillLevel':
      return String(c.level)
    case 'limitBreak':
    case 'characterCount':
      return String(c.count)
  }
}

const isClaimable = (r: MissionRowData) => !r.claimed && r.current >= r.target

// 受け取れる -> 進行中 -> 受取済み
const order = (r: MissionRowData) => (r.claimed ? 2 : isClaimable(r) ? 0 : 1)

type Props = {
  base: PermanentBase
  done: string[]
  category: Category
  pending: boolean
  t: Record<string, string>
  onCategory: (category: Category) => void
  onClaim: (id: string) => void
  onClaimAll: () => void
}

// 永続の欄
export default function PermanentPanel({
  base,
  done,
  category,
  pending,
  t,
  onCategory,
  onClaim,
  onClaimAll,
}: Props) {
  const rows = PERMANENT_MISSIONS.map((m) => {
    const cat = categoryOf(m.condition.kind)
    const row: MissionRowData = {
      key: m.id,
      caption: cat.caption,
      text: t[CONDITION_KEYS[m.condition.kind]],
      value: valueOf(m.condition),
      ...permanentProgress(base, m.condition),
      gems: m.gems,
      claimed: done.includes(m.id),
    }
    return { row, category: cat.key }
  })

  // 同じ順位の中では定義順
  const shown = rows
    .filter((r) => category === 'all' || r.category === category)
    .sort((a, b) => order(a.row) - order(b.row))

  const claimedRows = rows.filter((r) => r.row.claimed)
  const claimable = rows.some((r) => isClaimable(r.row))
  // まとめて受け取るで手に入る数。カテゴリの絞り込みに関係なく全件
  const claimableGems = rows
    .filter((r) => isClaimable(r.row))
    .reduce((sum, r) => sum + r.row.gems, 0)

  return (
    <>
      <div className="mission-head">
        <div className="mission-head-title">
          <span>{t.permanentTitle}</span>
        </div>
        <ul className="mission-categories">
          {CATEGORIES.map((c) => {
            const has = rows.some(
              (r) => (c.key === 'all' || r.category === c.key) && isClaimable(r.row),
            )
            const className = [
              'mission-category',
              category === c.key ? 'is-active' : '',
              has ? 'has-claimable' : '',
            ].join(' ')
            return (
              <li key={c.key}>
                <button type="button" className={className} onClick={() => onCategory(c.key)}>
                  {t[c.labelKey]}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <ul className="mission-list">
        {shown.map(({ row }, index) => (
          <MissionRow
            key={row.key}
            row={row}
            index={index}
            disabled={pending}
            labels={{ claim: t.claim, inProgress: t.inProgress }}
            onClaim={() => onClaim(row.key)}
          />
        ))}
      </ul>

      <div className="mission-foot">
        <div className="mission-foot-summary">
          <span className="mission-row-caption">PROGRESS //</span>
          <span className="mission-foot-label">
            {t.doneCount} <b>{claimedRows.length}</b> / {rows.length}
          </span>
          <span className="mission-progress-bar">
            <i style={{ width: `${(claimedRows.length / rows.length) * 100}%` }} />
          </span>
        </div>
        <span className={`mission-reward${claimable ? '' : ' is-claimed'}`}>
          <GemIcon className="" />
          <b>{claimableGems.toLocaleString('en-US')}</b>
        </span>
        <button
          type="button"
          className="mission-claim-all"
          disabled={pending || !claimable}
          onClick={onClaimAll}
        >
          {t.claimAll}
        </button>
      </div>
    </>
  )
}
