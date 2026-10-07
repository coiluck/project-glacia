// お知らせ。新しいものを先頭に足す。
// 本文は public/json/i18n/<lang>/news.json の `<id>.title` / `<id>.body`
export type NewsCategory = 'maintenance' | 'event' | 'bug' | 'info'

export interface NewsEntry {
  id: string
  category: NewsCategory
  date: string // YYYY-MM-DD
}

export const news: NewsEntry[] = [
  { id: 'playtest', category: 'info', date: '2026-10-07' },
]
