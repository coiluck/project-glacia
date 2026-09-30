// キャラクターのマスターデータ（静的）と、プレイヤーの所持データ（可変）の型。
// 戦闘用の型（CharacterDef / SkillDef）は features/battle/types.ts 側にある。
import type { SkillDef } from '../../features/battle/types';

export type Rarity = 1 | 2 | 3; // ★の数

export interface Status {
  hp: number;
  attack: number;
  defense: number;
}

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
  // 効果の説明文の効果量は文中では {0} {1} … で空けておき、
  // features/characters/describe.ts が def.effect の同じ添字の値で埋める
  descriptionKey: string;
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
  topLineKey: string; // トップ画面で出すセリフ。i18n キー（characters.json）
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
