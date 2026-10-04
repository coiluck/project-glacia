import { useEffect, useRef } from 'react'
import { SCREEN } from '../../../config/screen'

const W = SCREEN.designWidth
const H = SCREEN.designHeight
const COUNT = 160

// 降る雪
export default function BaseSnow() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    const flakes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.8 + Math.random() * 2.4, // 半径
      vy: 18 + Math.random() * 38, // 落ちる速さ（px/秒）
      sway: Math.random() * Math.PI * 2, // 横揺れの位相
      alpha: 0.25 + Math.random() * 0.55,
    }))

    let last = performance.now()
    let frame = 0
    const draw = (now: number) => {
      // 裏に回っていたタブから戻ったときに一気に進まないようにする
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#e8f2ff'
      for (const f of flakes) {
        f.y += f.vy * dt
        f.sway += dt * 0.8
        f.x += (Math.sin(f.sway) * 12 - 6) * dt
        if (f.y > H + 10) {
          f.y = -10
          f.x = Math.random() * W
        }
        if (f.x < -10) f.x = W + 10
        ctx.globalAlpha = f.alpha
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [])

  return <canvas ref={ref} className="base-snow" width={W} height={H} aria-hidden />
}
