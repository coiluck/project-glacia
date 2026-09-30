import type { CharacterMaster } from '../types';

// ステラ（★2・魔導士）
const stella: CharacterMaster = {
  id: 'stella',
  nameKey: 'charStella',
  topLineKey: 'topLineStella',
  rarity: 2,
  classId: 'mage',
  base: { hp: 240, attack: 32, defense: 12 },
  growth: { hp: 7.5, attack: 1.4, defense: 0.5 },
  skills: [
    // 星屑の雨: 狙ったマスとその周囲1マスの敵すべてに当たる。1体あたりの威力は低め
    {
      def: {
        id: 'stellaStardust',
        nameKey: 'skillStellaStardust',
        apCost: 4,
        range: { kind: 'range', min: 0, max: 2 },
        effect: [
          { type: 'damage', power: 55, target: 'enemy', area: { kind: 'range', min: 0, max: 1 } },
        ],
      },
      descriptionKey: 'skillStellaStardustDesc',
      effectGrowth: [6],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 3 }],
        [{ itemId: 'skillBookSmall', count: 5 }, { itemId: 'magicDust', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 8 }, { itemId: 'magicDust', count: 3 }],
        [{ itemId: 'skillBookLarge', count: 3 }, { itemId: 'magicDust', count: 5 }],
        [{ itemId: 'skillBookLarge', count: 5 }, { itemId: 'arcaneCore', count: 1 }],
      ],
    },
    // 星のおまじない: 狙ったマスとその周囲1マスの味方すべてを回復する
    {
      def: {
        id: 'stellaStarCharm',
        nameKey: 'skillStellaStarCharm',
        apCost: 3,
        range: { kind: 'range', min: 0, max: 2 },
        effect: [
          { type: 'healHp', amount: 55, target: 'ally', area: { kind: 'range', min: 0, max: 1 } },
        ],
      },
      descriptionKey: 'skillStellaStarCharmDesc',
      effectGrowth: [10],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 3 }],
        [{ itemId: 'skillBookSmall', count: 5 }, { itemId: 'herbBundle', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 8 }, { itemId: 'herbBundle', count: 3 }],
        [{ itemId: 'skillBookLarge', count: 3 }, { itemId: 'herbBundle', count: 5 }],
        [{ itemId: 'skillBookLarge', count: 5 }, { itemId: 'arcaneCore', count: 1 }],
      ],
    },
  ],
  limitBreakCosts: [
    // Lv30 の壁。★2なので壁は1回だけ
    [{ itemId: 'awakenStone', count: 4 }, { itemId: 'magicDust', count: 8 }],
  ],
  dupeBonuses: [
    { status: { attack: 8 } },
    { status: { hp: 40, defense: 4 } },
    { status: { attack: 10 } },
    { skillApCost: -1 },
    { status: { hp: 80, attack: 16, defense: 8 } },
  ],
};

export default stella;
