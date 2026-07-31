import type { CharacterMaster } from './types';

// アルマ（★3・剣士）。銀髪、細身のレイピア使い。
// 低コストの刺突で手数を稼ぎつつ、味方に手番を渡して前線を組み立てる支援寄りのアタッカー。
// itemId は仮。アイテムデータを作ったら差し替える
const alma: CharacterMaster = {
  id: 'alma',
  nameKey: 'charAlma',
  profileKey: 'charAlmaProfile',
  rarity: 3,
  classId: 'soldier',
  base: { hp: 340, attack: 34, defense: 22 },
  growth: { hp: 11, attack: 1.3, defense: 0.8 },
  skills: [
    // 刺突: 隣接1体へ2APで撃てる。1発の威力より回数で削るのがアルマの持ち味
    {
      def: {
        id: 'almaPiercingThrust',
        nameKey: 'skillAlmaPiercingThrust',
        apCost: 2,
        range: 1,
        effect: [
          { type: 'damage', power: 85, shape: { kind: 'range', max: 1 }, target: 'enemy', targets: 1 },
        ],
      },
      descriptionKey: 'skillAlmaPiercingThrustDesc',
      effectGrowth: [9],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 4 }],
        [{ itemId: 'skillBookSmall', count: 6 }, { itemId: 'iceCrystal', count: 2 }],
        [{ itemId: 'skillBookLarge', count: 2 }, { itemId: 'iceCrystal', count: 4 }],
        [{ itemId: 'skillBookLarge', count: 4 }, { itemId: 'iceCrystal', count: 6 }],
        [{ itemId: 'skillBookLarge', count: 6 }, { itemId: 'almaMemory', count: 1 }],
      ],
    },
    // 銀旗の号令: 距離2以内の味方1体にAPを渡しつつHPも回復する。AP付与量はレベルで伸ばさない
    {
      def: {
        id: 'almaSilverBanner',
        nameKey: 'skillAlmaSilverBanner',
        apCost: 3,
        range: 2,
        effect: [
          { type: 'grantAp', amount: 2, target: 'ally' },
          { type: 'healHp', amount: 90, target: 'ally' },
        ],
      },
      descriptionKey: 'skillAlmaSilverBannerDesc',
      effectGrowth: [0, 18],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 4 }],
        [{ itemId: 'skillBookSmall', count: 6 }, { itemId: 'iceCrystal', count: 2 }],
        [{ itemId: 'skillBookLarge', count: 2 }, { itemId: 'iceCrystal', count: 4 }],
        [{ itemId: 'skillBookLarge', count: 4 }, { itemId: 'iceCrystal', count: 6 }],
        [{ itemId: 'skillBookLarge', count: 6 }, { itemId: 'almaMemory', count: 1 }],
      ],
    },
  ],
  limitBreakCosts: [
    // Lv30 の壁
    [{ itemId: 'awakenStone', count: 5 }, { itemId: 'iceCrystal', count: 10 }],
    // Lv45 の壁
    [{ itemId: 'awakenStone', count: 15 }, { itemId: 'almaMemory', count: 3 }],
  ],
  // 手数型なので、AP消費の軽減を早い段階（2凸）に置くのがアルマの凸の特徴
  dupeBonuses: [
    { status: { attack: 8 } },
    { skillApCost: -1 },
    { status: { hp: 60, defense: 6 } },
    { status: { attack: 14, defense: 4 } },
    { status: { hp: 120, attack: 22, defense: 10 } },
  ],
};

export default alma;
