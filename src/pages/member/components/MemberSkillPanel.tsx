import { useTranslations } from '../../../i18n'
import AttackRangeHex from '../../../components/common/AttackRangeHex'
import MaterialCostList from './MaterialCostList'
import { characterMasters } from '../../../data/characters'
import { MAX_SKILL_LEVEL } from '../../../data/characters/types'
import { skillReach } from '../../../features/battle/battle'
import { formatSkillDescription } from '../../../features/characters/describe'
import type { ResolvedCharacter } from '../../../features/characters/resolve'
import { useCharacterStore } from '../../../stores/characterStore'

// i18n。スキル名・説明文はどちらも characters.json にある
const SKILL_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).flatMap((c) =>
    c.skills.flatMap((s): [string, string][] => [
      [s.def.nameKey, s.def.nameKey],
      [s.descriptionKey, s.descriptionKey],
    ]),
  ),
)

// 射程プレビューの viewBox 基準。実寸は CSS 側で決める
const RANGE_HEX_SIZE = 20

// キャラが持つスキルの一覧。出撃スキルの切替はここで完結し、
// スキルレベル上げは素材が要るのでまだ押せない
export default function MemberSkillPanel({ character }: { character: ResolvedCharacter }) {
  const tSkill = useTranslations('characters', SKILL_TRANSLATION_MAPPING)
  const setSelectedSkill = useCharacterStore((s) => s.setSelectedSkill)

  return (
    <div className="member-detail-skills">
      {character.skills.map((skill) => {
        const isSelected = skill.def.id === character.user.selectedSkillId

        return (
          <div
            key={skill.def.id}
            className={`member-detail-skill${isSelected ? ' is-selected' : ''}`}
          >
            <div className="member-detail-skill-range">
              <AttackRangeHex tiles={skillReach(skill.def)} size={RANGE_HEX_SIZE} />
            </div>

            <div className="member-detail-skill-main">
              <div className="member-detail-skill-head">
                <span className="member-detail-skill-name">{tSkill[skill.def.nameKey]}</span>
                <span className="member-detail-skill-level">
                  Lv.{skill.level} / {MAX_SKILL_LEVEL}
                </span>
                <span className="member-detail-skill-cost">AP {skill.def.apCost}</span>
              </div>

              <p className="member-detail-skill-description">
                {formatSkillDescription(tSkill[skill.descriptionKey] ?? '', skill)}
              </p>

              <div className="member-detail-skill-actions">
                {/* 出撃時に使うスキル。★1は1つしか無いので切り替える意味が無い */}
                <button
                  type="button"
                  className="member-detail-skill-equip"
                  disabled={isSelected || character.skills.length < 2}
                  onClick={() => setSelectedSkill(character.master.id, skill.def.id)}
                >
                  {isSelected ? '出撃スキル' : '出撃スキルにする'}
                </button>

                {/* TODO: inventoryStore ができたら有効化する */}
                <button type="button" className="member-detail-skill-levelup" disabled>
                  Lv上げ
                </button>

                <MaterialCostList costs={skill.nextLevelCost} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
