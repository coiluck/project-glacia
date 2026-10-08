// 設定の選択肢
export const TEXT_SPEEDS = ['slow', 'normal', 'fast'] as const
export const TEXT_SIZES = ['small', 'normal', 'large'] as const
export const LANGS = ['ja', 'en'] as const

export type TextSpeed = (typeof TEXT_SPEEDS)[number]
export type TextSize = (typeof TEXT_SIZES)[number]
export type Lang = (typeof LANGS)[number]

// シナリオの1文字あたりの表示間隔（ms）
export const TEXT_SPEED_MS: Record<TextSpeed, number> = { slow: 35, normal: 19, fast: 8 }

// シナリオの本文の文字サイズ（px。設計解像度 1920x1080 基準）
export const TEXT_SIZE_PX: Record<TextSize, number> = { small: 28, normal: 32, large: 38 }
