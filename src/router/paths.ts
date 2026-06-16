// アプリ内の全ルートパスを集約。リンク・遷移はここを参照する（文字列直書き禁止）。
export const paths = {
  top: '/',
  party: '/party', // 編成
  story: '/story', // ゲーム（シナリオ：ステージマップ）
  battle: (stageId: string) => `/battle/${stageId}`, // ゲーム（HEXタイル：戦闘）
  member: '/member', // 人員
  recruit: '/recruit', // 召集
  base: '/base', // 基地
} as const
