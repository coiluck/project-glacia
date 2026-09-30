import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Screen from '../../layouts/Screen'
import { paths } from '../../router/paths'
import { useTranslations } from '../../i18n'
import { chapters } from '../../data/stages'
import { characterMasters } from '../../data/characters'
import { unitClasses } from '../../data/unitClasses'
import { resolveOwned } from '../../features/characters/resolve'
import { useCharacterStore } from '../../stores/characterStore'
import { useProgressStore } from '../../stores/progressStore'
import { selectStamina, useStaminaStore } from '../../stores/staminaStore'
import { useBackHandler } from '../../hooks/useBackHandler'
import MemberCard from '../../components/common/MemberCard'
import FormationTabs from '../party/components/FormationTabs'

// i18n。キャラ名は characters.json、兵科名は battle.json にある
const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).map((c) => [c.nameKey, c.nameKey]),
)

const CLASS_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(unitClasses).map((c) => [c.nameKey, c.nameKey]),
)

// 編成データの長さが固定されていないからこれを使って描画
const SLOTS = [0, 1, 2, 3, 4]

export default function SortiePage() {
  const { stageId } = useParams<{ stageId: string }>()
  const tCharacter = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)
  const tClass = useTranslations('battle', CLASS_TRANSLATION_MAPPING)

  const owned = useCharacterStore((s) => s.owned)
  const party = useCharacterStore((s) => s.party)
  const slotIndex = useCharacterStore((s) => s.currentPartySlotIndex)
  const cleared = useProgressStore((s) => (stageId ? s.clearedStageIds.includes(stageId) : false))
  const stamina = useStaminaStore((s) => selectStamina(s).stamina)
  const navigate = useNavigate()

  // story からは replace で来るので、戻るも replace で story へ
  useBackHandler(() => {
    navigate(paths.story, { replace: true })
    return true
  })

  const stage = chapters.flatMap((c) => c.stages).find((s) => s.id === stageId)
  // スタミナは story で確認済みだからUI層じゃなくていい
  if (!stageId || !stage || stamina < stage.stamina) return <Navigate to={paths.story} replace />

  // 選択中の編成のメンバー
  const members = (party[slotIndex] ?? []).map((id) => resolveOwned(owned, id))
  const isEmpty = SLOTS.every((i) => !members[i])

  const sortie = () => {
    if (isEmpty) return
    // クリア済みならシナリオを飛ばしてそのまま戦闘へ
    navigate(cleared ? paths.battle(stageId) : paths.scenario(stageId), { replace: true })
  }

  return (
    <>
      <div className="page page-sortie">
        <div className="sortie-head">
          <div className="sortie-title">
            <span className="sortie-title-label">出撃準備</span>
            <span className="sortie-title-stage">{stageId}</span>
          </div>
          <button type="button" className="sortie-edit" onClick={() => navigate(paths.party)}>
            編成を変更
          </button>
        </div>

        <div className="sortie-slots">
          {SLOTS.map((i) => {
            const member = members[i] ?? null
            const classNameKey = member && unitClasses[member.master.classId]?.nameKey

            return (
              <MemberCard
                key={i}
                member={member}
                name={member ? tCharacter[member.master.nameKey] : ''}
                unitClassName={classNameKey ? tClass[classNameKey] : ''}
                // 編成画面のキャラ選択を直接開く
                onClick={() => navigate(`${paths.party}?member=${i}`)}
              />
            )
          })}
        </div>

        {isEmpty && <p className="sortie-disabled-reason">編成にメンバーがいません</p>}
        <button
          type="button"
          className={`sortie-button${isEmpty ? ' is-disabled' : ''}`}
          onClick={sortie}
        >
          出撃
          <span className="sortie-button-cost">
            <span className="sortie-button-cost-item">
              現在
              <i className="sortie-button-cost-bolt" />
              {stamina}
            </span>
            <span className="sortie-button-cost-separator">/</span>
            <span className="sortie-button-cost-item">
              消費
              <i className="sortie-button-cost-bolt" />
              {stage.stamina}
            </span>
          </span>
        </button>
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
    </>
  )
}
