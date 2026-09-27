import type { CSSProperties, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { paths } from '../../router/paths'
import { useTranslations } from '../../i18n'
import { DAILY_SLOTS } from '../../data/missions'
import { chapters, isStageUnlocked } from '../../data/stages'
import { exchangeToday } from '../../features/exchange/exchange'
import { claimableDailySlots, dailyMissionToday } from '../../features/mission/daily'
import { claimablePermanentIds } from '../../features/mission/permanent'
import { useCharacterStore } from '../../stores/characterStore'
import { useExchangeStore } from '../../stores/exchangeStore'
import { useMissionStore } from '../../stores/missionStore'
import { useProgressStore } from '../../stores/progressStore'
import { useRankStore } from '../../stores/rankStore'
import { selectStamina, useStaminaStore } from '../../stores/staminaStore'

// 全画面共通のメニュー。各項目に遷移先の状態（次のステージ、受け取れる任務など）を出す。

const BASE_URL = import.meta.env.BASE_URL
const PARTY_SIZE = 5 // PartyPage の SLOTS と同じ

const iconStyle = (path: string) => ({ '--icon': `url(${BASE_URL}images/${path})` }) as CSSProperties

// 今の章 = 到達済みでステージのある最後の章
const latestChapter = (reached: number) =>
  chapters.filter((c) => c.id <= reached && c.stages.length > 0).at(-1) ?? chapters[0]

type Props = {
  onSelect: (to: string) => void
}

export default function MenuMap({ onSelect }: Props) {
  const { pathname } = useLocation()

  const stamina = useStaminaStore((s) => selectStamina(s).stamina)
  const staminaMax = useStaminaStore((s) => s.base.stamina_max)
  const now = useStaminaStore((s) => s.now)
  const reachedChapter = useProgressStore((s) => s.chapter)
  const clearedStageIds = useProgressStore((s) => s.clearedStageIds)
  const party = useCharacterStore((s) => s.party[s.currentPartySlotIndex])
  const owned = useCharacterStore((s) => s.owned)
  const rank = useRankStore((s) => s.rank)
  const missionBase = useMissionStore((s) => s.base)
  const missionDone = useMissionStore((s) => s.done)
  const exchangeBase = useExchangeStore((s) => s.base)

  const chapter = latestChapter(reachedChapter)
  const t = useTranslations('common', { chapterTitle: chapter.titleKey })

  // 前線
  const cleared = chapter.stages.filter((s) => clearedStageIds.includes(s.id)).length
  const nextStage = chapter.stages.find(
    (s) => !clearedStageIds.includes(s.id) && isStageUnlocked(s, chapter.stages, clearedStageIds),
  )

  // 任務
  const dailyClaimed = dailyMissionToday(missionBase, now).claimed.length
  const missionClaimable =
    claimableDailySlots(missionBase, now).length +
    claimablePermanentIds(
      { user: { rank, cleared_stage_ids: clearedStageIds }, characters: Object.values(owned) },
      missionDone,
    ).length

  // 取引所
  const supplyClaimed = exchangeToday(exchangeBase, now).claimed

  const isCurrent = (to: string) => pathname === to || pathname.startsWith(`${to}/`)
  const frontCurrent = isCurrent(paths.story)

  let index = 0 // 出てくる順

  // 意味の近い2項目を縦に積む
  const oneColumn = (el1: ReactNode, el2: ReactNode) => (
    <div className="menu-map-column">
      {el1}
      {el2}
    </div>
  )

  const tile = (
    to: string,
    label: string,
    icon: string,
    info: ReactNode,
    options: { notice?: boolean; badge?: ReactNode } = {},
  ) => {
    const current = isCurrent(to)
    const className = [
      'menu-map-item',
      options.notice && 'has-notice',
      current && 'is-current',
    ]
      .filter(Boolean)
      .join(' ')
    return (
      <button
        type="button"
        className={className}
        style={{ '--i': index++ } as CSSProperties}
        disabled={current}
        onClick={() => onSelect(to)}
      >
        <span className="menu-map-item-icon" style={iconStyle(icon)} />
        <span className="menu-map-item-label">{label}</span>
        <div className="menu-map-item-info">{info}</div>
        {!current && options.badge !== undefined && (
          <span className={`menu-map-badge${typeof options.badge === 'string' ? ' is-text' : ''}`}>
            {options.badge}
          </span>
        )}
        {current && <span className="menu-map-here">現在地</span>}
      </button>
    )
  }

  return (
    <nav className="menu-map">
      {oneColumn(
        tile(
          paths.party,
          '編成',
          'top/menu-main/knight.svg',
          <span className="menu-map-faces">
            {Array.from({ length: PARTY_SIZE }, (_, i) =>
              party?.[i] ? (
                <i
                  key={i}
                  className="menu-map-face"
                  style={{ backgroundImage: `url(${BASE_URL}images/character/face/${party[i]}.png)` }}
                />
              ) : (
                <i key={i} className="menu-map-face is-empty" />
              ),
            )}
          </span>,
        ),
        tile(
          paths.member,
          '人員',
          'top/menu-main/team.svg',
          null,
        ),
      )}

      {/* 前線 */}
      <button
        type="button"
        className={`menu-map-item is-front${frontCurrent ? ' is-current' : ''}`}
        style={{ '--i': index++ } as CSSProperties}
        disabled={frontCurrent}
        onClick={() => onSelect(paths.story)}
      >
        <span
          className="menu-map-front-map"
          style={{ '--map': `url(${BASE_URL}images/story/1.png)` } as CSSProperties}
        />
        <div className="menu-map-front-head">
          <span className="menu-map-item-label">前線</span>
          <span className="menu-map-stamina">
            <i style={iconStyle('top/menu-main/bolt.svg')} />
            <b>
              {stamina}
              <span> / {staminaMax}</span>
            </b>
          </span>
        </div>
        <div className="menu-map-front-body">
          <div className="menu-map-front-chapter">
            <small>CHAPTER {chapter.id}</small>
            {t.chapterTitle}
          </div>
          <div className="menu-map-front-next">
            <small>次の作戦</small>
            <b>{nextStage?.id ?? '—'}</b>
          </div>
          <div className="menu-map-front-progress">
            <span className="menu-map-front-progress-bar">
              <i style={{ width: `${(cleared / chapter.stages.length) * 100}%` }} />
            </span>
            <span>
              {cleared} / {chapter.stages.length}
            </span>
          </div>
        </div>
        {frontCurrent && <span className="menu-map-here">現在地</span>}
      </button>

      {oneColumn(
        tile(
          paths.recruit,
          '召集',
          'top/menu-main/graduation_hat.svg',
          null,
        ),
        tile(
          paths.mission,
          '任務',
          'top/menu-main/mission.svg',
          <>
            <small>本日</small>
            <span className="menu-map-pips">
              {DAILY_SLOTS.map((_, i) => (
                <i key={i} className={`menu-map-pip${i < dailyClaimed ? ' is-on' : ''}`} />
              ))}
            </span>
          </>,
          { notice: missionClaimable > 0, badge: missionClaimable > 0 ? missionClaimable : undefined },
        ),
      )}
      {oneColumn(
        tile(
          paths.exchange,
          '取引所',
          'top/menu-main/exchange.svg',
          <>
            <small>交換材料</small>
            <b>{exchangeBase.exchange_tokens}</b>
          </>,
          { notice: !supplyClaimed, badge: supplyClaimed ? undefined : '配給' },
        ),
        tile(
          paths.base, '基地',
          'top/menu-main/base.svg',
          null,
        ),
      )}
      {oneColumn(
        tile(
          paths.warehouse,
          '倉庫',
          'top/menu-main/warehouse.svg',
          null,
        ),
        tile(
          paths.top,
          'ホーム',
          'component/resource-bar/home.svg',
          null,
        ),
      )}
    </nav>
  )
}
