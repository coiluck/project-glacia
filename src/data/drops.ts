export interface DropEntry {
  itemId: string
  count: number    // 当たったときの個数
  rate?: number    // 当たる確率（0〜1）。省略で確定枠
}

// キーは Stage.id
export const dropTables: Record<string, DropEntry[]> = {
  // 1章: 氷晶片・鋼の欠片・火打石・壊れた歯車
  '1-1': [
    { itemId: 'iceCrystal', count: 2 },
    { itemId: 'iceCrystal', count: 1, rate: 0.6 },
  ],
  '1-2': [
    { itemId: 'iceCrystal', count: 2 },
    { itemId: 'steelScrap', count: 1, rate: 0.5 },
    { itemId: 'trainingRecordSmall', count: 1, rate: 0.15 },
  ],
  '1-3': [
    { itemId: 'steelScrap', count: 2 },
    { itemId: 'steelScrap', count: 1, rate: 0.45 },
    { itemId: 'flint', count: 1, rate: 0.55 },
    { itemId: 'skillBookSmall', count: 1, rate: 0.25 },
  ],
  // 火打石を集めるならここが一番効率がいい
  '1-4': [
    { itemId: 'flint', count: 2 },
    { itemId: 'flint', count: 2, rate: 0.4 },
    { itemId: 'brokenGear', count: 1, rate: 0.5 },
    { itemId: 'trainingRecordSmall', count: 1, rate: 0.25 },
  ],
  '1-5': [
    { itemId: 'brokenGear', count: 2 },
    { itemId: 'brokenGear', count: 1, rate: 0.5 },
    { itemId: 'steelScrap', count: 2, rate: 0.35 },
    { itemId: 'skillBookSmall', count: 1, rate: 0.3 },
  ],
  '1-6': [
    { itemId: 'iceCrystal', count: 3 },
    { itemId: 'steelScrap', count: 2 },
    { itemId: 'brokenGear', count: 2, rate: 0.45 },
    { itemId: 'skillBookSmall', count: 1, rate: 0.55 },
    { itemId: 'trainingRecordSmall', count: 1, rate: 0.35 },
  ],

  // 2章: 獣の牙・丈夫な毛皮・薬草の束・魔石の粉
  '2-1': [
    { itemId: 'beastFang', count: 2 },
    { itemId: 'beastFang', count: 1, rate: 0.55 },
    { itemId: 'iceCrystal', count: 2, rate: 0.4 },
  ],
  '2-2': [
    { itemId: 'beastFang', count: 2 },
    { itemId: 'toughHide', count: 1, rate: 0.5 },
    { itemId: 'skillBookSmall', count: 1, rate: 0.3 },
  ],
  '2-3': [
    { itemId: 'toughHide', count: 2 },
    { itemId: 'toughHide', count: 1, rate: 0.45 },
    { itemId: 'herbBundle', count: 1, rate: 0.5 },
    { itemId: 'trainingRecordSmall', count: 1, rate: 0.3 },
  ],
  // 薬草の束を集めるならここが一番効率がいい
  '2-4': [
    { itemId: 'herbBundle', count: 3 },
    { itemId: 'herbBundle', count: 1, rate: 0.4 },
    { itemId: 'magicDust', count: 1, rate: 0.35 },
  ],
  '2-5': [
    { itemId: 'magicDust', count: 2 },
    { itemId: 'magicDust', count: 1, rate: 0.5 },
    { itemId: 'beastFang', count: 2, rate: 0.45 },
    { itemId: 'skillBookSmall', count: 1, rate: 0.35 },
  ],
  '2-6': [
    { itemId: 'toughHide', count: 3 },
    { itemId: 'magicDust', count: 2, rate: 0.55 },
    { itemId: 'flint', count: 2, rate: 0.4 },
    { itemId: 'trainingRecordSmall', count: 1, rate: 0.35 },
  ],
  '2-7': [
    { itemId: 'beastFang', count: 3 },
    { itemId: 'herbBundle', count: 3 },
    { itemId: 'magicDust', count: 2, rate: 0.5 },
    { itemId: 'skillBookSmall', count: 2, rate: 0.6 },
    { itemId: 'trainingRecordSmall', count: 1, rate: 0.45 },
  ],

  // 3章: 覚醒石・精錬鋼
  '3-1': [
    { itemId: 'iceCrystal', count: 3 },
    { itemId: 'steelScrap', count: 2 },
    { itemId: 'awakenStone', count: 1, rate: 0.2 }, // ★2の初出。低確率
  ],
  '3-2': [
    { itemId: 'steelScrap', count: 3 },
    { itemId: 'awakenStone', count: 1, rate: 0.25 },
    { itemId: 'skillBookMedium', count: 1, rate: 0.15 },
  ],
  '3-3': [
    { itemId: 'brokenGear', count: 3 },
    { itemId: 'refinedSteel', count: 1, rate: 0.2 },
    { itemId: 'trainingRecordMedium', count: 1, rate: 0.2 },
  ],
  // ここから覚醒石が確定枠に入る
  '3-4': [
    { itemId: 'awakenStone', count: 1 },
    { itemId: 'iceCrystal', count: 3, rate: 0.55 },
    { itemId: 'refinedSteel', count: 1, rate: 0.25 },
    { itemId: 'skillBookSmall', count: 2, rate: 0.4 },
  ],
  '3-5': [
    { itemId: 'refinedSteel', count: 1 },
    { itemId: 'flint', count: 3, rate: 0.5 },
    { itemId: 'awakenStone', count: 1, rate: 0.3 },
    { itemId: 'skillBookMedium', count: 1, rate: 0.2 },
  ],
  '3-6': [
    { itemId: 'awakenStone', count: 1 },
    { itemId: 'toughHide', count: 3 },
    { itemId: 'refinedSteel', count: 1, rate: 0.35 },
    { itemId: 'trainingRecordMedium', count: 1, rate: 0.25 },
  ],
  '3-7': [
    { itemId: 'awakenStone', count: 2 },
    { itemId: 'refinedSteel', count: 1 },
    { itemId: 'iceCrystal', count: 4, rate: 0.45 },
    { itemId: 'skillBookMedium', count: 1, rate: 0.5 },
    { itemId: 'trainingRecordMedium', count: 1, rate: 0.4 },
  ],

  // 4章: 魔獣石・強化皮革・霊薬の雫
  '4-1': [
    { itemId: 'beastFang', count: 4 },
    { itemId: 'beastStone', count: 1, rate: 0.2 },
    { itemId: 'skillBookMedium', count: 1, rate: 0.25 },
  ],
  '4-2': [
    { itemId: 'toughHide', count: 4 },
    { itemId: 'temperedLeather', count: 1, rate: 0.2 },
    { itemId: 'trainingRecordMedium', count: 1, rate: 0.3 },
  ],
  '4-3': [
    { itemId: 'herbBundle', count: 4 },
    { itemId: 'elixirDrop', count: 1, rate: 0.2 },
    { itemId: 'beastStone', count: 1, rate: 0.15 },
  ],
  '4-4': [
    { itemId: 'beastStone', count: 1 },
    { itemId: 'magicDust', count: 3, rate: 0.5 },
    { itemId: 'elixirDrop', count: 1, rate: 0.25 },
    { itemId: 'skillBookMedium', count: 1, rate: 0.3 },
  ],
  '4-5': [
    { itemId: 'temperedLeather', count: 1 },
    { itemId: 'beastStone', count: 1, rate: 0.3 },
    { itemId: 'awakenStone', count: 1, rate: 0.35 },
    { itemId: 'trainingRecordMedium', count: 1, rate: 0.35 },
  ],
  '4-6': [
    { itemId: 'elixirDrop', count: 1 },
    { itemId: 'temperedLeather', count: 1, rate: 0.3 },
    { itemId: 'refinedSteel', count: 2, rate: 0.4 },
    { itemId: 'skillBookMedium', count: 1, rate: 0.35 },
  ],
  // 育成記録（大）はここと 4-8 だけ
  '4-7': [
    { itemId: 'beastStone', count: 1 },
    { itemId: 'elixirDrop', count: 1 },
    { itemId: 'temperedLeather', count: 1, rate: 0.4 },
    { itemId: 'trainingRecordLarge', count: 1, rate: 0.15 },
  ],
  '4-8': [
    { itemId: 'awakenStone', count: 2 },
    { itemId: 'beastStone', count: 1 },
    { itemId: 'temperedLeather', count: 1, rate: 0.45 },
    { itemId: 'elixirDrop', count: 1, rate: 0.45 },
    { itemId: 'skillBookMedium', count: 2, rate: 0.55 },
    { itemId: 'trainingRecordLarge', count: 1, rate: 0.25 },
  ],
}
