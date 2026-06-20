import { createContext, useContext, useEffect } from 'react'

// .screen-viewportの背景を切り替える関数。stateはScreenFrameで持つ
export const ViewportBgContext = createContext<(url: string | null) => void>(() => {})

// 古いページのアンマウント処理が新しいページの設定を上書きしないように
let generation = 0

// path は BASE_URL 基準の相対パス
export function useViewportBackground(path?: string | null) {
  const setBg = useContext(ViewportBgContext)
  useEffect(() => {
    const my = ++generation
    setBg(path ? `${import.meta.env.BASE_URL}${path}` : null)
    return () => {
      // 後続ページがすぐ別の背景を設定したらクリアしない
      // 進んでいなければ次が背景なしのページなのでここで消す
      requestAnimationFrame(() => {
        if (generation === my) setBg(null)
      })
    }
  }, [path, setBg])
}
