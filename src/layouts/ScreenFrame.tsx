import { createContext, useEffect, useState, type ReactNode } from 'react'
import { SCREEN } from '../config/screen'
import { ViewportBgContext } from './useViewportBackground'

// .screen-viewport
export const ScreenViewportContext = createContext<HTMLDivElement | null>(null)

// 画面フレームを拡大縮小
export default function ScreenFrame({ children }: { children: ReactNode }) {
  // 全画面背景の現在URL（null=背景なし）。useViewportBackgroundから更新される。
  const [bg, setBg] = useState<string | null>(null)
  // .screen-viewportの実DOM
  const [viewportEl, setViewportEl] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--design-w', `${SCREEN.designWidth}px`)
    root.style.setProperty('--design-h', `${SCREEN.designHeight}px`)

    // セーフエリア全体が収まる拡大率
    const applyScale = () => {
      // 短辺側に合わせる
      const scale = Math.min(
        window.innerWidth / SCREEN.designWidth,
        window.innerHeight / SCREEN.designHeight,
      )
      root.style.setProperty('--scale', String(scale))
    }

    applyScale()
    window.addEventListener('resize', applyScale)
    return () => window.removeEventListener('resize', applyScale)
  }, [])

  return (
    <ViewportBgContext.Provider value={setBg}>
      <ScreenViewportContext.Provider value={viewportEl}>
        <div ref={setViewportEl} className={`screen-viewport${bg ? ' has-bg' : ''}`}>
          {/* 別の背景に変わったときだけfade-in */}
          {bg && (
            <div
              key={bg}
              className="viewport-bg fade-in"
              style={{ backgroundImage: `url('${bg}')` }}
            />
          )}
          <div className="screen-safe">{children}</div>
        </div>
      </ScreenViewportContext.Provider>
    </ViewportBgContext.Provider>
  )
}
