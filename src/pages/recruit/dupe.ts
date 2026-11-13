import { characterMasters } from '../../data/characters'
import { MAX_DUPE } from '../../data/characters/const'
import { DUPE_CONVERT_CURRENCY } from '../../data/gacha'
import { describeDupeBonus } from '../../features/characters/describe'
import { fill } from '../../i18n'
import { formatCompact } from '../../utils/format'
import type { RecruitTexts } from './texts'

// 交換所で出す凸の表示
export function dupeLabel(dupe: number | null, t: RecruitTexts): string {
  if (dupe === null) return t.notOwned
  return dupe >= MAX_DUPE ? t.dupeMax : fill(t.dupeCount, dupe)
}

// 凸の段1つ分
export interface DupeStep {
  step: string
  text: string
  state: 'done' | 'next' | 'later'
}

// 加入と凸1〜5。凸上限なら紙幣に変わる段を足す
export function dupeSteps(masterId: string, dupe: number | null, name: string, t: RecruitTexts): DupeStep[] {
  const master = characterMasters[masterId]
  const steps: DupeStep[] = master.dupeBonuses.map((bonus, i) => ({
    step: fill(t.dupeStep, i + 1),
    text: describeDupeBonus(bonus, t.dupeSkillAp).join(' '),
    state: dupe !== null && i < dupe ? 'done' : dupe === i ? 'next' : 'later',
  }))
  if (dupe === null) steps.unshift({ step: t.joinStep, text: fill(t.joinStepText, name), state: 'next' })
  if (dupe !== null && dupe >= MAX_DUPE) {
    steps.push({ step: t.afterStep, text: fill(t.convertStepText, convertText(masterId)), state: 'next' })
  }
  return steps
}

// 交換で受け取るもの1行
export function dupeEffect(masterId: string, dupe: number | null, name: string, t: RecruitTexts): string {
  if (dupe === null) return fill(t.joinEffect, name)
  if (dupe >= MAX_DUPE) return fill(t.convertEffect, convertText(masterId))
  const bonus = describeDupeBonus(characterMasters[masterId].dupeBonuses[dupe], t.dupeSkillAp).join(' ')
  return fill(t.dupeEffect, dupe + 1, bonus)
}

const convertText = (masterId: string) =>
  formatCompact(DUPE_CONVERT_CURRENCY[characterMasters[masterId].rarity])
