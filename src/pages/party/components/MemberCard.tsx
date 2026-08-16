import { classIcons } from '../../../data/characters/classIcons'
import type { ResolvedCharacter } from '../../../features/characters/resolve'

// ★の最大数。data/characters/types.ts の Rarity = 1 | 2 | 3 に対応する
const MAX_RARITY = 3

interface MemberCardProps {
  member: ResolvedCharacter | null // null なら空きスロット
  name: string // characters.json から引いたキャラ名
  unitClassName: string // battle.json から引いた兵科名
  fontSize?: number
  onClick?: () => void
}

// 兵科アイコン。バッジの枠は空きスロットでも出すので、アイコンだけを差し替える
function ClassIcon({ classId }: { classId: string }) {
  const path = classIcons[classId]
  if (!path) return null
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d={path} />
    </svg>
  )
}

export default function MemberCard({ member, name, unitClassName, fontSize = 16, onClick }: MemberCardProps) {
  // 空きスロット。並べたときに浮かないよう、枠・斜めバンド・名前帯は埋まっているカードと揃える
  if (!member) {
    return (
      <div className="party-member-card is-empty" style={{ fontSize: `${fontSize}px` }} onClick={onClick}>
        <div className="party-member-card-portrait" />
        <div className="party-member-card-band" />
        <div className="party-member-card-header">
          <span className="party-member-card-class-badge" />
        </div>
        <span className="party-member-card-add">＋</span>
        <div className="party-member-card-info-container">
          {/* 高さそろえ用 */}
          <div className="party-member-card-level" />
          <p className="party-member-card-name">空き</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`party-member-card is-rarity-${member.master.rarity}`} style={{ fontSize: `${fontSize}px` }} onClick={onClick}>
      <div className="party-member-card-portrait">
        <img
          src={`${import.meta.env.BASE_URL}images/character/full_body/${member.master.id}.png`}
          alt={name}
        />
      </div>

      <div className="party-member-card-band" />

      <div className="party-member-card-header">
        <span className="party-member-card-class-badge">
          <ClassIcon classId={member.master.classId} />
        </span>

        <div className="party-member-card-rarity">
          {Array.from({ length: MAX_RARITY }, (_, i) => (
            <span
              key={i}
              className={`party-member-card-star${i < member.master.rarity ? '' : ' is-off'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="party-member-card-info-container">
        <div className="party-member-card-level">
          <span className="party-member-card-level-value">Lv.{member.level}</span>
          <span className="party-member-card-class">{unitClassName}</span>
        </div>

        <p className="party-member-card-name">{name}</p>

        <dl className="party-member-card-stats">
          <div>
            <dt>HP</dt>
            <dd>{member.status.hp}</dd>
          </div>
          <div>
            <dt>ATK</dt>
            <dd>{member.status.attack}</dd>
          </div>
          <div>
            <dt>DEF</dt>
            <dd>{member.status.defense}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
