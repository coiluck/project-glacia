import type { CharacterMaster } from '../types';

// ソレイユ（★3・魔導士）
// 自分を中心にした範囲で戦う。どちらのスキルも自分のマスを狙い、立ち位置がそのまま効果範囲になる
const soleil: CharacterMaster = {
  id: 'soleil',
  nameKey: 'charSoleil',
  topLineKey: 'topLineSoleil',
  rarity: 3,
  classId: 'mage',
  base: { hp: 300, attack: 32, defense: 16 },
  growth: { hp: 9.5, attack: 1.3, defense: 0.6 },
  skills: [
    // 日輪: 自分からちょうど距離2の輪にいる敵すべてを焼く。隣接の敵には当たらないので、間合いを測って立つ
    {
      def: {
        id: 'soleilHalo',
        nameKey: 'skillSoleilHalo',
        apCost: 4,
        range: { kind: 'range', min: 0, max: 0 }, // 自分のマスだけを狙う
        effect: [
          {
            type: 'damage',
            power: 80,
            target: 'enemy',
            area: { kind: 'range', min: 2, max: 2 },
          },
        ],
      },
      descriptionKey: 'skillSoleilHaloDesc',
      effectGrowth: [8],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 4 }],
        [{ itemId: 'skillBookSmall', count: 6 }, { itemId: 'magicDust', count: 2 }],
        [{ itemId: 'skillBookLarge', count: 2 }, { itemId: 'magicDust', count: 4 }],
        [{ itemId: 'skillBookLarge', count: 4 }, { itemId: 'magicDust', count: 6 }],
        [{ itemId: 'skillBookLarge', count: 6 }, { itemId: 'radiantStone', count: 1 }],
      ],
    },
    // 陽輪の祝福: 距離2以内の味方全員を回復し、自分以外にはAPも2渡す。AP付与量はレベルで伸ばさない
    {
      def: {
        id: 'soleilBlessing',
        nameKey: 'skillSoleilBlessing',
        apCost: 4,
        range: { kind: 'range', min: 0, max: 0 },
        effect: [
          { type: 'healHp', amount: 60, target: 'ally', area: { kind: 'range', min: 0, max: 2 } },
          { type: 'grantAp', amount: 2, target: 'ally', area: { kind: 'range', min: 1, max: 2 } },
        ],
      },
      descriptionKey: 'skillSoleilBlessingDesc',
      effectGrowth: [12, 0],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 4 }],
        [{ itemId: 'skillBookSmall', count: 6 }, { itemId: 'herbBundle', count: 2 }],
        [{ itemId: 'skillBookLarge', count: 2 }, { itemId: 'herbBundle', count: 4 }],
        [{ itemId: 'skillBookLarge', count: 4 }, { itemId: 'herbBundle', count: 6 }],
        [{ itemId: 'skillBookLarge', count: 6 }, { itemId: 'radiantStone', count: 1 }],
      ],
    },
  ],
  limitBreakCosts: [
    // Lv30 の壁
    [{ itemId: 'awakenStone', count: 5 }, { itemId: 'magicDust', count: 10 }],
    // Lv45 の壁
    [{ itemId: 'awakenStone', count: 15 }, { itemId: 'radiantStone', count: 3 }],
  ],
  dupeBonuses: [
    { status: { hp: 50 } },
    { status: { attack: 8, defense: 4 } },
    { skillApCost: -1 },
    { status: { hp: 80, attack: 10 } },
    { status: { hp: 120, attack: 18, defense: 10 } },
  ],
};

export default soleil;
