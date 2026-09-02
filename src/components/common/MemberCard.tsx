import { classIcons } from '../../data/characters/classIcons'
import { RARITIES } from '../../data/characters/const'
import type { ResolvedCharacter } from '../../features/characters/resolve'

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
      <div className="member-card is-empty" style={{ fontSize: `${fontSize}px` }} onClick={onClick}>
        <div className="member-card-portrait" />
        <div className="member-card-band" />
        <div className="member-card-header">
          <span className="member-card-class-badge" />
        </div>
        <span className="member-card-add">＋</span>
        <div className="member-card-info-container">
          {/* 高さそろえ用 */}
          <div className="member-card-level" />
          <p className="member-card-name">空き</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`member-card is-rarity-${member.master.rarity}`} style={{ fontSize: `${fontSize}px` }} onClick={onClick}>
      <div className="member-card-portrait">
        <img
          src={`${import.meta.env.BASE_URL}images/character/full_body/${member.master.id}.png`}
          alt={name}
        />
      </div>

      <div className="member-card-band" />

      <div className="member-card-header">
        <span className="member-card-class-badge">
          <ClassIcon classId={member.master.classId} />
        </span>

        <div className="member-card-rarity">
          {RARITIES.map((rarity) => (
            <span
              key={rarity}
              className={`member-card-star${rarity <= member.master.rarity ? '' : ' is-off'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="member-card-info-container">
        <div className="member-card-level">
          <span className="member-card-level-value">Lv.{member.level}</span>
          <span className="member-card-class">{unitClassName}</span>
        </div>

        <p className="member-card-name">{name}</p>

        <dl className="member-card-stats">
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
