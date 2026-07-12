import type { Axial } from './hex';

// 具体的な兵科の一覧は data/ 側で定義する。
export interface UnitClassDef {
  id: string;
  nameKey: string; // i18n キー
  attackRange: number; // 通常攻撃の射程（HEX距離）
  attackCost: number; // 通常攻撃のAP消費
  apPerTurn: number; // 毎ターン配り直される個人AP
}

// スキル効果
// いろいろなスキル効果があると思うのでこれらを組み合わせて定義する
// なるべく固有のスキル効果を定義しない
export type SkillEffect =
  | { type: 'damage'; power: number; attackRangeType: string; target: 'self' | 'ally' | 'enemy'; }
  | { type: 'healHp'; amount: number }
  | { type: 'grantAp'; amount: number };

export interface SkillDef {
  id: string;
  nameKey: string; // i18n キー
  apCost: number; // 使用者の個人APとパーティAPの両方からこの値を消費する
  range: number; // 射程（HEX距離）・0 は自分対象
  effect: SkillEffect[];
}

// ユニット
export type Side = 'ally' | 'enemy';

// 盤面に配置された1体分の可変状態。data/ から戦闘開始時に生成
export interface Unit {
  id: string; // 盤面内で一意
  side: Side;
  classId: string; // UnitClassDef への参照
  pos: Axial;
  hp: number;
  maxHp: number;
  attack: number;
  ap: number; // このターンの残り個人AP
  skill?: SkillDef; // 本来は3つのスキルがあるが、編成画面で1つに選ぶ・敵はないかも
}

// ステージの静的データ

// data/ 側でステージごとに定義する戦闘マップ
export interface BattleStageData {
  tiles: Axial[]; // マップの形（存在するタイルの座標一覧）
  deployableTiles: Axial[]; // 味方を初期配置できるタイル（tilesの部分集合）
  partyApPerTurn: number; // 毎ターン配り直されるパーティ全体AP
  enemies: EnemySpawn[]; // 初期配置の敵
}

// data/ 側で定義する敵1種の定義(EnemySpawn の enemyId が指す先)
export interface EnemyDef {
  id: string;
  nameKey: string;
  classId: string; // 敵も兵科を持つ
  attack: number;
  hp: number;
  maxHp: number;
  skill?: SkillDef;
}

export interface EnemySpawn {
  enemyId: string; // data/ 側で定義された敵の ID
  pos: Axial; // 配置座標
}

// 戦闘の進行状態

export type BattlePhase =
  | 'deployment' // 戦闘開始前の味方配置
  | 'player' // 味方の手番
  | 'enemy' // 敵の手番
  | 'victory'
  | 'defeat';

// 進行中の戦闘全体の状態
export interface BattleState {
  phase: BattlePhase;
  turn: number; // 1始まりのターン数
  partyAp: number; // このターンの残りパーティAP
  units: Unit[];
}
