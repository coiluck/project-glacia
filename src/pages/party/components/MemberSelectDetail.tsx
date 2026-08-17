import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ScreenViewportContext } from '../../../layouts/ScreenFrame'
import { paths } from '../../../router/paths'
import { useTranslations } from '../../../i18n'
import { characterMasters } from '../../../data/characters'
import { formatSkillDescription } from '../../../features/characters/describe'
import type { ResolvedCharacter } from '../../../features/characters/resolve'
import { useCharacterStore } from '../../../stores/characterStore'

// i18n。キャラ名・スキル名・スキルの説明文はどれも characters.json にある
const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).flatMap((c): [string, string][] => [
    [c.nameKey, c.nameKey],
    ...c.skills.flatMap((s): [string, string][] => [
      [s.def.nameKey, s.def.nameKey],
      [s.descriptionKey, s.descriptionKey],
    ]),
  ]),
)

// ★1はスキルが1つだけだが、枠の数で高さが変わらないよう常にこの数だけ並べる
const SKILL_SLOT_COUNT = 2

interface SkillRowProps {
  cost: string
  range: string // TODO: 攻撃範囲svgを描くのに使う。今は受け取るだけ
  name: string
  level: string
  description: string
  isSelected?: boolean // 出撃時に使うスキル（UserCharacter.selectedSkillId）かどうか
  onClick?: () => void // 押すと出撃時に使うスキルが切り替わる。空き枠は押せない
}

// キャラ未選択、または★1で2つ目のスキルが無い枠。文字を入れて高さを揃える
const EMPTY_SKILL_ROW: SkillRowProps = {
  cost: '--',
  range: '--',
  name: 'No Data',
  level: '--',
  description: '',
}

function SkillRow({ cost, name, level, description, isSelected, onClick }: SkillRowProps) {
  return (
    <div
      className={`party-member-select-skill-item${onClick ? ' is-clickable' : ''}${
        isSelected ? ' is-selected' : ''
      }`}
      onClick={onClick}
    >
      <div className="party-member-select-skill-side">
          {/* 攻撃範囲svg */}
      </div>

      <div className="party-member-select-skill-cost">
        <span>AP</span>
        <span>{cost}</span>
      </div>

      <div className="party-member-select-skill-main">
        <div className="party-member-select-skill-head">
          <span className="party-member-select-skill-name">{name}</span>
          <span className="party-member-select-skill-level">Lv.{level}</span>
        </div>
        <p className="party-member-select-skill-description">{description}</p>
      </div>
    </div>
  )
}

interface MemberSelectDetailProps {
  selected: ResolvedCharacter | null // 一覧で選択中のキャラ。null なら未選択
}

// 選択中キャラの詳細パネル。
// セーフエリア外（実画面の高さいっぱい）に出すのでビューポートへPortalする
export default function MemberSelectDetail({ selected }: MemberSelectDetailProps) {
  const tCharacter = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)
  const setSelectedSkill = useCharacterStore((s) => s.setSelectedSkill)
  const viewportEl = useContext(ScreenViewportContext)
  if (!viewportEl) return null

  return createPortal(
    <div className="party-member-select-detail fade-in">
      <div className="party-member-select-detail-header">
        <p className="party-member-select-name">
          {selected ? tCharacter[selected.master.nameKey] : '選択してください'}
        </p>

        <Link
          className="party-member-select-enhance"
          to={paths.memberDetail(selected?.master.id ?? '')}
        >
          強化する
        </Link>
      </div>

      <div className="party-member-select-level-container">
        <span className="party-member-select-level-current">Lv.{selected?.level ?? ' ---'}</span>
        <span className="party-member-select-level-separator">/</span>
        <span className="party-member-select-level-max">{selected?.maxLevel ?? ' ---'}</span>
      </div>

      <dl className="party-member-select-stats-container">
        <div className="party-member-select-stats-item">
          <dt>HP</dt>
          <dd>{selected?.status.hp ?? '---'}</dd>
        </div>
        <div className="party-member-select-stats-item">
          <dt>ATK</dt>
          <dd>{selected?.status.attack ?? '---'}</dd>
        </div>
        <div className="party-member-select-stats-item">
          <dt>DEF</dt>
          <dd>{selected?.status.defense ?? '---'}</dd>
        </div>
      </dl>

      {/* 1~3しかスタイルしてないので無効なクラスでも許容 */}
      <div className={`party-member-select-detail-separator is-rarity-${selected?.master.rarity}`} />

      <div className="party-member-select-detail-skills-container">
        {Array.from({ length: SKILL_SLOT_COUNT }, (_, i) => {
          const skill = selected?.skills[i]
          if (!selected || !skill) return <SkillRow key={i} {...EMPTY_SKILL_ROW} />

          return (
            <SkillRow
              key={skill.def.id}
              cost={String(skill.def.apCost)}
              range={String(skill.def.range)}
              name={tCharacter[skill.def.nameKey] ?? ''}
              level={String(skill.level)}
              description={formatSkillDescription(tCharacter[skill.descriptionKey] ?? '', skill)}
              isSelected={skill.def.id === selected.user.selectedSkillId}
              onClick={() => setSelectedSkill(selected.master.id, skill.def.id)}
            />
          )
        })}
      </div>
    </div>,
    viewportEl,
  )
}
