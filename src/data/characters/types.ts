// キャラクターのマスターデータ（静的）と、プレイヤーの所持データ（可変）の型。
// 戦闘用の型（CharacterDef / SkillDef）は features/battle/types.ts 側にある。
import type { SkillDef } from '../../features/battle/types';

export type Rarity = 1 | 2 | 3; // ★の数

export interface Status {
  hp: number;
  attack: number;
  defense: number;
}

// 凸（ガチャでかぶった時に重ねられる）の上限。上限解放とは別のシステム
export const MAX_DUPE = 5;

// スキルレベルの上限
export const MAX_SKILL_LEVEL = 7;

// レアリティごとのレベル上限
export const MAX_LEVEL: Record<Rarity, number> = {
  1: 40,
  2: 50,
  3: 60,
}

// このレベルを超えるには上限解放が必要
// レアリティごとの上限解放の回数 = この配列の長さ
export const LIMIT_BREAK_LEVELS: Record<Rarity, number[]> = {
  1: [30],
  2: [30],
  3: [30, 45],
}

// 次のレベルに上がるのに必要な経験値。レベル帯ごとに定義する（レアリティ共通）
// fromLevel 以上・次の要素の fromLevel 未満でいる間、1レベルぶんの必要経験値が exp
export const EXP_TO_NEXT_LEVEL: { fromLevel: number; exp: number }[] = [
  { fromLevel: 1, exp: 100 },
  { fromLevel: 6, exp: 250 },
  { fromLevel: 11, exp: 400 },
  { fromLevel: 16, exp: 575 },
  { fromLevel: 21, exp: 750 },
  { fromLevel: 26, exp: 950 },
  { fromLevel: 31, exp: 1200 },
  { fromLevel: 36, exp: 1500 },
  { fromLevel: 41, exp: 1800 },
  { fromLevel: 46, exp: 2100 },
  { fromLevel: 51, exp: 2400 },
]

// 強化に必要な素材。itemId は将来のアイテムデータへの参照
export interface MaterialCost {
  itemId: string;
  count: number;
}

// 1凸ぶんの効果。内容はキャラごとに定義する
export interface DupeBonus {
  status?: Partial<Status>; // ステータスへの加算
  skillApCost?: number; // スキルのAP消費への加算。-1 で1軽減
}

// キャラが持つスキル1つ分のデータ
export interface CharacterSkillMaster {
  def: SkillDef; // Lv1 時点の性能
  descriptionKey: string; // 効果の説明文の i18n キー
  // スキルレベル+1 あたりの上昇量。def.effect と同じ長さで、各効果の power / amount への加算量
  // 伸ばさない効果は 0
  effectGrowth: number[];
  // レベルアップに必要な素材。0番目が Lv1 -> 2、長さは MAX_SKILL_LEVEL - 1
  levelUpCosts: MaterialCost[][];
}

// キャラ1体の定義
export interface CharacterMaster {
  id: string;
  nameKey: string; // i18n キー（characters.json）
  profileKey: string; // 図鑑用の説明文
  rarity: Rarity;
  classId: string; // unitClasses への参照
  base: Status; // Lv1 のステータス
  growth: Status; // 1レベルごとの上昇量・Math.floorするので小数を入れていい
  skills: CharacterSkillMaster[]; // ★1は1つ、★2・★3は2つ。編成画面で1つ選ぶ
  // 上限解放に必要な素材。0番目が1回目、長さは LIMIT_BREAK_LEVELS[rarity].length
  limitBreakCosts: MaterialCost[][];
  dupeBonuses: DupeBonus[]; // 添字0が1凸目。長さは MAX_DUPE
}

// プレイヤーの所持データ
export interface UserCharacter {
  masterId: string; // CharacterMaster.id
  level: number;
  exp: number; // 現在レベル内での蓄積量。EXP_TO_NEXT_LEVEL に達したらレベルアップ
  limitBreak: number; // 済んだ上限解放の回数。0 〜 LIMIT_BREAK_LEVELS[rarity].length
  dupe: number; // 重ねた凸の数。0 〜 MAX_DUPE
  selectedSkillId: string; // 出撃時に使うスキル。CharacterMaster.skills のいずれかの def.id
  skillLevels: Record<string, number>; // スキルID → 1 〜 MAX_SKILL_LEVEL
}
