import { useState } from 'react'
import { useTranslations } from '../../../i18n'
import { characterMasters } from '../../../data/characters'
import { unitClasses } from '../../../data/unitClasses'
import { resolveOwned, type ResolvedCharacter } from '../../../features/characters/resolve'
import { useCharacterStore } from '../../../stores/characterStore'
import MemberCard from '../../../components/common/MemberCard'
import MemberSelectDetail from './MemberSelectDetail'

// i18n。キャラ名は characters.json、兵科名は battle.json にある
const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).map((c) => [c.nameKey, c.nameKey]),
)

const CLASS_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(unitClasses).map((c) => [c.nameKey, c.nameKey]),
)

interface MemberSelectProps {
  partySlotIndex: number // 編集中の編成。1〜4
  characterIndex: number // 編成の何番目を差し替えるか
  member: ResolvedCharacter | null // その位置に今入っているキャラ。null なら空き
  onClose: () => void
}

export default function MemberSelect({
  partySlotIndex,
  characterIndex,
  member,
  onClose,
}: MemberSelectProps) {
  const tCharacter = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)
  const tClass = useTranslations('battle', CLASS_TRANSLATION_MAPPING)

  const owned = useCharacterStore((s) => s.owned)
  const party = useCharacterStore((s) => s.party)
  const setPartyMember = useCharacterStore((s) => s.setPartyMember)

  const [selectedId, setSelectedId] = useState<string | null>(member?.master.id ?? null)

  const candidates = Object.keys(owned)
    .map((id) => resolveOwned(owned, id))
    .filter((c): c is ResolvedCharacter => c !== null)

  // 同じキャラが同じ編成に二重で入らないように他の位置にいるキャラは選べなくする
  const usedIds = new Set((party[partySlotIndex] ?? []).filter((_, i) => i !== characterIndex))

  const selected = candidates.find((c) => c.master.id === selectedId) ?? null

  const decide = () => {
    setPartyMember(partySlotIndex, characterIndex, selectedId ?? null)
    onClose()
  }

  return (
    <>
      <div className="page page-party-select fade-in">
        {candidates.map((c) => {
          const classKey = unitClasses[c.master.classId]?.nameKey
          const isUsed = usedIds.has(c.master.id)

          return (
            <div
              key={c.master.id}
              className={`party-member-select-cell${
                c.master.id === selectedId ? ' is-selected' : ''
              }${isUsed ? ' is-used' : ''}`}
            >
              <MemberCard
                member={c}
                name={tCharacter[c.master.nameKey]}
                unitClassName={classKey ? tClass[classKey] : ''}
                fontSize={12}
                onClick={
                  isUsed
                    ? undefined
                    : // 選択中のカードをもう一度押したら選択解除
                      () => setSelectedId((prev) => (prev === c.master.id ? null : c.master.id))
                }
              />
              {isUsed && <span className="party-member-select-used-label">編成済み</span>}
            </div>
          )
        })}

        <button
          type="button"
          className="party-member-select-decide"
          onClick={decide}
        >
          選択
        </button>
      </div>

      <MemberSelectDetail selected={selected} />
    </>
  )
}
