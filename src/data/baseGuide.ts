import { REFINERY_POS, TOWER_POS } from './baseTerrain'
import type { BaseGuideStep } from '../features/tutorial/guide'

// 基地に初めて入ったときのチュートリアル。熱・精錬所・キャラの置き方を教える。紙幣を使う操作はさせない
// ラピス（初期キャラの魔導士）を冷たいマスに立たせて、キャラでも暖められることを見せる
const PLACE_AT = { q: 6, r: 3 } // 精錬所の右。暖房塔から2マスで、隣に豊かな鉱脈（7,3）がある

export const baseGuide: BaseGuideStep[] = [
  { speaker: 'lapis', textKey: 'baseIntro', wait: 'tap' },
  { speaker: 'lapis', textKey: 'baseTower', focus: [{ tile: TOWER_POS }], wait: 'tap' },
  { speaker: 'lapis', textKey: 'baseHeat', focus: [{ ui: 'heat' }], wait: 'tap' },
  { speaker: 'lapis', textKey: 'baseOpenMembers', focus: [{ ui: 'members' }], wait: 'members' },
  {
    speaker: 'lapis',
    textKey: 'basePlace',
    focus: [{ tile: PLACE_AT }, { ui: 'member-lapis' }],
    dragHint: true,
    wait: { place: 'lapis', at: PLACE_AT },
  },
  { speaker: 'lapis', textKey: 'baseWarm', focus: [{ tile: PLACE_AT }, { around: PLACE_AT }], wait: 'tap' },
  { speaker: 'lapis', textKey: 'baseWork', focus: [{ tile: PLACE_AT }, { around: PLACE_AT }], wait: 'tap' },
  { speaker: 'lapis', textKey: 'baseSelectRefinery', focus: [{ tile: REFINERY_POS }], wait: { select: REFINERY_POS } },
  { speaker: 'lapis', textKey: 'baseRefinery', focus: [{ ui: 'tile-panel' }], left: true, wait: 'tap' },
  { speaker: 'lapis', textKey: 'baseOutro', wait: 'tap' },
]
