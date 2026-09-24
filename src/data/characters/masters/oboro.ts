import type { CharacterMaster } from '../types';

// オボロ（★3・弓兵）
// 苦無を投げる忍。弓兵は隣接の敵を撃てないが、旋苦無で寄られた敵を払い、そのHPを吸って耐える
const oboro: CharacterMaster = {
  id: 'oboro',
  nameKey: 'charOboro',
  topLineKey: 'topLineOboro',
  rarity: 3,
  classId: 'archer',
  base: { hp: 290, attack: 38, defense: 14 },
  growth: { hp: 9, attack: 1.6, defense: 0.5 },
  skills: [
    // 旋苦無: 周囲1マスの敵すべてを斬り、与えたダメージの30%だけ自分のHPを回復する
    {
      def: {
        id: 'oboroWhirlingKunai',
        nameKey: 'skillOboroWhirlingKunai',
        apCost: 3,
        range: { kind: 'range', max: 0 }, // 自分のマスだけを狙う
        effect: [
          { type: 'damage', power: 70, target: 'enemy', area: { kind: 'range', max: 1 }, drain: 30 },
        ],
      },
      descriptionKey: 'skillOboroWhirlingKunaiDesc',
      effectGrowth: [7],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 4 }],
        [{ itemId: 'skillBookSmall', count: 6 }, { itemId: 'steelScrap', count: 2 }],
        [{ itemId: 'skillBookLarge', count: 2 }, { itemId: 'steelScrap', count: 4 }],
        [{ itemId: 'skillBookLarge', count: 4 }, { itemId: 'steelScrap', count: 6 }],
        [{ itemId: 'skillBookLarge', count: 6 }, { itemId: 'heroRelic', count: 1 }],
      ],
    },
    // 影縫い: 距離4まで届く単体攻撃。味方の射程では一番遠い
    {
      def: {
        id: 'oboroShadowStitch',
        nameKey: 'skillOboroShadowStitch',
        apCost: 3,
        range: { kind: 'range', min: 2, max: 4 },
        effect: [{ type: 'damage', power: 115, target: 'enemy' }],
      },
      descriptionKey: 'skillOboroShadowStitchDesc',
      effectGrowth: [12],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 4 }],
        [{ itemId: 'skillBookSmall', count: 6 }, { itemId: 'steelScrap', count: 2 }],
        [{ itemId: 'skillBookLarge', count: 2 }, { itemId: 'steelScrap', count: 4 }],
        [{ itemId: 'skillBookLarge', count: 4 }, { itemId: 'steelScrap', count: 6 }],
        [{ itemId: 'skillBookLarge', count: 6 }, { itemId: 'heroRelic', count: 1 }],
      ],
    },
  ],
  limitBreakCosts: [
    // Lv30 の壁
    [{ itemId: 'awakenStone', count: 5 }, { itemId: 'steelScrap', count: 10 }],
    // Lv45 の壁
    [{ itemId: 'awakenStone', count: 15 }, { itemId: 'radiantStone', count: 3 }],
  ],
  dupeBonuses: [
    { status: { attack: 10 } },
    { status: { hp: 50, defense: 4 } },
    { status: { attack: 14 } },
    { skillApCost: -1 },
    { status: { hp: 100, attack: 24, defense: 8 } },
  ],
};

export default oboro;
