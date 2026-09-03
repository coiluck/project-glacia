import { RARITIES } from '../../data/characters/const'
import type { Rarity } from '../../data/characters/types'
import {
  CEILING_PULLS,
  PICK_UP_IDS,
  PICK_UP_RATE,
  RARITY_RATES,
  gachaPool,
} from '../../data/gacha'

// 抽選結果1回ぶん
export interface Pull {
  masterId: string
  rarity: Rarity
}

// 実際の排出率
// キャラのいないレアリティは0
export function rarityRates(): Record<Rarity, number> {
  const available = RARITIES.filter((r) => gachaPool[r].length > 0)
  const total = available.reduce((sum, r) => sum + RARITY_RATES[r], 0)

  return {
    1: available.includes(1) ? (RARITY_RATES[1] / total) * 100 : 0,
    2: available.includes(2) ? (RARITY_RATES[2] / total) * 100 : 0,
    3: available.includes(3) ? (RARITY_RATES[3] / total) * 100 : 0,
  }
}

function rollRarity(): Rarity {
  const rates = rarityRates()
  const candidates = RARITIES.filter((r) => rates[r] > 0)

  let point = Math.random() * 100
  for (const rarity of candidates) {
    point -= rates[rarity]
    if (point < 0) return rarity
  }
  // なんか型エラーになるので返す
  return candidates[0]
}

// レアリティの中から1体選ぶ
function rollCharacter(rarity: Rarity): string {
  const candidates = gachaPool[rarity]
  const pickUps = candidates.filter((id) => PICK_UP_IDS.includes(id))
  const others = candidates.filter((id) => !PICK_UP_IDS.includes(id))

  const isPickUp = pickUps.length > 0 && (others.length === 0 || Math.random() < PICK_UP_RATE)
  const targetArr = isPickUp ? pickUps : others
  return targetArr[Math.floor(Math.random() * targetArr.length)]
}

// count 回ぶん引く。pityは天井までの回数
export function rollPulls(count: number, pity: number): { pulls: Pull[]; pity: number } {
  const pulls: Pull[] = []
  let counter = pity

  for (let i = 0; i < count; i++) {
    counter += 1

    const forced = counter >= CEILING_PULLS && gachaPool[3].length > 0
    const rarity = forced ? 3 : rollRarity()
    if (rarity === 3) counter = 0
    pulls.push({ masterId: rollCharacter(rarity), rarity })
  }

  return { pulls, pity: counter }
}
