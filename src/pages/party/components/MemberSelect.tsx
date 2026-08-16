import { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ScreenViewportContext } from '../../../layouts/ScreenFrame'
import { paths } from '../../../router/paths'
import { useTranslations } from '../../../i18n'
import { characterMasters } from '../../../data/characters'
import { unitClasses } from '../../../data/unitClasses'
import { classIcons } from '../../../data/characters/classIcons'
import { resolveOwned, type ResolvedCharacter } from '../../../features/characters/resolve'
import { useCharacterStore } from '../../../stores/characterStore'
import MemberCard from './MemberCard'

// i18n。キャラ名は characters.json、兵科名は battle.json にある
const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).map((c) => [c.nameKey, c.nameKey]),
)

const CLASS_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(unitClasses).map((c) => [c.nameKey, c.nameKey]),
)

const MAX_RARITY = 3

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

  // 詳細パネルはセーフエリア外（実画面の高さいっぱい）に出すのでビューポートへPortalする
  const viewportEl = useContext(ScreenViewportContext)

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
  const selectedClassKey = selected && unitClasses[selected.master.classId]?.nameKey

  const decide = () => {
    setPartyMember(partySlotIndex, characterIndex, selectedId ?? null)
    onClose()
  }

  return (
    <>
      <div className="page page-party-select">
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

      {viewportEl &&
        createPortal(
          <div className="party-member-select-detail">
              <div className="party-member-select-rarity">
                {Array.from({ length: MAX_RARITY }, (_, i) => (
                  <span
                    key={i}
                    className={`party-member-select-star${
                      i < (selected?.master.rarity ?? 0) ? '' : ' is-off'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="party-member-select-name">
                {selected ? tCharacter[selected.master.nameKey] : '選択してください'}
              </p>

              <div className="party-member-select-meta">
                <span className="party-member-select-level">Lv.{selected?.level ?? ' ---'}</span>
                <span className="party-member-select-class">
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d={classIcons[selected?.master.classId ?? '']} />
                  </svg>
                  {selectedClassKey ? tClass[selectedClassKey] : ''}
                </span>
              </div>

              <dl className="party-member-select-stats">
                <div>
                  <dt>HP</dt>
                  <dd>{selected?.status.hp ?? '---'}</dd>
                </div>
                <div>
                  <dt>ATK</dt>
                  <dd>{selected?.status.attack ?? '---'}</dd>
                </div>
                <div>
                  <dt>DEF</dt>
                  <dd>{selected?.status.defense ?? '---'}</dd>
                </div>
              </dl>

              <Link
                className="party-member-select-enhance"
                to={paths.memberDetail(selected?.master.id ?? '')}
              >
                強化する →
              </Link>
          </div>,
          viewportEl,
        )}
    </>
  )
}
