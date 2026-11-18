// 設定の選択肢
// 遅い方から速い方へ。設定画面のスライダーはこの並びのまま左から右へ並ぶ。
// 保存済みの 'slow' / 'normal' / 'fast' はそのまま有効（'slow' だけ 35ms から 30ms に変わった）
export const TEXT_SPEEDS = ['slowest', 'slower', 'slow', 'normal', 'fast'] as const
export const AUTO_SPEEDS = ['slowest', 'slow', 'normal', 'fast', 'fastest'] as const
export const TEXT_SIZES = ['small', 'normal', 'large'] as const
export const LANGS = ['ja', 'en'] as const

export type TextSpeed = (typeof TEXT_SPEEDS)[number]
export type AutoSpeed = (typeof AUTO_SPEEDS)[number]
export type TextSize = (typeof TEXT_SIZES)[number]
export type Lang = (typeof LANGS)[number]

// シナリオの1文字あたりの表示間隔（ms）
export const TEXT_SPEED_MS: Record<TextSpeed, number> = { slowest: 52, slower: 41, slow: 30, normal: 19, fast: 8 }

// オートで、本文を出し終えてから次の行へ進むまでの待ち（ms）。base + 文字数 × per
export const AUTO_WAIT: Record<AutoSpeed, { base: number; per: number }> = {
  slowest: { base: 900, per: 70 },
  slow: { base: 700, per: 55 },
  normal: { base: 500, per: 40 },
  fast: { base: 350, per: 28 },
  fastest: { base: 250, per: 18 },
}
export const autoWaitMs = (speed: AutoSpeed, length: number) => AUTO_WAIT[speed].base + length * AUTO_WAIT[speed].per

// シナリオの本文の文字サイズ（px。設計解像度 1920x1080 基準）
export const TEXT_SIZE_PX: Record<TextSize, number> = { small: 28, normal: 32, large: 38 }
