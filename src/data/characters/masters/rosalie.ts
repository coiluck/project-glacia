import type { CharacterMaster } from '../types';

// ロザリー（★1・魔導士）
const rosalie: CharacterMaster = {
  id: 'rosalie',
  nameKey: 'charRosalie',
  topLineKey: 'topLineRosalie',
  rarity: 1,
  classId: 'mage',
  base: { hp: 230, attack: 24, defense: 14 },
  growth: { hp: 7.5, attack: 1.0, defense: 0.6 },
  skills: [
    // 黙祷: 自分と周囲1マスの味方すべてを回復する
    {
      def: {
        id: 'rosalieSilentPrayer',
        nameKey: 'skillRosalieSilentPrayer',
        apCost: 3,
        range: { kind: 'range', max: 0 }, // 自分のマスだけを狙う
        effect: [
          { type: 'healHp', amount: 50, target: 'ally', area: { kind: 'range', min: 0, max: 1 } },
        ],
      },
      descriptionKey: 'skillRosalieSilentPrayerDesc',
      effectGrowth: [9],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 1 }],
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 4 }, { itemId: 'herbBundle', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 6 }, { itemId: 'herbBundle', count: 3 }],
        [{ itemId: 'skillBookMedium', count: 3 }, { itemId: 'herbBundle', count: 4 }],
        [{ itemId: 'skillBookMedium', count: 5 }, { itemId: 'elixirDrop', count: 2 }],
      ],
    },
  ],
  limitBreakCosts: [
    // Lv30 の壁
    [{ itemId: 'awakenStone', count: 3 }, { itemId: 'herbBundle', count: 6 }],
  ],
  dupeBonuses: [
    { status: { hp: 30 } },
    { status: { attack: 4, defense: 3 } },
    { skillApCost: -1 },
    { status: { hp: 50, defense: 4 } },
    { status: { hp: 70, attack: 10, defense: 6 } },
  ],
};

export default rosalie;
