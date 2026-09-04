import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Screen from '../../layouts/Screen'
import { useTranslations } from '../../i18n'
import { saveParty } from '../../api/actions/party'
import { characterMasters } from '../../data/characters'
import { unitClasses } from '../../data/unitClasses'
import { resolveOwned } from '../../features/characters/resolve'
import { useCharacterStore } from '../../stores/characterStore'
import { useBackHandler } from '../../hooks/useBackHandler'
import MemberCard from '../../components/common/MemberCard'
import FormationTabs from './components/FormationTabs'
import MemberSelect from './components/MemberSelect'

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

  // 画面を出るときにまとめて保存
  useEffect(() => () => void saveParty(), [])

  // 選択中の編成のメンバー
  const members = (party[slotIndex] ?? []).map((id) => resolveOwned(owned, id))

  // ?member=<編成内の位置>: numberが付いているあいだはキャラ選択
  const [searchParams, setSearchParams] = useSearchParams()
  const rawMember = searchParams.get('member')
  const selectIndex =
    rawMember !== null && SLOTS.includes(Number(rawMember)) ? Number(rawMember) : null

  const navigate = useNavigate()
  const location = useLocation()
  const closeSelect = () =>
    location.key === 'default' ? setSearchParams({}, { replace: true }) : navigate(-1)

  // リソースバーの戻るボタン変更
  useBackHandler(() => {
    if (selectIndex === null) return false
    closeSelect()
    return true
  })

  return (
    <>
      {selectIndex === null && (
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
                  onClick={() => setSearchParams({ member: String(i) })}
                />
              )
            })}
          </div>
        </div>
      )}

      {selectIndex !== null && (
        <MemberSelect
          partySlotIndex={slotIndex}
          characterIndex={selectIndex}
          member={members[selectIndex] ?? null}
          onClose={closeSelect}
        />
      )}

      <Screen
        background="images/start/hex-frame.jpg"
        viewport={
          <>
            {selectIndex === null && <FormationTabs />}

            <div className="party-radial-gradient" />
          </>
        }
      />
    </>
  )
}
