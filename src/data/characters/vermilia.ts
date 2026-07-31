import type { CharacterMaster } from './types';

// ベルミリア（★3・剣士）。赤髪、身の丈ほどの大剣使い。
// 1ターンぶんのAPを丸ごと使う重い一撃が主軸。硬くて鈍い、殴り合い向きのアタッカー。
// itemId は仮。アイテムデータを作ったら差し替える
const vermilia: CharacterMaster = {
  id: 'vermilia',
  nameKey: 'charVermilia',
  profileKey: 'charVermiliaProfile',
  rarity: 3,
  classId: 'soldier',
  base: { hp: 480, attack: 36, defense: 28 },
  growth: { hp: 16, attack: 1.5, defense: 1.1 },
  skills: [
    // 剛断: 隣接1体への特大ダメージ。4AP（個人APの上限）なので、撃つターンは移動できない
    {
      def: {
        id: 'vermiliaHeavyCleave',
        nameKey: 'skillVermiliaHeavyCleave',
        apCost: 4,
        range: 1,
        effect: [
          { type: 'damage', power: 160, shape: { kind: 'range', max: 1 }, target: 'enemy', targets: 1 },
        ],
      },
      descriptionKey: 'skillVermiliaHeavyCleaveDesc',
      effectGrowth: [17],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 4 }],
        [{ itemId: 'skillBookSmall', count: 6 }, { itemId: 'iceCrystal', count: 2 }],
        [{ itemId: 'skillBookLarge', count: 2 }, { itemId: 'iceCrystal', count: 4 }],
        [{ itemId: 'skillBookLarge', count: 4 }, { itemId: 'iceCrystal', count: 6 }],
        [{ itemId: 'skillBookLarge', count: 6 }, { itemId: 'vermiliaMemory', count: 1 }],
      ],
    },
    // 鉄の構え: 大剣を地に突き立てて耐える自己回復。range 0 なので自分が対象
    {
      def: {
        id: 'vermiliaIronStance',
        nameKey: 'skillVermiliaIronStance',
        apCost: 2,
        range: 0,
        effect: [{ type: 'healHp', amount: 110, target: 'self' }],
      },
      descriptionKey: 'skillVermiliaIronStanceDesc',
      effectGrowth: [22],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 4 }],
        [{ itemId: 'skillBookSmall', count: 6 }, { itemId: 'iceCrystal', count: 2 }],
        [{ itemId: 'skillBookLarge', count: 2 }, { itemId: 'iceCrystal', count: 4 }],
        [{ itemId: 'skillBookLarge', count: 4 }, { itemId: 'iceCrystal', count: 6 }],
        [{ itemId: 'skillBookLarge', count: 6 }, { itemId: 'vermiliaMemory', count: 1 }],
      ],
    },
  ],
  limitBreakCosts: [
    // Lv30 の壁
    [{ itemId: 'awakenStone', count: 5 }, { itemId: 'iceCrystal', count: 10 }],
    // Lv45 の壁
    [{ itemId: 'awakenStone', count: 15 }, { itemId: 'vermiliaMemory', count: 3 }],
  ],
  // 一撃特化なので攻撃力の伸びが大きい。剛断が3APで撃てるようになる4凸が到達点
  dupeBonuses: [
    { status: { attack: 12 } },
    { status: { hp: 80 } },
    { status: { attack: 18, defense: 6 } },
    { skillApCost: -1 },
    { status: { hp: 160, attack: 26, defense: 12 } },
  ],
};

export default vermilia;
