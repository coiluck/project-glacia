// デイリー任務
import type { MeResponse, UserRow } from '../../api/types'
import {
  DAILY_ALL_CLEAR_GEMS,
  DAILY_POOL,
  DAILY_SLOTS,
  type MissionEvent,
} from '../../data/missions'
import { dayIndex } from '../daily/day'
import { seededRandom } from '../daily/random'

// デイリー任務の判定に要る値
export type DailyMissionBase = Pick<UserRow, 'mission_day' | 'mission_counts' | 'mission_claimed'>

// その日の1枠
export interface DailyMission {
  event: MissionEvent
  target: number
  gems: number
}

// dayIndex の任務。取引所のラインナップと同じ並びにならないようシードをずらす
export function dailyMissionsFor(day: number): DailyMission[] {
  const rand = seededRandom(day ^ 0x6d697373)
  const used = new Set<MissionEvent>()
  const missions: DailyMission[] = []

  // 後に選ぶ枠ほど候補が減って偏るので、選択肢の少ない重い枠から選ぶ
  for (let i = DAILY_SLOTS.length - 1; i >= 0; i--) {
    const { tier, gems } = DAILY_SLOTS[i]
    const candidates = DAILY_POOL[tier].filter((m) => !used.has(m.event))
    const def = candidates[Math.floor(rand() * candidates.length)]
    used.add(def.event)
    missions[i] = { event: def.event, target: def.targets[Math.floor(rand() * def.targets.length)], gems }
  }

  return missions
}

// 今日ぶんの状態。記録が別の日のものなら空
export function dailyMissionToday(
  base: DailyMissionBase,
  now: number,
): { counts: UserRow['mission_counts']; claimed: number[] } {
  return base.mission_day === dayIndex(now)
    ? { counts: base.mission_counts, claimed: base.mission_claimed }
    : { counts: {}, claimed: [] }
}

// 達成していて、まだ受け取っていない枠
export function claimableDailySlots(base: DailyMissionBase, now: number): number[] {
  const { counts, claimed } = dailyMissionToday(base, now)
  return dailyMissionsFor(dayIndex(now)).flatMap((m, slot) =>
    !claimed.includes(slot) && (counts[m.event] ?? 0) >= m.target ? [slot] : [],
  )
}

// イベントを n 回ぶん数える。各 resolve の中から呼ぶ
export function bumpMission(user: UserRow, event: MissionEvent, n: number, now: number): UserRow {
  if (n <= 0) return user

  const { counts, claimed } = dailyMissionToday(user, now)
  return {
    ...user,
    mission_day: dayIndex(now),
    mission_counts: { ...counts, [event]: (counts[event] ?? 0) + n },
    mission_claimed: claimed,
  }
}

// 今日の枠を1つ受け取る。最後の1つなら全達成ボーナスも付ける
export function claimDailyMission(me: MeResponse, slot: number, now: number): MeResponse {
  const day = dayIndex(now)
  const mission = Number.isInteger(slot) ? dailyMissionsFor(day)[slot] : undefined
  if (!mission) throw new Error(`枠が不正: ${slot}`)

  const { counts, claimed } = dailyMissionToday(me.user, now)
  if (claimed.includes(slot)) throw new Error('受取済み')
  if ((counts[mission.event] ?? 0) < mission.target) throw new Error('未達成')

  const nextClaimed = [...claimed, slot]
  const bonus = nextClaimed.length === DAILY_SLOTS.length ? DAILY_ALL_CLEAR_GEMS : 0

  return {
    ...me,
    user: {
      ...me.user,
      gems: me.user.gems + mission.gems + bonus,
      mission_day: day,
      mission_counts: counts,
      mission_claimed: nextClaimed,
    },
  }
}

// 受け取れる枠をまとめて受け取る
export function claimAllDailyMissions(me: MeResponse, now: number): MeResponse {
  const slots = claimableDailySlots(me.user, now)
  if (slots.length === 0) throw new Error('受け取れる任務が無い')
  return slots.reduce((next, slot) => claimDailyMission(next, slot, now), me)
}
