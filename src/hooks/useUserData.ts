// ログイン済みなのにストアが空の時にユーザーデータをfetch
import { useEffect, useState } from 'react'
import { hasToken } from '../api/session'
import { syncUserData } from '../api/sync'
import { useAccountStore } from '../stores/accountStore'

// 描画してよければ true
export function useUserData(): boolean {
  const hydrated = useAccountStore((s) => s.id !== null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (hydrated || !hasToken()) return
    syncUserData().catch((e) => {
      console.error(e)
      setFailed(true)
    })
  }, [hydrated])

  return hydrated || !hasToken() || failed
}
