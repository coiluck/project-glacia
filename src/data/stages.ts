// 静的ゲームデータ（ステージ構成）の置き場。

export type StageStatus = 'cleared' | 'next' | 'locked'

export type ChapterStatus = 'current' | 'unlocked' | 'locked'

export interface Stage {
  id: string // ステージ番号
  x: number // マップ上の中心X（vh単位＝画面高さの%。100で画面高さ1つぶん）
  y: number // マップ上の中心Y（vh単位＝画面高さの%。0〜100）
  next?: string[] // 接続先ステージのid。末尾ノードは持たない
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
      { id: '1-1', x: 30, y: 62, next: ['1-2'] },
      { id: '1-2', x: 81, y: 43, next: ['1-3'] },
      { id: '1-3', x: 124, y: 78, next: ['1-4'] },
      { id: '1-4', x: 169, y: 54, next: ['1-5'] },
      { id: '1-5', x: 230, y: 70, next: ['1-6'] },
      { id: '1-6', x: 281, y: 40 },
    ],
  },
  { id: 2, name: 'Chapter 2', titleKey: '', stages: [] },
  { id: 3, name: 'Chapter 3', titleKey: '', stages: [] },
  { id: 4, name: 'Chapter 4', titleKey: '', stages: [] },
]
