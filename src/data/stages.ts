// 静的ゲームデータ（ステージ構成）の置き場。

export type StageStatus = 'cleared' | 'next' | 'locked'

export type ChapterStatus = 'current' | 'unlocked' | 'locked'

// クリア報酬。何度クリアしても同じ量が入る（初回ボーナスは未実装）
export interface StageReward {
  currency: number
  rankExp: number
  characterExp: number // 出撃した各キャラに入る
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
      { id: '1-1', x: 30, y: 62, next: ['1-2'], stamina: 8, reward: { currency: 300, rankExp: 20, characterExp: 120 } },
      { id: '1-2', x: 81, y: 43, next: ['1-3'], stamina: 8, reward: { currency: 340, rankExp: 22, characterExp: 140 } },
      { id: '1-3', x: 124, y: 78, next: ['1-4'], stamina: 10, reward: { currency: 420, rankExp: 26, characterExp: 180 } },
      { id: '1-4', x: 169, y: 54, next: ['1-5'], stamina: 10, reward: { currency: 480, rankExp: 28, characterExp: 200 } },
      { id: '1-5', x: 230, y: 70, next: ['1-6'], stamina: 12, reward: { currency: 560, rankExp: 32, characterExp: 240 } },
      { id: '1-6', x: 281, y: 40, stamina: 15, reward: { currency: 800, rankExp: 45, characterExp: 340 } },
    ],
  },
  { id: 2, name: 'Chapter 2', titleKey: '', stages: [] },
  { id: 3, name: 'Chapter 3', titleKey: '', stages: [] },
  { id: 4, name: 'Chapter 4', titleKey: '', stages: [] },
]
