import { characterMasters } from '../../data/characters'
import { MAX_DUPE } from '../../data/characters/const'
import { DUPE_CONVERT_CURRENCY } from '../../data/gacha'
import { describeDupeBonus } from '../../features/characters/describe'
import { formatCompact } from '../../utils/format'

// 交換所で出す凸の表示
export function dupeLabel(dupe: number | null): string {
  if (dupe === null) return '未所持'
  return dupe >= MAX_DUPE ? '凸上限' : `凸${dupe}`
}

// 凸の段1つ分
export interface DupeStep {
  step: string
  text: string
  state: 'done' | 'next' | 'later'
}

// 加入と凸1〜5。凸上限なら紙幣に変わる段を足す
export function dupeSteps(masterId: string, dupe: number | null, name: string): DupeStep[] {
  const master = characterMasters[masterId]
  const steps: DupeStep[] = master.dupeBonuses.map((bonus, i) => ({
    step: `凸${i + 1}`,
    text: describeDupeBonus(bonus).join(' '),
    state: dupe !== null && i < dupe ? 'done' : dupe === i ? 'next' : 'later',
  }))
  if (dupe === null) steps.unshift({ step: '加入', text: `${name}が部隊に加わる`, state: 'next' })
  if (dupe !== null && dupe >= MAX_DUPE) {
    steps.push({ step: '以降', text: `紙幣 ${convertText(masterId)} に変わる`, state: 'next' })
  }
  return steps
}

// 交換で受け取るもの1行
export function dupeEffect(masterId: string, dupe: number | null, name: string): string {
  if (dupe === null) return `${name}が加入する`
  if (dupe >= MAX_DUPE) return `凸上限のため 紙幣 ${convertText(masterId)} に変わる`
  const bonus = describeDupeBonus(characterMasters[masterId].dupeBonuses[dupe]).join(' ')
  return `凸${dupe + 1}になる（${bonus}）`
}

const convertText = (masterId: string) =>
  formatCompact(DUPE_CONVERT_CURRENCY[characterMasters[masterId].rarity])
