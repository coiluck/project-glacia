import { useState } from 'react'
import Screen from '../../layouts/Screen'
import { useTranslations } from '../../i18n'
import { useBackHandler } from '../../hooks/useBackHandler'
import RecruitResult from './components/RecruitResult'
import { pullGacha } from '../../api/actions/gacha'
import { characterMasters } from '../../data/characters'
import { RARITIES } from '../../data/characters/const'
import {
  CEILING_PULLS,
  MULTI_PULL_COUNT,
  PICK_UP_IDS,
  PULL_COST_MULTI,
  PULL_COST_SINGLE,
} from '../../data/gacha'
import { rarityRates } from '../../features/gacha/roll'
import type { PullOutcome } from '../../features/gacha/types'
import { useGachaStore } from '../../stores/gachaStore'
import { useResourceStore } from '../../stores/resourceStore'
import { formatCompact } from '../../utils/format'

// i18n。キャラ名は characters.json にある
const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).map((c) => [c.nameKey, c.nameKey]),
)

const RARITY_ROWS = [...RARITIES]

export default function RecruitPage() {
  const tCharacter = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)

  const gems = useResourceStore((s) => s.gems)
  const pity = useGachaStore((s) => s.pity)

  // 結果表示中は引けない。nullなら引ける
  const [outcomes, setOutcomes] = useState<PullOutcome[] | null>(null)
  const [pending, setPending] = useState(false) // 応答待ち。二重に引かせない
  const [error, setError] = useState<string | null>(null)

  // 結果を出しているあいだは閉じるだけ
  useBackHandler(() => {
    if (outcomes === null) return false
    setOutcomes(null)
    return true
  })

  const rates = rarityRates()
  const pickUp = characterMasters[PICK_UP_IDS[0]] ?? null

  // costはボタンの表示と押せるかどうかの判定のみ
  const pull = async (count: number, cost: number) => {
    if (pending || outcomes !== null || gems < cost) return

    setPending(true)
    setError(null)
    try {
      setOutcomes(await pullGacha(count))
    } catch (e) {
      console.error(e)
      setError('召集に失敗')
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      {outcomes === null ? (
        <div className="page page-recruit">
          {/* ピックアップ対象の立ち絵 */}
          <div className="recruit-banner">
            {pickUp && (
              <img
                className="recruit-banner-art"
                src={`${import.meta.env.BASE_URL}images/character/full_body/${pickUp.id}.png`}
                alt={tCharacter[pickUp.nameKey]}
              />
            )}

            <div className="recruit-banner-caption">
              <p className="recruit-banner-label">PICK UP</p>
              <p className="recruit-banner-name">{pickUp ? tCharacter[pickUp.nameKey] : '---'}</p>
            </div>
          </div>

          <div className="recruit-panel">
            <div className="recruit-panel-head">
              <h1 className="recruit-title">召集</h1>
              <p className="recruit-lead">ピックアップ対象は同レアリティの中から優先して選ばれる。</p>
            </div>

            {/* 実際の排出率 */}
            <dl className="recruit-rates">
              {RARITY_ROWS.filter((rarity) => rates[rarity] > 0).map((rarity) => (
                <div key={rarity} className={`recruit-rate-row is-rarity-${rarity}`}>
                  <dt>
                    {Array.from({ length: rarity }, (_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </dt>
                  <dd>{rates[rarity].toFixed(1)}%</dd>
                </div>
              ))}
            </dl>

            {/* 天井 */}
            <div className="recruit-pity">
              <div className="recruit-pity-head">
                <span className="recruit-pity-label">★3確定まで</span>
                <span className="recruit-pity-count">あと {CEILING_PULLS - pity} 回</span>
              </div>
              <span className="recruit-pity-bar">
                <span
                  className="recruit-pity-bar-fill"
                  style={{ width: `${(pity / CEILING_PULLS) * 100}%` }}
                />
              </span>
            </div>

            <div className="recruit-actions">
              <button
                type="button"
                className="recruit-action"
                disabled={pending || gems < PULL_COST_SINGLE}
                onClick={() => void pull(1, PULL_COST_SINGLE)}
              >
                <span className="recruit-action-label">単発</span>
                <span className="recruit-action-cost">
                  <span className="recruit-action-gem" />
                  {formatCompact(PULL_COST_SINGLE)}
                </span>
              </button>

              <button
                type="button"
                className="recruit-action is-multi"
                disabled={pending || gems < PULL_COST_MULTI}
                onClick={() => void pull(MULTI_PULL_COUNT, PULL_COST_MULTI)}
              >
                <span className="recruit-action-label">{MULTI_PULL_COUNT}連</span>
                <span className="recruit-action-cost">
                  <span className="recruit-action-gem" />
                  {formatCompact(PULL_COST_MULTI)}
                </span>
              </button>
            </div>

            {error && <p className="recruit-shortage">{error}</p>}
            {!error && gems < PULL_COST_SINGLE && (
              <p className="recruit-shortage">ジェムが足りない</p>
            )}
          </div>
        </div>
      ) : (
        <RecruitResult outcomes={outcomes} onClose={() => setOutcomes(null)} />
      )}

      <Screen background="images/start/hex-frame.jpg" />
    </>
  )
}
