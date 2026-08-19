import type { CharacterMaster } from './types';

// ラピス（★2・魔導士）。銀髪の魔法役で、ゲーム開始時からユーザーが所持している。
// 遠距離の攻撃と回復を1人で持つ、最初のパーティを成立させるための構成。
// itemId は仮。アイテムデータを作ったら差し替える
const lapis: CharacterMaster = {
  id: 'lapis',
  nameKey: 'charLapis',
  profileKey: 'charLapisProfile',
  rarity: 2,
  classId: 'mage',
  base: { hp: 250, attack: 30, defense: 13 },
  growth: { hp: 8, attack: 1.4, defense: 0.5 },
  skills: [
    // 氷礫: 距離3まで届く単体攻撃。通常攻撃（魔導士は距離2まで）より遠くへ届くのが利点
    {
      def: {
        id: 'lapisFrostBolt',
        nameKey: 'skillLapisFrostBolt',
        apCost: 2,
        range: { kind: 'range', max: 3, min: 2 },
        effect: [{ type: 'damage', power: 85, target: 'enemy' }],
      },
      descriptionKey: 'skillLapisFrostBoltDesc',
      effectGrowth: [9],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 3 }],
        [{ itemId: 'skillBookSmall', count: 5 }, { itemId: 'iceCrystal', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 8 }, { itemId: 'iceCrystal', count: 3 }],
        [{ itemId: 'skillBookLarge', count: 3 }, { itemId: 'iceCrystal', count: 5 }],
        [{ itemId: 'skillBookLarge', count: 5 }, { itemId: 'lapisMemory', count: 1 }],
      ],
    },
    // 癒しの光: 距離2以内の味方1体を回復する。序盤の生命線
    {
      def: {
        id: 'lapisMendingLight',
        nameKey: 'skillLapisMendingLight',
        apCost: 3,
        range: { kind: 'range', max: 2 },
        effect: [{ type: 'healHp', amount: 110, target: 'ally' }],
      },
      descriptionKey: 'skillLapisMendingLightDesc',
      effectGrowth: [20],
      levelUpCosts: [
        [{ itemId: 'skillBookSmall', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 3 }],
        [{ itemId: 'skillBookSmall', count: 5 }, { itemId: 'iceCrystal', count: 2 }],
        [{ itemId: 'skillBookSmall', count: 8 }, { itemId: 'iceCrystal', count: 3 }],
        [{ itemId: 'skillBookLarge', count: 3 }, { itemId: 'iceCrystal', count: 5 }],
        [{ itemId: 'skillBookLarge', count: 5 }, { itemId: 'lapisMemory', count: 1 }],
      ],
    },
  ],
  limitBreakCosts: [
    // Lv30 の壁。★2なので壁は1回だけ
    [{ itemId: 'awakenStone', count: 4 }, { itemId: 'iceCrystal', count: 8 }],
  ],
  // 初期配布で凸が進みやすいぶん、1凸ごとの伸びは控えめ。3凸でAP消費が軽くなる
  dupeBonuses: [
    { status: { attack: 8 } },
    { status: { hp: 40, defense: 4 } },
    { skillApCost: -1 },
    { status: { attack: 12 } },
    { status: { hp: 80, attack: 18, defense: 8 } },
  ],
};

export default lapis;
