import type { CharacterMaster } from '../types';

// シルヴィ（★2・弓兵）
const sylvie: CharacterMaster = {
  id: 'sylvie',
  nameKey: 'charSylvie',
  topLineKey: 'topLineSylvie',
  rarity: 2,
  classId: 'archer',
  base: { hp: 260, attack: 30, defense: 14 },
  growth: { hp: 8, attack: 1.3, defense: 0.6 },
  skills: [
    // 貫き矢: 距離2〜3の狙ったマスと、術者から見たその1つ奥を貫く
    {
      def: {
        id: 'sylviePiercingArrow',
        nameKey: 'skillSylviePiercingArrow',
        apCost: 3,
        range: { kind: 'range', min: 2, max: 3 },
        effect: [
          {
            type: 'damage',
            power: 75,
            target: 'enemy',
            area: { kind: 'pattern', offsets: [{ q: 0, r: 0 }, { q: 1, r: 0 }] },
          },
        ],
      },
      descriptionKey: 'skillSylviePiercingArrowDesc',
      effectGrowth: [8],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 3 }],
        [{ itemId: 'skillBookSmall', count: 5 }, { itemId: 'toughHide', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 8 }, { itemId: 'toughHide', count: 3 }],
        [{ itemId: 'skillBookLarge', count: 3 }, { itemId: 'toughHide', count: 5 }],
        [{ itemId: 'skillBookLarge', count: 5 }, { itemId: 'arcaneCore', count: 1 }],
      ],
    },
    // 森の癒し: 距離3まで届く単体回復。回復役の中では一番遠くへ届く
    {
      def: {
        id: 'sylvieForestMend',
        nameKey: 'skillSylvieForestMend',
        apCost: 3,
        range: { kind: 'range', min: 0, max: 3 },
        effect: [{ type: 'healHp', amount: 80, target: 'ally' }],
      },
      descriptionKey: 'skillSylvieForestMendDesc',
      effectGrowth: [15],
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
    [{ itemId: 'awakenStone', count: 4 }, { itemId: 'toughHide', count: 8 }],
  ],
  dupeBonuses: [
    { status: { attack: 6 } },
    { status: { hp: 50 } },
    { skillApCost: -1 },
    { status: { attack: 10, defense: 4 } },
    { status: { hp: 80, attack: 16, defense: 8 } },
  ],
};

export default sylvie;
