import type { CharacterMaster } from '../types';

// クラリス（★1・弓兵）
const clarice: CharacterMaster = {
  id: 'clarice',
  nameKey: 'charClarice',
  topLineKey: 'topLineClarice',
  rarity: 1,
  classId: 'archer',
  base: { hp: 220, attack: 27, defense: 13 },
  growth: { hp: 7, attack: 1.1, defense: 0.5 },
  skills: [
    // 制圧射撃: 距離2〜3の狙ったマスと、その手前の両隣（術者から見て横並び）の3マスに撃ち込む
    {
      def: {
        id: 'clariceSuppressiveFire',
        nameKey: 'skillClariceSuppressiveFire',
        apCost: 3,
        range: { kind: 'range', min: 2, max: 3 },
        effect: [
          {
            type: 'damage',
            power: 45,
            target: 'enemy',
            area: {
              kind: 'pattern',
              offsets: [{ q: 0, r: 0 }, { q: 0, r: -1 }, { q: -1, r: 1 }],
            },
          },
        ],
      },
      descriptionKey: 'skillClariceSuppressiveFireDesc',
      effectGrowth: [5],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 1 }],
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 4 }, { itemId: 'brokenGear', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 6 }, { itemId: 'brokenGear', count: 3 }],
        [{ itemId: 'skillBookMedium', count: 3 }, { itemId: 'brokenGear', count: 4 }],
        [{ itemId: 'skillBookMedium', count: 5 }, { itemId: 'refinedSteel', count: 2 }],
      ],
    },
  ],
  limitBreakCosts: [
    // Lv30 の壁
    [{ itemId: 'awakenStone', count: 3 }, { itemId: 'brokenGear', count: 6 }],
  ],
  dupeBonuses: [
    { status: { attack: 5 } },
    { status: { hp: 30, defense: 3 } },
    { status: { attack: 8 } },
    { skillApCost: -1 },
    { status: { hp: 60, attack: 12, defense: 6 } },
  ],
};

export default clarice;
