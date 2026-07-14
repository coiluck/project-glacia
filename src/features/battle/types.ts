import type { Axial, AttackShape } from './hex';

// 攻撃で選べる対象ユニット数。'infinity' は範囲内の全ユニット
export type TargetCount = number | 'infinity';

// 具体的な兵科の一覧は data/ 側で定義する。
export interface UnitClassDef {
  id: string;
  nameKey: string; // i18n キー
  attackRange: AttackShape; // 通常攻撃の届く範囲（半径型 or 形指定型）
  attackPower: number; // 通常攻撃の威力
  attackTargets: TargetCount; // 通常攻撃で選べる対象数
  attackCost: number; // 通常攻撃のAP消費
  apPerTurn: number; // 毎ターン配り直される個人AP
}

// スキル効果
// いろいろなスキル効果があると思うのでこれらを組み合わせて定義する
// なるべく固有のスキル効果を定義しない
export type SkillEffect =
  | { type: 'damage'; power: number; shape: AttackShape; target: 'self' | 'ally' | 'enemy'; targets: TargetCount }
  | { type: 'healHp'; amount: number }
  | { type: 'grantAp'; amount: number };

export interface SkillDef {
  id: string;
  nameKey: string; // i18n キー
  apCost: number; // 使用者の個人APとパーティAPの両方からこの値を消費する
  range: number; // 射程（HEX距離）・0 は自分対象
  effect: SkillEffect[];
}

// 敵のスキル使用ルール（AI用）
export interface EnemySkillUse {
  def: SkillDef;
  everyNTurns?: number; // nターンに1度使う
  hpTriggers?: number[]; // HPがこの%以下になったら使う（再発させないために消してく）
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
  defense: number;
  ap: number; // このターンの残り個人AP
  skill?: SkillDef; // 本来は3つのスキルがあるが、編成画面で1つに選ぶ・敵はないかも
  // 敵AI用のスキル使用ルールと発動記録。味方は持たない
  skillEveryNTurns?: number; // EnemySkillUse.everyNTurns のコピー
  skillHpTriggers?: number[]; // 未発動のしきい値（%）。発動したら取り除く
  lastSkillTurn?: number; // 最後にスキルを使ったターン
}

// ステージの静的データ

// data/ 側でステージごとに定義する戦闘マップ
export interface BattleStageData {
  tiles: Axial[]; // マップの形（存在するタイルの座標一覧）
  deployableTiles: Axial[]; // 味方を初期配置できるタイル（tilesの部分集合）
  partyApPerTurn: number; // 毎ターン配り直されるパーティ全体AP
  enemies: EnemySpawn[]; // 初期配置の敵
}

// data/ 側で定義する味方キャラ1人の定義。編成画面や戦闘開始時の Unit 生成が参照する
export interface CharacterDef {
  id: string;
  nameKey: string; // i18n キー
  classId: string; // UnitClassDef への参照
  attack: number;
  defense: number;
  hp: number;
  maxHp: number;
  skills: SkillDef[]; // 3つ持ち、編成画面で1つ選ぶ
}

// data/ 側で定義する敵1種の定義
export interface EnemyDef {
  id: string; // EnemySpawn の enemyId と一致
  nameKey: string; // i18n キー
  classId: string; // 敵も兵科を持つ
  attack: number;
  defense: number;
  hp: number;
  maxHp: number;
  skill?: EnemySkillUse; // スキルを使わない敵は持たない
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
