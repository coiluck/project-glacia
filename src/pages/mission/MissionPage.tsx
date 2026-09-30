import { useState } from 'react'
import Screen from '../../layouts/Screen'
import { useTranslations } from '../../i18n'
import { claimMission } from '../../api/actions/mission'
import type { MissionPayload } from '../../api/types'
import { characterMasters } from '../../data/characters'
import { DAILY_SLOTS } from '../../data/missions'
import { claimableDailySlots, dailyMissionToday } from '../../features/mission/daily'
import { claimablePermanentIds, type PermanentBase } from '../../features/mission/permanent'
import { useCharacterStore } from '../../stores/characterStore'
import { useMissionStore } from '../../stores/missionStore'
import { useProgressStore } from '../../stores/progressStore'
import { useRankStore } from '../../stores/rankStore'
import { useStaminaStore } from '../../stores/staminaStore'
import DailyPanel from './components/DailyPanel'
import MissionStage from './components/MissionStage'
import MissionTabBar, { type MissionTab } from './components/MissionTabBar'
import MissionToast from './components/MissionToast'
import PermanentPanel from './components/PermanentPanel'
import { CATEGORIES, CONDITION_KEYS, EVENT_KEYS, type Category } from './keys'

const MISSION_TRANSLATION_MAPPING = Object.fromEntries(
  [
    'dailyTitle',
    'permanentTitle',
    'reset',
    'claim',
    'inProgress',
    'claimAll',
    'allClearLabel',
    'earnedToday',
    'earnedTotal',
    'doneCount',
    'claimed',
    'claimedAll',
    'claimedWithBonus',
    'tabDaily',
    'tabPermanent',
    ...Object.values(EVENT_KEYS),
    ...Object.values(CONDITION_KEYS),
    ...CATEGORIES.map((c) => c.labelKey),
  ].map((k) => [k, k]),
)

// 左に立つのはラピス固定。セリフは状況で変わる
const LAPIS = characterMasters.lapis
const LINE_KEYS = {
  dailyStart: 'missionLapisDailyStart',
  dailyClaimable: 'missionLapisDailyClaimable',
  dailyHalf: 'missionLapisDailyHalf',
  dailyDone: 'missionLapisDailyDone',
  permanent: 'missionLapisPermanent',
  permanentClaimable: 'missionLapisPermanentClaimable',
}
const CHARACTER_TRANSLATION_MAPPING = {
  name: LAPIS.nameKey,
  ...LINE_KEYS,
}

export default function MissionPage() {
  const t = useTranslations('mission', MISSION_TRANSLATION_MAPPING)
  const tChar = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)

  const base = useMissionStore((s) => s.base)
  const done = useMissionStore((s) => s.done)
  const now = useStaminaStore((s) => s.now)
  const rank = useRankStore((s) => s.rank)
  const clearedStageIds = useProgressStore((s) => s.clearedStageIds)
  const owned = useCharacterStore((s) => s.owned)

  const [tab, setTab] = useState<MissionTab>('daily')
  const [category, setCategory] = useState<Category>('all')
  const [pending, setPending] = useState(false) // 応答待ち
  const [toast, setToast] = useState<{ id: number; label: string; gems: number } | null>(null)

  const progressBase: PermanentBase = {
    user: { rank, cleared_stage_ids: clearedStageIds },
    characters: Object.values(owned),
  }
  const { claimed } = dailyMissionToday(base, now)
  const counts = {
    daily: claimableDailySlots(base, now).length,
    permanent: claimablePermanentIds(progressBase, done).length,
  }

  const line =
    tab === 'daily'
      ? claimed.length === DAILY_SLOTS.length
        ? tChar.dailyDone
        : counts.daily > 0
          ? tChar.dailyClaimable
          : claimed.length > 0
            ? tChar.dailyHalf
            : tChar.dailyStart
      : counts.permanent > 0
        ? tChar.permanentClaimable
        : tChar.permanent

  const run = async (payload: MissionPayload, label: string) => {
    if (pending) return
    setPending(true)
    try {
      const gems = await claimMission(payload)
      setToast({ id: Date.now(), label, gems })
    } catch (e) {
      console.error(e)
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <div className="page page-mission">
        <MissionStage name={tChar.name} line={line} />

        <section className="mission-panel">
          {tab === 'daily' ? (
            <DailyPanel
              base={base}
              now={now}
              pending={pending}
              t={t}
              onClaim={(slot) =>
                run(
                  { kind: 'daily', slot },
                  // 最後の1つなら全達成ボーナスも付く
                  claimed.length + 1 === DAILY_SLOTS.length ? t.claimedWithBonus : t.claimed,
                )
              }
              onClaimAll={() => run({ kind: 'dailyAll' }, t.claimedAll)}
            />
          ) : (
            <PermanentPanel
              base={progressBase}
              done={done}
              category={category}
              pending={pending}
              t={t}
              onCategory={setCategory}
              onClaim={(id) => run({ kind: 'permanent', id }, t.claimed)}
              onClaimAll={() => run({ kind: 'permanentAll' }, t.claimedAll)}
            />
          )}
        </section>

        {toast && (
          <MissionToast
            key={toast.id}
            label={toast.label}
            gems={toast.gems}
            onDone={() => setToast(null)}
          />
        )}
      </div>

      <Screen
        background="images/start/hex-frame.jpg"
        viewport={
          <MissionTabBar
            tab={tab}
            counts={counts}
            labels={{ tabDaily: t.tabDaily, tabPermanent: t.tabPermanent }}
            onChange={setTab}
          />
        }
      />
    </>
  )
}
