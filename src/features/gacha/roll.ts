import { RARITIES } from '../../data/characters/const'
import type { Rarity } from '../../data/characters/types'
import { PICK_UP_RATE, RARITY_RATES, gachaPool } from '../../data/gacha'

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

function rollCharacter(rarity: Rarity, pickUpIds: string[]): string {
  const candidates = gachaPool[rarity]
  const pickUps = candidates.filter((id) => pickUpIds.includes(id))
  const others = candidates.filter((id) => !pickUpIds.includes(id))

  const isPickUp = pickUps.length > 0 && (others.length === 0 || Math.random() < PICK_UP_RATE)
  const targetArr = isPickUp ? pickUps : others
  return targetArr[Math.floor(Math.random() * targetArr.length)]
}

// count 回ぶん引く
export function rollPulls(count: number, pickUpIds: string[]): Pull[] {
  return Array.from({ length: count }, () => {
    const rarity = rollRarity()
    return { masterId: rollCharacter(rarity, pickUpIds), rarity }
  })
}
