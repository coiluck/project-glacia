// アプリ内の全ルートパスを集約。リンク・遷移はここを参照する（文字列直書き禁止）。
export const paths = {
  boot:    '/boot',      // 起動時のロゴ画面
  start:   '/start',     // スタート画面（タップ／初回ログイン）
  top:     '/',
  party:   '/party',     // 編成
  story:   '/story',     // ゲーム
  scenario: (scenarioId: string) => `/scenario/${scenarioId}`, // シナリオ
  battle:   (stageId:    string) => `/battle/${stageId}`, // ゲーム
  member:  '/member',    // 人員
  recruit: '/recruit',   // 召集
  base:    '/base',      // 基地
} as const
