import { useState } from 'react'
import Screen from '../../layouts/Screen'
import { useTranslations } from '../../i18n'
import { useBackHandler } from '../../hooks/useBackHandler'
import RecruitResult from './components/RecruitResult'
import RecruitBanner from './components/RecruitBanner'
import RecruitExchange from './components/RecruitExchange'
import RecruitConfirm from './components/RecruitConfirm'
import GemIcon from '../../components/common/GemIcon'
import { exchangeCeiling, pullGacha } from '../../api/actions/gacha'
import { characterMasters } from '../../data/characters'
import {
  BANNER_IDS,
  CEILING_PULLS,
  CEILING_TARGETS,
  MULTI_PULL_COUNT,
  PICK_UP_IDS,
  PULL_COST_MULTI,
  PULL_COST_SINGLE,
  gachaPool,
  type BannerId,
} from '../../data/gacha'
import type { PullOutcome } from '../../features/gacha/types'
import { useCharacterStore } from '../../stores/characterStore'
import { useGachaStore } from '../../stores/gachaStore'
import { useResourceStore } from '../../stores/resourceStore'
import { formatCompact } from '../../utils/format'
import { dupeLabel } from './dupe'

// i18n。キャラ名は characters.json にある
const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).map((c) => [c.nameKey, c.nameKey]),
)

const BANNER_TITLES: Record<BannerId, string> = {
  pickup: 'ピックアップ召集',
  standard: '常設召集',
}

// 下の帯の札に出す顔
const BANNER_FACES: Record<BannerId, string[]> = {
  pickup: PICK_UP_IDS,
  standard: gachaPool[3],
}

// 召集の画面と、その召集の交換所
type View = { kind: 'banner' } | { kind: 'exchange'; selected: string }

export default function RecruitPage() {
  const tCharacter = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)
  const nameOf = (id: string) => tCharacter[characterMasters[id].nameKey]

  const gems = useResourceStore((s) => s.gems)
  const points = useGachaStore((s) => s.pity)
  const owned = useCharacterStore((s) => s.owned)

  const [banner, setBanner] = useState<BannerId>('pickup')
  const [view, setView] = useState<View>({ kind: 'banner' })
  const [confirming, setConfirming] = useState(false)
  // 結果表示中は引けない。nullなら引ける
  const [outcomes, setOutcomes] = useState<PullOutcome[] | null>(null)
  const [pending, setPending] = useState(false) // 応答待ち。二重に送らせない
  const [error, setError] = useState<string | null>(null)

  useBackHandler(() => {
    if (outcomes !== null) setOutcomes(null)
    else if (confirming) setConfirming(false)
    else if (view.kind === 'exchange') setView({ kind: 'banner' })
    else return false
    return true
  })

  const full = points >= CEILING_PULLS
  const dupeOf = (id: string) => owned[id]?.dupe ?? null

  // costはボタンの表示と押せるかどうかの判定のみ
  const pull = async (count: number, cost: number) => {
    if (pending || gems < cost) return

    setPending(true)
    setError(null)
    try {
      setOutcomes(await pullGacha(count, banner))
    } catch (e) {
      console.error(e)
      setError('召集に失敗')
    } finally {
      setPending(false)
    }
  }

  const exchange = async (masterId: string) => {
    if (pending || !full) return

    setPending(true)
    setError(null)
    try {
      const outcome = await exchangeCeiling(masterId)
      setConfirming(false)
      setOutcomes([outcome])
    } catch (e) {
      console.error(e)
      setError('交換に失敗')
    } finally {
      setPending(false)
    }
  }

  if (outcomes !== null) {
    return (
      <>
        <RecruitResult outcomes={outcomes} onClose={() => setOutcomes(null)} />
        <Screen background="images/scenario/bg/camp_border.avif" />
      </>
    )
  }

  const shortage =
    gems < PULL_COST_SINGLE
      ? `ジェムが${formatCompact(PULL_COST_SINGLE - gems)}足りない`
      : gems < PULL_COST_MULTI
        ? `10連にはジェムが${formatCompact(PULL_COST_MULTI - gems)}足りない`
        : ''

  return (
    <>
      <div className="page page-recruit">
        {/* 絵と左の文字組み*/}
        {view.kind === 'banner' ? (
          <RecruitBanner key={banner} banner={banner} title={BANNER_TITLES[banner]} nameOf={nameOf} />
        ) : (
          <RecruitExchange
            key={view.selected}
            masterId={view.selected}
            title={BANNER_TITLES[banner]}
            dupe={dupeOf(view.selected)}
            nameOf={nameOf}
          />
        )}

        {/* 下の帯 */}
        <div className="recruit-band">
          <div className="recruit-tabs">
            {view.kind === 'banner'
              ? BANNER_IDS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={`recruit-tab${banner === id ? ' is-on' : ''}`}
                    onClick={() => setBanner(id)}
                  >
                    <span className="recruit-tab-faces">
                      {BANNER_FACES[id].map((face) => (
                        <img
                          key={face}
                          src={`${import.meta.env.BASE_URL}images/character/face/${face}.avif`}
                          alt=""
                        />
                      ))}
                    </span>
                    <span className="recruit-tab-label">{BANNER_TITLES[id]}</span>
                  </button>
                ))
              : CEILING_TARGETS[banner].map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={`recruit-tab is-candidate${view.selected === id ? ' is-on' : ''}`}
                    onClick={() => setView({ kind: 'exchange', selected: id })}
                  >
                    <span className="recruit-tab-faces">
                      <img
                        src={`${import.meta.env.BASE_URL}images/character/face/${id}.avif`}
                        alt=""
                      />
                    </span>
                    <span className="recruit-tab-label">{nameOf(id)}</span>
                    <span className="recruit-tab-dupe">{dupeLabel(dupeOf(id))}</span>
                  </button>
                ))}
          </div>

          {/* 交換pt */}
          <div className={`recruit-points${full ? ' is-full' : ''}`}>
            <div>
              <p className="recruit-points-label">交換pt</p>
              <p className="recruit-points-value">
                <b>{points}</b>
                <span>/ {CEILING_PULLS}</span>
              </p>
            </div>
            {view.kind === 'banner' && (
              <button
                type="button"
                className="recruit-points-link"
                onClick={() => setView({ kind: 'exchange', selected: CEILING_TARGETS[banner][0] })}
              >
                {full ? '交換する' : '交換所'}
              </button>
            )}
          </div>

          <div className="recruit-actions">
            {error && <p className="recruit-shortage">{error}</p>}
            {view.kind === 'banner' ? (
              <>
                {!error && shortage && <p className="recruit-shortage">{shortage}</p>}
                <button
                  type="button"
                  className="recruit-action"
                  disabled={pending || gems < PULL_COST_SINGLE}
                  onClick={() => void pull(1, PULL_COST_SINGLE)}
                >
                  <span className="recruit-action-label">単発</span>
                  <span className="recruit-action-cost">
                    <GemIcon className="recruit-action-gem" />
                    {formatCompact(PULL_COST_SINGLE)}
                  </span>
                </button>
                <button
                  type="button"
                  className="recruit-action is-gold"
                  disabled={pending || gems < PULL_COST_MULTI}
                  onClick={() => void pull(MULTI_PULL_COUNT, PULL_COST_MULTI)}
                >
                  <span className="recruit-action-label">{MULTI_PULL_COUNT}連</span>
                  <span className="recruit-action-cost">
                    <GemIcon className="recruit-action-gem" />
                    {formatCompact(PULL_COST_MULTI)}
                  </span>
                </button>
              </>
            ) : (
              <button
                type="button"
                className="recruit-action is-gold is-wide"
                disabled={!full}
                onClick={() => setConfirming(true)}
              >
                <span className="recruit-action-label">
                  {full ? '交換する' : `あと${CEILING_PULLS - points}回召集すると交換できる`}
                </span>
                {full && <span className="recruit-action-cost">交換pt {CEILING_PULLS}</span>}
              </button>
            )}
          </div>
        </div>

        {confirming && view.kind === 'exchange' && (
          <RecruitConfirm
            name={nameOf(view.selected)}
            masterId={view.selected}
            dupe={dupeOf(view.selected)}
            points={points}
            pending={pending}
            onCancel={() => setConfirming(false)}
            onConfirm={() => void exchange(view.selected)}
          />
        )}
      </div>

      <Screen
        background="images/scenario/bg/camp_border.avif"
        viewport={<div className="recruit-shade" />}
      />
    </>
  )
}
