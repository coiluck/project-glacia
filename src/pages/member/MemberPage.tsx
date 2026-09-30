import { useNavigate } from 'react-router-dom'
import Screen from '../../layouts/Screen'
import { paths } from '../../router/paths'
import { useTranslations } from '../../i18n'
import MemberCard from '../../components/common/MemberCard'
import { characterMasters } from '../../data/characters'
import { unitClasses } from '../../data/unitClasses'
import { resolveOwned, type ResolvedCharacter } from '../../features/characters/resolve'
import { useCharacterStore } from '../../stores/characterStore'

// i18n。キャラ名は characters.json、兵科名は battle.json にある
const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).map((c) => [c.nameKey, c.nameKey]),
)

const CLASS_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(unitClasses).map((c) => [c.nameKey, c.nameKey]),
)

// 人員画面。所持キャラの一覧。カードを押すと /member/:characterId の詳細へ移る。
// TODO: ソート
export default function MemberPage() {
  const tCharacter = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)
  const tClass = useTranslations('battle', CLASS_TRANSLATION_MAPPING)

  const owned = useCharacterStore((s) => s.owned)
  const navigate = useNavigate()

  // マスター未定義の ID は一覧に出さない
  const characters = Object.keys(owned)
    .map((id) => resolveOwned(owned, id))
    .filter((c): c is ResolvedCharacter => c !== null)

  return (
    <>
      <div className="page page-member">
        <div className="member-list-grid">
          {characters.map((c) => {
            const classKey = unitClasses[c.master.classId]?.nameKey

            return (
              <MemberCard
                key={c.master.id}
                member={c}
                name={tCharacter[c.master.nameKey]}
                unitClassName={classKey ? tClass[classKey] : ''}
                fontSize={12}
                onClick={() => navigate(paths.memberDetail(c.master.id))}
              />
            )
          })}
        </div>
      </div>

      <Screen background="images/start/hex-frame.jpg" />
    </>
  )
}
