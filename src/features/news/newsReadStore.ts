import { create } from 'zustand'
import { news } from '../../data/news'

// お知らせの既読は localStorage にだけ持つ
const STORAGE_KEY = 'glacia:newsRead'

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

interface NewsReadState {
  readIds: string[]
  markRead: (id: string) => void
}

export const useNewsReadStore = create<NewsReadState>((set, get) => ({
  readIds: load(),
  markRead: (id) => {
    if (get().readIds.includes(id)) return
    // 消えたお知らせの id は持ち越さない
    const readIds = [...get().readIds, id].filter((r) => news.some((n) => n.id === r))
    set({ readIds })
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readIds))
    } catch {
      // 保存できなくても表示は続ける
    }
  },
}))

export function useUnreadNewsCount(): number {
  const readIds = useNewsReadStore((s) => s.readIds)
  return news.filter((n) => !readIds.includes(n.id)).length
}
