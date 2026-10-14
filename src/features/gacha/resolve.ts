// 召集1回ぶんのサーバー側の処理」
import type { MeResponse } from '../../api/types'
import { characterMasters } from '../../data/characters'
import { MAX_DUPE } from '../../data/characters/const'
import type { UserCharacter } from '../../data/characters/types'
import {
  BANNER_IDS,
  CEILING_PULLS,
  CEILING_TARGETS,
  DUPE_CONVERT_CURRENCY,
  MULTI_PULL_COUNT,
  PICK_UP_IDS,
  PULL_COST_MULTI,
  PULL_COST_SINGLE,
  type BannerId,
} from '../../data/gacha'
import { rollPulls } from './roll'
import type { AcquireResult, PullOutcome } from './types'

// 引く回数から消費ジェムを決める
function costFor(count: number): number {
  return count === MULTI_PULL_COUNT ? PULL_COST_MULTI : PULL_COST_SINGLE * count
}

// 1体ぶん所持データへ加える。未所持なら追加、所持済みなら凸を+1する。
// 凸が上限のときは所持データを変えず、通貨への変換は呼び出し側に任せる
function acquire(owned: Map<string, UserCharacter>, masterId: string): AcquireResult {
  const current = owned.get(masterId)

  // 未所持
  if (!current) {
    const master = characterMasters[masterId]
    owned.set(masterId, {
      masterId,
      level: 1,
      exp: 0,
      limitBreak: 0,
      dupe: 0,
      selectedSkillId: master.skills[0].def.id,
      skillLevels: {},
    })
    return 'new'
  }

  if (current.dupe >= MAX_DUPE) return 'convert'

  owned.set(masterId, { ...current, dupe: current.dupe + 1 })
  return 'dupe'
}

export function resolvePull(
  me: MeResponse,
  count: number,
  banner: BannerId,
): { me: MeResponse; pulls: PullOutcome[] } {
  if (count !== 1 && count !== MULTI_PULL_COUNT) {
    throw new Error(`召集の回数が不正: ${count}`)
  }
  if (!BANNER_IDS.includes(banner)) throw new Error(`召集の種類が不正: ${banner}`)

  const cost = costFor(count)
  if (me.user.gems < cost) throw new Error('ジェムが足りない')

  const rolled = rollPulls(count, banner === 'pickup' ? PICK_UP_IDS : [])

  const owned = new Map(me.characters.map((c) => [c.masterId, c]))
  let converted = 0

  const pulls = rolled.map((pull) => {
    const kind = acquire(owned, pull.masterId)
    const currency = kind === 'convert' ? DUPE_CONVERT_CURRENCY[pull.rarity] : 0
    converted += currency
    return { ...pull, kind, currency }
  })

  return {
    me: {
      ...me,
      user: {
        ...me.user,
        gems: me.user.gems - cost,
        currency: me.user.currency + converted,
        pity: me.user.pity + count, // 交換pt。どちらの召集でも1回1pt
      },
      characters: [...owned.values()],
    },
    pulls,
  }
}

// 天井交換
export function resolveCeilingExchange(
  me: MeResponse,
  masterId: string,
): { me: MeResponse; outcome: PullOutcome } {
  if (!CEILING_TARGETS.standard.includes(masterId)) {
    throw new Error(`交換できないキャラ: ${masterId}`)
  }
  if (me.user.pity < CEILING_PULLS) throw new Error('交換ptが足りない')

  const owned = new Map(me.characters.map((c) => [c.masterId, c]))
  const rarity = characterMasters[masterId].rarity
  const kind = acquire(owned, masterId)
  const currency = kind === 'convert' ? DUPE_CONVERT_CURRENCY[rarity] : 0

  return {
    me: {
      ...me,
      user: {
        ...me.user,
        currency: me.user.currency + currency,
        pity: me.user.pity - CEILING_PULLS,
      },
      characters: [...owned.values()],
    },
    outcome: { masterId, rarity, kind, currency },
  }
}
