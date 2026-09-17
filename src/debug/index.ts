// 開発用チート
import { apiGet, apiPost } from '../api/client'
import { distribute } from '../api/sync'
import type { CommandResponse, MeResponse, UserRow } from '../api/types'
import { addItems } from '../features/inventory/inventory'

const SNAPSHOT_KEY = 'glacia:snapshot'

const fetchMe = () => apiGet<MeResponse>('/me')

async function overwrite(me: MeResponse): Promise<MeResponse> {
  const res = await apiPost<CommandResponse<null>>('/debug/set', me)
  distribute(res.me)
  return res.me
}

const glacia = {
  // アイテムを足す
  // window.glacia.give('skillBookSmall', 9)
  async give(itemId: string, count = 1) {
    const me = await fetchMe()
    return overwrite({
      ...me,
      user: { ...me.user, items: addItems(me.user.items, [{ itemId, count }]) },
    })
  },

  // user の任意のフィールドを上書き
  // window.glacia.set({ currency: 99999, stamina: 100 })
  async set(patch: Partial<UserRow>) {
    const me = await fetchMe()
    return overwrite({ ...me, user: { ...me.user, ...patch } })
  },

  // 今の状態を localStorage に覚える
  // window.glacia.snapshot()
  async snapshot() {
    const me = await fetchMe()
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(me))
    return me
  },

  // 覚えた状態に戻す
  // window.glacia.restore()
  async restore() {
    const raw = localStorage.getItem(SNAPSHOT_KEY)
    if (!raw) throw new Error('snapshot が無い。先に glacia.snapshot() を呼ぶ')
    return overwrite(JSON.parse(raw) as MeResponse)
  },
}

Object.assign(window, { glacia })
