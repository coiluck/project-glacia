// 静的ゲームデータ（ステージ構成）の置き場。

export type StageStatus = 'cleared' | 'next' | 'locked'

export type ChapterStatus = 'current' | 'unlocked' | 'locked'

// クリア報酬
// ドロップは data/drops.ts
export interface StageReward {
  currency: number
  rankExp: number
}

export interface Stage {
  id: string // ステージ番号
  x: number // マップ上の中心X（vh単位＝画面高さの%。100で画面高さ1つぶん）
  y: number // マップ上の中心Y（vh単位＝画面高さの%。0〜100）
  next?: string[] // 接続先ステージのid。末尾ノードは持たない
  stamina: number // 消費スタミナ
  reward: StageReward
}

export interface Chapter {
  id: number
  name: string
  titleKey: string // useTranslationsで使うkey
  stages: Stage[]
}

export const chapters: Chapter[] = [
  {
    id: 1,
    name: 'Chapter 1',
    titleKey: 'chapter1title',
    stages: [
      { id: '1-1', x: 30, y: 62, next: ['1-2'], stamina: 8, reward: { currency: 300, rankExp: 20 } },
      { id: '1-2', x: 81, y: 43, next: ['1-3'], stamina: 8, reward: { currency: 350, rankExp: 22 } },
      { id: '1-3', x: 124, y: 78, next: ['1-4'], stamina: 10, reward: { currency: 400, rankExp: 26 } },
      { id: '1-4', x: 169, y: 54, next: ['1-5'], stamina: 10, reward: { currency: 450, rankExp: 28 } },
      { id: '1-5', x: 230, y: 70, stamina: 12, reward: { currency: 550, rankExp: 32 } },
    ],
  },
  {
    id: 2,
    name: 'Chapter 2',
    titleKey: 'chapter2title',
    stages: [
      { id: '2-1', x: 30, y: 62, next: ['2-2'], stamina: 15, reward: { currency: 500, rankExp: 35 } },
      { id: '2-2', x: 78, y: 40, next: ['2-3'], stamina: 15, reward: { currency: 550, rankExp: 37 } },
      { id: '2-3', x: 124, y: 74, next: ['2-4'], stamina: 16, reward: { currency: 600, rankExp: 40 } },
      { id: '2-4', x: 170, y: 48, next: ['2-5'], stamina: 16, reward: { currency: 650, rankExp: 42 } },
      { id: '2-5', x: 222, y: 70, next: ['2-6'], stamina: 18, reward: { currency: 700, rankExp: 45 } },
      { id: '2-6', x: 280, y: 50, stamina: 18, reward: { currency: 750, rankExp: 48 } },
    ],
  },
  {
    id: 3,
    name: 'Chapter 3',
    titleKey: 'chapter3title',
    stages: [
      { id: '3-1', x: 30, y: 60, next: ['3-2'], stamina: 18, reward: { currency: 750, rankExp: 50 } },
      { id: '3-2', x: 78, y: 40, next: ['3-3'], stamina: 18, reward: { currency: 800, rankExp: 52 } },
      { id: '3-3', x: 124, y: 76, next: ['3-4'], stamina: 20, reward: { currency: 850, rankExp: 55 } },
      { id: '3-4', x: 170, y: 50, next: ['3-5'], stamina: 20, reward: { currency: 900, rankExp: 58 } },
      { id: '3-5', x: 218, y: 72, next: ['3-6'], stamina: 22, reward: { currency: 950, rankExp: 60 } },
      { id: '3-6', x: 266, y: 44, next: ['3-7'], stamina: 22, reward: { currency: 1000, rankExp: 63 } },
      { id: '3-7', x: 326, y: 64, stamina: 24, reward: { currency: 1100, rankExp: 70 } },
    ],
  },
  {
    id: 4,
    name: 'Chapter 4',
    titleKey: '',
    stages: [],
  },
]

export function isStageUnlocked(stage: Stage, stages: Stage[], clearedIds: string[]): boolean {
  const prereqs = stages.filter((s) => s.next?.includes(stage.id))
  return prereqs.every((s) => clearedIds.includes(s.id))
}

// next を持たないステージを全部クリアしていれば章クリア
export function isChapterCleared(chapter: Chapter, clearedIds: string[]): boolean {
  return chapter.stages.filter((s) => !s.next?.length).every((s) => clearedIds.includes(s.id))
}
