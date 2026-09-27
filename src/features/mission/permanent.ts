// 永続任務
import type { MeResponse, UserRow } from '../../api/types'
import type { UserCharacter } from '../../data/characters/types'
import { PERMANENT_MISSIONS, type PermanentCondition } from '../../data/missions'

// 達成の判定に要る値。MeResponse はそのまま渡せる
export interface PermanentBase {
  user: Pick<UserRow, 'rank' | 'cleared_stage_ids'>
  characters: UserCharacter[]
}

// 進捗。current >= target で達成
export function permanentProgress(
  me: PermanentBase,
  condition: PermanentCondition,
): { current: number; target: number } {
  const { user, characters } = me

  switch (condition.kind) {
    case 'stageClear':
      return { current: user.cleared_stage_ids.includes(condition.stageId) ? 1 : 0, target: 1 }
    case 'rank':
      return { current: user.rank, target: condition.rank }
    case 'characterLevel':
      return { current: Math.max(0, ...characters.map((c) => c.level)), target: condition.level }
    case 'limitBreak':
      return { current: Math.max(0, ...characters.map((c) => c.limitBreak)), target: condition.count }
    case 'skillLevel':
      return {
        // 記録の無いスキルは Lv1
        current: Math.max(1, ...characters.flatMap((c) => Object.values(c.skillLevels))),
        target: condition.level,
      }
    case 'characterCount':
      return { current: characters.length, target: condition.count }
  }
}

// 永続任務を1つ受け取る
export function claimPermanentMission(me: MeResponse, id: string): MeResponse {
  const mission = PERMANENT_MISSIONS.find((m) => m.id === id)
  if (!mission) throw new Error(`任務が無い: ${id}`)
  if (me.user.mission_done.includes(id)) throw new Error('受取済み')

  const { current, target } = permanentProgress(me, mission.condition)
  if (current < target) throw new Error('未達成')

  return {
    ...me,
    user: {
      ...me.user,
      gems: me.user.gems + mission.gems,
      mission_done: [...me.user.mission_done, id],
    },
  }
}

// 達成していて、まだ受け取っていない任務の id
export function claimablePermanentIds(me: PermanentBase, done: string[]): string[] {
  return PERMANENT_MISSIONS.filter((m) => {
    if (done.includes(m.id)) return false
    const { current, target } = permanentProgress(me, m.condition)
    return current >= target
  }).map((m) => m.id)
}

// 受け取れる任務をまとめて受け取る
export function claimAllPermanentMissions(me: MeResponse): MeResponse {
  const ids = claimablePermanentIds(me, me.user.mission_done)
  if (ids.length === 0) throw new Error('受け取れる任務が無い')
  return ids.reduce((next, id) => claimPermanentMission(next, id), me)
}
