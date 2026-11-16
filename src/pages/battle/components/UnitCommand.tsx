import AttackRangeHex from '../../../components/common/AttackRangeHex'
import type { Axial } from '../../../features/battle/hex'
import type { Unit } from '../../../features/battle/types'
import type { ActionMode } from '../BattlePage'
import ApPips from './ApPips'

// 行動カード1枚分。文言は呼び出し側で翻訳・組み立て済み
export interface ActionCardInfo {
  name: string
  desc: string
  cost?: number // 消費AP。敵のスキルは消費APを見せない
  range: string
  reach: Axial[] // 効果が及ぶマス（術者が原点）
  note?: string // 敵スキルの発動条件
}

interface UnitCommandProps {
  unit: Unit
  name: string
  portrait: string
  ap: number // 表示するAP。味方は今使える量、敵は1ターンに使える量
  spend: number // 予告中の消費AP（味方のみ）
  labels: { lv: string; attack: string; defense: string; attackKind: string; skillKind: string }
  attackCard?: ActionCardInfo // 敵は次に使う方の1枚だけを渡す
  skillCard?: ActionCardInfo
  // 味方だけ。敵のカードは見るだけ
  action?: ActionMode
  canAttack?: boolean
  canSkill?: boolean
  onAttack?: () => void
  onSkill?: () => void
  onHover?: (kind: 'attack' | 'skill' | null) => void // 消費APの予告用
}

// HPバーがこの割合以下で色を変える
const LOW_HP_RATIO = 0.3

// 選択中ユニットの情報
export default function UnitCommand({
  unit,
  name,
  portrait,
  ap,
  spend,
  labels,
  attackCard,
  skillCard,
  action,
  canAttack = true,
  canSkill = true,
  onAttack,
  onSkill,
  onHover,
}: UnitCommandProps) {
  const isAlly = unit.side === 'ally'
  const low = unit.hp / unit.maxHp <= LOW_HP_RATIO

  const card = (kind: 'attack' | 'skill', info: ActionCardInfo) => {
    const active = action === kind
    const disabled = kind === 'attack' ? !canAttack : !canSkill
    const body = (
      <>
        <span className="battle-command-card-head">
          <span className="battle-command-card-kind">{kind === 'attack' ? labels.attackKind : labels.skillKind}</span>
          <span className="battle-command-card-name">{info.name}</span>
          <span className="battle-command-card-meta">
            {info.cost !== undefined && (
              <span className="battle-command-card-cost">
                <ApPips max={info.cost} current={info.cost} size="small" />
                <span className="battle-num">{info.cost}</span> AP
              </span>
            )}
            <span className="battle-command-card-range">{info.range}</span>
          </span>
        </span>
        <span className="battle-command-card-body">
          <span className="battle-command-card-desc">
            {info.desc}
            {info.note && <span className="battle-command-card-note">{info.note}</span>}
          </span>
          <span className="battle-command-card-reach">
            <AttackRangeHex tiles={info.reach} size={10} />
          </span>
        </span>
      </>
    )
    if (!isAlly) return <div className="battle-command-card is-info">{body}</div>
    return (
      <button
        type="button"
        className={`battle-command-card${active ? ' is-active' : ''}`}
        data-guide={kind === 'skill' ? 'skill' : undefined}
        disabled={disabled}
        onClick={kind === 'attack' ? onAttack : onSkill}
        onPointerEnter={() => onHover?.(kind)}
        onPointerLeave={() => onHover?.(null)}
      >
        {body}
      </button>
    )
  }

  return (
    <div className={`battle-command-unit${isAlly ? '' : ' is-enemy'}`}>
      <div className="battle-command-portrait">
        <img src={portrait} alt="" draggable={false} />
      </div>
      <div className="battle-command-info">
        <div className="battle-command-name-row">
          <span className="battle-command-name">{name}</span>
          <span className="battle-command-level">
            {labels.lv}
            <span className="battle-num">{unit.level}</span>
          </span>
        </div>
        <div className="battle-command-hp">
          <span className="battle-command-bar">
            <i className={low ? 'is-low' : ''} style={{ width: `${(unit.hp / unit.maxHp) * 100}%` }} />
          </span>
          <span className="battle-num">
            {unit.hp}
            <small> / {unit.maxHp}</small>
          </span>
        </div>
        <div className="battle-command-stats">
          <span className="battle-command-ap">
            AP
            <ApPips max={unit.unitClass.apPerTurn} current={ap} spend={spend} size="small" />
            <span className="battle-num">{ap}</span>
          </span>
          <span className="battle-command-stat">
            {labels.attack}
            <span className="battle-num">{unit.attack}</span>
          </span>
          <span className="battle-command-stat">
            {labels.defense}
            <span className="battle-num">{unit.defense}</span>
          </span>
        </div>
      </div>
      <div className="battle-command-cards">
        {attackCard && card('attack', attackCard)}
        {skillCard && card('skill', skillCard)}
      </div>
    </div>
  )
}
