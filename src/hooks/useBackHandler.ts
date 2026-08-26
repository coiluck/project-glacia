// リソースバーの戻るボタンはuseBackHandlerがあればそれ、ないなら全画面共通でnavigate(-1)
import { useEffect, useRef } from 'react'

// 戻るを自前で処理したらtrue
export type BackHandler = () => boolean

let currentHandler: BackHandler | null = null

// ページ側で呼ぶ。アンマウントで登録は自動的に外れる
export function useBackHandler(handler: BackHandler) {
  const ref = useRef(handler)

  // 最新ハンドラを保持
  useEffect(() => {
    ref.current = handler
  })

  useEffect(() => {
    const registered: BackHandler = () => ref.current()
    currentHandler = registered
    return () => {
      // 次のページが先に登録していたら奪わない
      if (currentHandler === registered) currentHandler = null
    }
  }, [])
}

// ResourceBar 側で呼ぶ。ページが処理したら true
export function runBackHandler(): boolean {
  return currentHandler?.() ?? false
}
