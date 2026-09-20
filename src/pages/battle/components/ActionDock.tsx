import AttackRangeHex from '../../../components/common/AttackRangeHex'
import { skillReach } from '../../../features/battle/battle'
import type { AttackShape } from '../../../features/battle/hex'
import type { SkillDef, UnitClassDef } from '../../../features/battle/types'
import type { ActionMode } from '../BattlePage'
import ApPips from './ApPips'

// 射程の表記
function rangeText(shape: AttackShape): string {
  if (shape.kind !== 'range') return ''
  if (shape.max === 0) return 'SELF'
  return `RANGE ${shape.min ?? 1}–${shape.max}`
}

interface ActionDockProps {
  unitClass: UnitClassDef
  skill?: SkillDef
  skillName: string
  attackLabel: string
  deselectLabel: string
  action: ActionMode
  canAttack: boolean
  canSkill: boolean
  onAttack: () => void
  onSkill: () => void
  onDeselect: () => void
  onHover: (kind: 'attack' | 'skill' | null) => void // 消費APの予告用
}

// 右下の行動ボタン。消費APと射程を載せる
export default function ActionDock({
  unitClass,
  skill,
  skillName,
  attackLabel,
  deselectLabel,
  action,
  canAttack,
  canSkill,
  onAttack,
  onSkill,
  onDeselect,
  onHover,
}: ActionDockProps) {
  return (
    <div className="battle-action-dock">
      <div className="battle-action-row">
        <button
          type="button"
          className={`battle-action-button is-attack${action === 'attack' ? ' is-active' : ''}`}
          disabled={!canAttack}
          onClick={onAttack}
          onPointerEnter={() => onHover('attack')}
          onPointerLeave={() => onHover(null)}
        >
          <span className="battle-action-kind">ATTACK</span>
          <span className="battle-action-name">{attackLabel}</span>
          <span className="battle-action-foot">
            <span className="battle-action-cost">
              <ApPips max={unitClass.attackCost} current={unitClass.attackCost} />
              {unitClass.attackCost} AP
            </span>
            <span className="battle-action-range">{rangeText(unitClass.attackRange)}</span>
          </span>
        </button>
        {skill && (
          <button
            type="button"
            className={`battle-action-button is-skill${action === 'skill' ? ' is-active' : ''}`}
            disabled={!canSkill}
            onClick={onSkill}
            onPointerEnter={() => onHover('skill')}
            onPointerLeave={() => onHover(null)}
          >
            <span className="battle-action-kind">SKILL</span>
            <span className="battle-action-name">{skillName}</span>
            <span className="battle-action-shape">
              <AttackRangeHex tiles={skillReach(skill)} size={10} />
            </span>
            <span className="battle-action-foot">
              <span className="battle-action-cost">
                <ApPips max={skill.apCost} current={skill.apCost} />
                {skill.apCost} AP
              </span>
              <span className="battle-action-range">{rangeText(skill.range)}</span>
            </span>
          </button>
        )}
      </div>
      <button type="button" className="battle-action-deselect" onClick={onDeselect}>
        {deselectLabel}
      </button>
    </div>
  )
}
