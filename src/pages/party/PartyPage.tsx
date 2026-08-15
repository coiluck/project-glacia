import Screen from '../../layouts/Screen'
import { useTranslations } from '../../i18n'
import { characterMasters } from '../../data/characters'
import { unitClasses } from '../../data/unitClasses'
import { resolveOwned } from '../../features/characters/resolve'
import { useCharacterStore } from '../../stores/characterStore'
import FormationTabs from './components/FormationTabs'
import MemberCard from './components/MemberCard'

// i18n。キャラ名は characters.json、兵科名は battle.json にある
const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).map((c) => [c.nameKey, c.nameKey]),
)

const CLASS_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(unitClasses).map((c) => [c.nameKey, c.nameKey]),
)

// 編成データの長さが固定されていないからこれを使って描画
const SLOTS = [0, 1, 2, 3, 4]

export default function PartyPage() {
  const tCharacter = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)
  const tClass = useTranslations('battle', CLASS_TRANSLATION_MAPPING)

  const owned = useCharacterStore((s) => s.owned)
  const party = useCharacterStore((s) => s.party)
  const slotIndex = useCharacterStore((s) => s.currentPartySlotIndex)

  // 選択中の編成のメンバー。未所持・マスター未定義の ID は空き扱いになる
  const members = (party[slotIndex] ?? []).map((id) => resolveOwned(owned, id))

  return (
    <div className="page page-party">
      <div className="party-slots">
        {SLOTS.map((i) => {
          const member = members[i] ?? null
          const classNameKey = member && unitClasses[member.master.classId]?.nameKey

          return (
            <MemberCard
              key={i}
              member={member}
              name={member ? tCharacter[member.master.nameKey] : ''}
              unitClassName={classNameKey ? tClass[classNameKey] : ''}
            />
          )
        })}
      </div>

      <Screen
        background="images/start/hex-frame.jpg"
        viewport={
          <>
            <FormationTabs />
            <div className="party-radial-gradient" />
          </>
        }
      />
    </div>
  )
}
