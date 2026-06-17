import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../router/paths'

// 起動時のロゴ画面。一定時間表示したのち、スタート画面へ自動遷移する。
const LOGO_DURATION = 2000

export default function BootPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(paths.start, { replace: true })
    }, LOGO_DURATION)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="boot-screen">
      <h1 className="boot-logo">GLACIA</h1>
    </div>
  )
}
