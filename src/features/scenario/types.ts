// 命令の型
export type BgDirection = 'leftToRight' | 'rightToLeft' | 'topToBottom' | 'bottomToTop';

export type StatefulCommand =
  | { type: 'bg'; file: string; transition?: 'fade' | 'crossfade' | 'none' }
  | { type: 'char'; id: string; pose: string; bounce?: boolean }
  | { type: 'charDelete'; id?: string };

export type TransientCommand =
  | { type: 'bgMove'; direction: BgDirection; duration: number }
  | { type: 'bgShake'; duration: number; intensity: number }
  | { type: 'wait'; ms: number }
  | { type: 'showNextChapter'; chapter: number; backgroundImage: string };

export type ScenarioCommand = StatefulCommand | TransientCommand;
export type CommandType = ScenarioCommand['type'];

// シナリオ
export type ScenarioLine = {
  text: string;
  speaker?: string;
  commands?: ScenarioCommand[];
  choiceId?: string;
};

/** 選択肢の表示条件。points[key] を value と比較する。 */
export type Condition = {
  key: string;
  op: '>=' | '<=' | '>' | '<' | '==' | '!=';
  value: number;
};

export type Choice = {
  buttonText: string;
  branch: ScenarioLine[];
  /** 分岐終了時にジャンプする別シナリオID。省略時は親フローへ戻る。 */
  next?: string;
  /** 選択時に points へ加算する {変数名: 増分}。 */
  points?: Record<string, number>;
  /** 全条件を満たすときだけ表示する。省略時は常に表示。 */
  showIf?: Condition[];
};

export type ScenarioFile = {
  id: string;
  lines: ScenarioLine[];
  choices?: Record<string, Choice[]>;
  next?: string;
};

// シーン状態
export type SceneSnapshot = {
  background: { file: string; transition: 'fade' | 'crossfade' | 'none' } | null;
  characters: ReadonlyArray<{ id: string; pose: string }>;
  text: string;
  speaker: string;
  // 現在の行の char 命令で指定されたキャラ id。char 命令が無い行では null
  faceId: string | null;
};

// 進行位置
export type BranchFrame = {
  scenarioId: string;
  choiceId: string;
  choiceIndex: number;
  lineIndex: number;
  /** この分岐を抜けるときにジャンプする別シナリオID (Choice.nextの引き継ぎ)。 */
  next?: string;
};

export type ProgressState = {
  scenarioId: string;
  lineIndex: number;
  branchStack: BranchFrame[];
};

// ゲーム全体
export type GameState = {
  progress: ProgressState;
  snapshot: SceneSnapshot;
  rootChapter: string;
  /** 選択肢で加算される好感度などの変数。{変数名: 値}。 */
  points: Record<string, number>;
  version: number; // セーブデータマイグレーション用
};