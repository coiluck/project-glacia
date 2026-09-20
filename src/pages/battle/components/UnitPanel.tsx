import { classIcons } from '../../../data/characters/classIcons'
import type { Unit, UnitClassDef } from '../../../features/battle/types'
import ApPips from './ApPips'

// HPバーがこの割合以下で色を変える
const LOW_HP_RATIO = 0.3

interface UnitPanelProps {
  unit: Unit
  name: string
  unitClass: UnitClassDef
  className: string // 兵科名（翻訳済み）
  ap: number // 表示するAP。味方は今使える量、敵は1ターンに使える量
  spend: number // 予告中の消費AP（味方のみ）
  notes?: string[] // 敵の補足（通常攻撃・スキル）。1行ずつ
}

export default function UnitPanel({ unit, name, unitClass, className, ap, spend, notes }: UnitPanelProps) {
  const isAlly = unit.side === 'ally'
  const low = unit.hp / unit.maxHp <= LOW_HP_RATIO
  return (
    <div className={`battle-unit-panel battle-panel${isAlly ? '' : ' is-enemy'}`}>
      <div className="battle-unit-panel-portrait">
        {isAlly ? (
          <img
            src={`${import.meta.env.BASE_URL}images/character/face/${unit.id.slice('ally-'.length)}.png`}
            alt=""
            draggable={false}
          />
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d={classIcons[unit.classId]} />
          </svg>
        )}
      </div>
      <div className="battle-unit-panel-main">
        <div className="battle-unit-panel-head">
          <span className="battle-unit-panel-name">{name}</span>
          <span className="battle-unit-panel-class">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d={classIcons[unit.classId]} />
            </svg>
            {className}
          </span>
          <span className="battle-label battle-unit-panel-side">{isAlly ? 'ALLY' : 'ENEMY'}</span>
        </div>
        <div className="battle-unit-panel-hp">
          <span className="battle-label">HP</span>
          <div className="battle-unit-panel-hp-bar">
            <div
              className={`battle-unit-panel-hp-fill${low ? ' is-low' : ''}`}
              style={{ width: `${(unit.hp / unit.maxHp) * 100}%` }}
            />
          </div>
          <span className="battle-num">
            {unit.hp}
            <small> / {unit.maxHp}</small>
          </span>
        </div>
        <div className="battle-unit-panel-row">
          <div className="battle-unit-panel-ap">
            <span className="battle-label">{isAlly ? 'AP' : 'AP / TURN'}</span>
            <ApPips max={unitClass.apPerTurn} current={ap} spend={spend} size="small" />
            <span className="battle-num">
              {ap}
              <small>/{unitClass.apPerTurn}</small>
            </span>
          </div>
          <div className="battle-unit-panel-stat">
            <span className="battle-label">ATK</span>
            <span className="battle-num">{unit.attack}</span>
          </div>
          <div className="battle-unit-panel-stat">
            <span className="battle-label">DEF</span>
            <span className="battle-num">{unit.defense}</span>
          </div>
        </div>
        {notes && notes.length > 0 && (
          <div className="battle-unit-panel-note">
            {notes.map((note) => (
              <span key={note}>{note}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
