import { useState } from 'react'
import { useTranslations } from '../../../i18n'
import AttackRangeHex from '../../../components/common/AttackRangeHex'
import MaterialCostList from './MaterialCostList'
import { enhanceCharacter } from '../../../api/actions/characters'
import { characterMasters } from '../../../data/characters'
import { MAX_SKILL_LEVEL } from '../../../data/characters/types'
import { skillReach } from '../../../features/battle/battle'
import { formatSkillDescription } from '../../../features/characters/describe'
import { hasItems } from '../../../features/inventory/inventory'
import type { ResolvedCharacter } from '../../../features/characters/resolve'
import { useCharacterStore } from '../../../stores/characterStore'
import { useInventoryStore } from '../../../stores/inventoryStore'

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

// キャラが持つスキルの一覧。出撃スキルの切替とスキルレベル上げをここで完結させる
export default function MemberSkillPanel({ character }: { character: ResolvedCharacter }) {
  const tSkill = useTranslations('characters', SKILL_TRANSLATION_MAPPING)
  const setSelectedSkill = useCharacterStore((s) => s.setSelectedSkill)
  const items = useInventoryStore((s) => s.items)
  const [pending, setPending] = useState(false) // 応答待ち。二重に押させない
  const [error, setError] = useState<string | null>(null)

  const levelUpSkill = async (skillId: string) => {
    if (pending) return
    setPending(true)
    setError(null)
    try {
      await enhanceCharacter({ kind: 'skill', masterId: character.master.id, skillId })
    } catch (e) {
      setError(e instanceof Error ? e.message : '失敗した')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="member-detail-skills">
      {character.skills.map((skill) => {
        const isSelected = skill.def.id === character.user.selectedSkillId
        const canLevelUp = skill.nextLevelCost !== null && hasItems(items, skill.nextLevelCost)

        return (
          <div
            key={skill.def.id}
            className={`member-detail-skill${isSelected ? ' is-selected' : ''}`}
          >
            <div className="member-detail-skill-range">
              <AttackRangeHex tiles={skillReach(skill.def)} size={RANGE_HEX_SIZE} />
            </div>

            <div
              className="member-detail-skill-main"
              onClick={() => setSelectedSkill(character.master.id, skill.def.id)}
            >
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

              <div
                className="member-detail-skill-actions"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="member-detail-skill-levelup"
                  disabled={pending || !canLevelUp}
                  onClick={() => levelUpSkill(skill.def.id)}
                >
                  Lv上げ
                </button>

                <MaterialCostList costs={skill.nextLevelCost} />
              </div>
            </div>
          </div>
        )
      })}

      {error && <span className="member-detail-enhance-error">{error}</span>}
    </div>
  )
}
