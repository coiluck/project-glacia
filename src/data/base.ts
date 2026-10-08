// 盤面に置ける建物。暖房塔と精錬所は地形側に固定で持つ（data/baseTerrain.ts）
export type BaseBuildingKind = 'pipe' | 'mine' | 'library' | 'storage';

export interface BaseBuildingDef {
  heat: number; // 動いているときに使う熱。配管は暖房塔につながっているときに使う
  costs: number[];
}

export const baseBuildings: Record<BaseBuildingKind, BaseBuildingDef> = {
  pipe: { heat: 1, costs: [100] },
  mine: { heat: 2, costs: [500, 1000, 2000, 4000, 8000] },
  library: { heat: 2, costs: [800, 1500, 3000, 6000, 12000] },
  storage: { heat: 1, costs: [1000, 4000, 8000, 12000, 16000] },
};

export const MINE_RATES = [1, 1.1, 1.25, 1.4, 1.5]; // 採掘場と書庫の Lv ごとの生産量（1時間あたり）
export const LIBRARY_RATES = [50, 60, 70, 80, 90]; // 書庫の Lv ごとの生産量（1時間あたり）

// 貯蔵庫の Lv ごとの上限時間
export const STORAGE_HOURS = [12, 16, 20, 24, 28];

// 建物が自分の中に貯められる時間
export const SELF_STORAGE_HOURS = 4;

// 暖房塔からの距離ごとの資源のマスの採掘量の倍率
export const RESOURCE_GRADES = [1.0, 1.0, 1.0, 1.5];

// 採掘場と書庫で作れる物
export interface BaseOutputDef {
  itemId: string;
  unlockLevel: number; // 選べるようになる建物の Lv
  cost: number; // 1個作るのに要る生産量
}

// 採掘場で選べる素材（★1素材）
export const MINE_OUTPUTS: BaseOutputDef[] = [
  { itemId: 'iceCrystal', unlockLevel: 1, cost: 1 },
  { itemId: 'steelScrap', unlockLevel: 1, cost: 1 },
  { itemId: 'flint', unlockLevel: 1, cost: 1 },
  { itemId: 'brokenGear', unlockLevel: 1, cost: 1 },
  { itemId: 'beastFang', unlockLevel: 1, cost: 1 },
  { itemId: 'toughHide', unlockLevel: 1, cost: 1 },
  { itemId: 'herbBundle', unlockLevel: 1, cost: 1 },
  { itemId: 'magicDust', unlockLevel: 1, cost: 1 },
];

// 書庫で選べる訓練記録
export const LIBRARY_OUTPUTS: BaseOutputDef[] = [
  { itemId: 'trainingRecordSmall', unlockLevel: 1, cost: 50 },
  { itemId: 'trainingRecordMedium', unlockLevel: 3, cost: 140 },
];

export interface TowerLevelDef {
  heat: number; // 熱の出力
  storages: number; // 貯蔵庫の数の上限
  cost: number; // 前の Lv からこの Lv にする紙幣。Lv1 は 0
  clearedChapter?: number; // この章をクリアしていること
  rank?: number; // アカウントランクがこれ以上であること
}

// 暖房塔の Lv ごとの値
export const TOWER_LEVELS: TowerLevelDef[] = [
  { heat: 10, storages: 1, cost: 0 },
  { heat: 14, storages: 2, cost: 5000, clearedChapter: 1, rank: 5 },
  { heat: 18, storages: 2, cost: 15000, clearedChapter: 2, rank: 15 },
  { heat: 22, storages: 3, cost: 40000, clearedChapter: 3, rank: 25 },
];

// 基地に立たせられるキャラの数
export const BASE_MEMBERS = 3;
export const BASE_MEMBERS_AFTER_CHAPTER_1 = 4;

export interface BaseClassEffect {
  range: number; // 作業範囲（立っているマスからの距離）
  multiplier: number; // 速さの上昇に掛ける倍率
  warms: boolean; // 立っているマスとその隣を暖める
}

// クラスごとの基地での効果。キーは unitClasses の id
export const baseClassEffects: Record<string, BaseClassEffect> = {
  soldier: { range: 1, multiplier: 1.5, warms: false },
  archer: { range: 2, multiplier: 0.75, warms: false },
  mage: { range: 1, multiplier: 1.0, warms: true },
};
