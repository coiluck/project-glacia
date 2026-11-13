// 難易度曲線の測り方。curve.sim.ts と、調整案を試すスクリプトから使う
import type { BattleStageData } from '../../src/features/battle/types'
import { playWithBot } from '../data/helpers/bot'

// ★3の人数（4・2・1・1・1・1・0人）の違う編成。実際のプレイヤーは5-4の時点で★3が0〜2人のことが多い
export const CURVE_PARTIES: Record<string, string[]> = {
  '★3×4': ['alma', 'vermilia', 'lapis', 'oboro', 'sylvie'],
  '★3×2': ['alma', 'oboro', 'lapis', 'stella', 'sylvie'],
  '★3×1 剣': ['vermilia', 'lapis', 'sylvie', 'stella', 'rosalie'],
  '★3×1 魔': ['soleil', 'lapis', 'sylvie', 'stella', 'clarice'],
  '★3×1 剣2': ['alma', 'lapis', 'sylvie', 'rosalie', 'clarice'],
  '★3×1 弓': ['oboro', 'lapis', 'stella', 'rosalie', 'clarice'],
  '★3なし': ['lapis', 'sylvie', 'stella', 'rosalie', 'clarice'],
}

// 3 Lv 続けて勝てるようになる最低の Lv。ボットは Lv が上がっても負けることがあるので、1回の勝ちでは決めない
export function requiredLevel(stage: BattleStageData, party: string[], streak = 3, maxLevel = 60): number | undefined {
  let run = 0
  for (let lv = 1; lv <= maxLevel; lv++) {
    run = playWithBot(stage, party, lv).victory ? run + 1 : 0
    if (run === streak) return lv - streak + 1
  }
  return undefined
}

export const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b)
  return s[Math.floor(s.length / 2)]
}
