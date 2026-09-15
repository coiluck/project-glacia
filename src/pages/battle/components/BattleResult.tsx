import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { paths } from '../../../router/paths'
import { useTranslations } from '../../../i18n'
import { sendBattleResult } from '../../../api/actions/battle'
import type { BattleResult as ResultKind, BattleReward } from '../../../features/battle/resolveResult'
import { useRankStore } from '../../../stores/rankStore'
import { formatCompact } from '../../../utils/format'
import ViewportLayer from '../../../layouts/ViewportLayer'
import { items } from '../../../data/items'

const TRANSLATION_MAPPING = Object.fromEntries(
  [
    'victory',
    'defeat',
    'gained',
    'rank',
    'currency',
    'noGain',
    'resultFailed',
    'retry',
    'backToMap',
  ].map((k) => [k, k]),
)

// i18n。アイテム名は items.json にある
const ITEM_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(items).map((i) => [i.nameKey, i.nameKey]),
)

// icon が無いものは資金として紙幣アイコンを出す
interface ResultItem {
  key: string
  name: string
  count: number
  icon?: string
  rare?: boolean
}

// バーが満ちきる時刻。result.css の battle-result-rank-refill と揃える
const RANK_UP_SWAP_MS = 500 + 1700 * 0.52

const percent = (exp: number, need: number) => (need > 0 ? Math.min(100, (exp / need) * 100) : 100)

const pad2 = (n: number) => String(n).padStart(2, '0')

interface BattleResultProps {
  stageId: string
  result: ResultKind
}

export default function BattleResult({ stageId, result }: BattleResultProps) {
  const t = useTranslations('battle', TRANSLATION_MAPPING)
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)
  const [reward, setReward] = useState<BattleReward | null>(null)
  const [failed, setFailed] = useState(false)

  // 戦闘前のランク。送信すると hydrate で上書きされるのでマウント時に控える
  const [rankBefore] = useState(() => {
    const s = useRankStore.getState()
    return { rank: s.rank, expInRank: s.expInRank, expToNext: s.expToNext }
  })
  const rank = useRankStore((s) => s.rank)
  const expInRank = useRankStore((s) => s.expInRank)
  const expToNext = useRankStore((s) => s.expToNext)

  const send = () => {
    setFailed(false)
    sendBattleResult(stageId, result)
      .then(setReward)
      .catch((e) => {
        console.error(e)
        setFailed(true)
      })
  }

  // 送信は1回だけ（失敗したときはボタンから送り直す）
  const sentRef = useRef(false)
  useEffect(() => {
    if (sentRef.current) return
    sentRef.current = true
    send()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ランクが上がったら、バーが満ちきるのに合わせて数字を差し替える
  const isRankUp = reward != null && rank > rankBefore.rank
  const [rankUpShown, setRankUpShown] = useState(false)
  useEffect(() => {
    if (!isRankUp) return
    const id = setTimeout(() => setRankUpShown(true), RANK_UP_SWAP_MS)
    return () => clearTimeout(id)
  }, [isRankUp])

  // 資金を先頭にドロップを並べる
  const resultItems: ResultItem[] = reward
    ? [
        { key: 'currency', name: t.currency, count: reward.currency },
        ...reward.drops.flatMap((drop): ResultItem[] => {
          const item = items[drop.itemId]
          if (!item) return []
          return [
            {
              key: drop.itemId,
              name: tItem[item.nameKey],
              count: drop.count,
              icon: item.icon,
              rare: item.rarity === 3,
            },
          ]
        }),
      ]
    : []

  const rankRow = (
    <div className={`battle-result-rank${isRankUp ? ' is-rankup' : ''}`}>
      <div className="battle-result-rank-value">
        <span className="battle-result-rank-label">RANK</span>
        <span className={`battle-result-rank-current${rankUpShown ? ' is-up' : ''}`}>
          {pad2(isRankUp && !rankUpShown ? rankBefore.rank : rank)}
        </span>
      </div>
      <div className="battle-result-rank-exp">
        <span className="battle-result-rank-bar">
          <span
            className="battle-result-rank-bar-fill"
            style={
              {
                '--from': `${percent(rankBefore.expInRank, rankBefore.expToNext)}%`,
                '--to': `${percent(expInRank, expToNext)}%`,
              } as CSSProperties
            }
          />
        </span>
        <span className="battle-result-rank-exp-text">
          EXP {expInRank} / {expToNext}
        </span>
      </div>
      <span className="battle-result-rank-gain">+{reward?.rankExp ?? 0}</span>
    </div>
  )

  const pending = <div className="battle-result-none is-pending">— — —</div>

  return (
    <div className={`battle-result fade-in${result === 'defeat' ? ' is-defeat' : ''}`}>
      <div className="battle-result-side">
        <div className="battle-result-head">
          <div className="battle-result-stage">STAGE {stageId}</div>
          <div className="battle-result-title">{result === 'victory' ? t.victory : t.defeat}</div>
        </div>
      </div>

      <div className="battle-result-main">
        <div className="battle-result-sections">
          <div className="battle-result-section">
            <div className="battle-result-section-title">{t.rank}</div>
            {reward ? rankRow : pending}
          </div>

          <div className="battle-result-section">
            <div className="battle-result-section-title">{t.gained}</div>
            {!reward ? (
              pending
            ) : result === 'defeat' ? (
              <div className="battle-result-none">{t.noGain}</div>
            ) : (
              <ul className="battle-result-item-list">
                {resultItems.map((item, i) => (
                  <li
                    key={item.key}
                    className={`battle-result-item${item.rare ? ' is-rare' : ''}`}
                    style={{ '--i': i } as CSSProperties}
                  >
                    <span className="battle-result-item-cell">
                      {item.icon ? (
                        <svg viewBox="0 0 24 24" aria-hidden>
                          <path d={item.icon} />
                        </svg>
                      ) : (
                        <span className="battle-result-bill">
                          <span />
                          <span />
                        </span>
                      )}
                      <span className="battle-result-item-count">×{formatCompact(item.count)}</span>
                    </span>
                    <span className="battle-result-item-name">{item.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="battle-result-bar">
          {failed ? (
            <div className="battle-result-failed">
              <span>{t.resultFailed}</span>
              <button type="button" className="battle-result-retry" onClick={send}>
                {t.retry}
              </button>
            </div>
          ) : (
            <div />
          )}
          {/* 戻ると戦闘がまるごと再開してしまうので、戦闘の履歴を残さない */}
          <Link className="battle-result-button" to={paths.story} replace>
            {t.backToMap}
          </Link>
        </div>
      </div>

      <ViewportLayer>
        <div className="battle-result-background" />
      </ViewportLayer>
    </div>
  )
}
