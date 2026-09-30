// 任務画面の文言キーと分類
import type { MissionEvent, PermanentCondition } from '../../data/missions'

type ConditionKind = PermanentCondition['kind']

// イベント -> mission.json のキー
export const EVENT_KEYS: Record<MissionEvent, string> = {
  battleWin: 'eventBattleWin',
  battleWinManual: 'eventBattleWinManual',
  staminaSpent: 'eventStaminaSpent',
  exchangeClaim: 'eventExchangeClaim',
  exchangeTrade: 'eventExchangeTrade',
  currencySpent: 'eventCurrencySpent',
}

// 条件 -> mission.json のキー
export const CONDITION_KEYS: Record<ConditionKind, string> = {
  stageClear: 'conditionStageClear',
  rank: 'conditionRank',
  characterLevel: 'conditionCharacterLevel',
  limitBreak: 'conditionLimitBreak',
  skillLevel: 'conditionSkillLevel',
  characterCount: 'conditionCharacterCount',
}

// 永続任務の分類
export type Category = 'all' | 'story' | 'rank' | 'growth' | 'collection'

export const CATEGORIES: {
  key: Category
  labelKey: string
  caption: string
  kinds: ConditionKind[]
}[] = [
  { key: 'all', labelKey: 'categoryAll', caption: 'ALL', kinds: [] },
  { key: 'story', labelKey: 'categoryStory', caption: 'STORY', kinds: ['stageClear'] },
  { key: 'rank', labelKey: 'categoryRank', caption: 'RANK', kinds: ['rank'] },
  {
    key: 'growth',
    labelKey: 'categoryGrowth',
    caption: 'GROWTH',
    kinds: ['characterLevel', 'limitBreak', 'skillLevel'],
  },
  { key: 'collection', labelKey: 'categoryCollection', caption: 'COLLECTION', kinds: ['characterCount'] },
]
