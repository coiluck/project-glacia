import { useEffect, type ReactNode } from 'react'
import { SCREEN } from '../config/screen'

// 画面フレームを拡大縮小
export default function ScreenFrame({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--design-w', `${SCREEN.designWidth}px`)
    root.style.setProperty('--design-h', `${SCREEN.designHeight}px`)

    // セーフエリア全体が収まる拡大率。短辺側に合わせる。
    const applyScale = () => {
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
    <div className="screen-viewport">
      <div className="screen-safe">{children}</div>
    </div>
  )
}
