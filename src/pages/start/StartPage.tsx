import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../router/paths'

// スタート画面。通常はタップするだけでHOMEへ進む。初回のみログイン（プレースホルダー）を表示する。
const BOOTED_KEY = 'glacia:booted' // セッション中に起動フローを通過済みか（sessionStorage）
const LOGGED_IN_KEY = 'glacia:loggedIn' // ログイン済みか＝初回かどうかの判定（localStorage）

export default function StartPage() {
  const navigate = useNavigate()
  // マウント時に一度だけ初回判定する（ログイン後は通常のタップ画面になる）。
  const [isFirstTime] = useState(() => !localStorage.getItem(LOGGED_IN_KEY))

  // HOMEへ入る。起動フロー通過済みフラグを立ててから遷移する。
  const enterGame = () => {
    sessionStorage.setItem(BOOTED_KEY, '1')
    navigate(paths.top, { replace: true })
  }

  // 初回ログイン。現状はプレースホルダーで、押すとログイン済み扱いにする。
  // TODO: 実際の認証処理に差し替える（認証基盤の導入後）。
  const handleLogin = () => {
    localStorage.setItem(LOGGED_IN_KEY, '1')
    enterGame()
  }

  if (isFirstTime) {
    return (
      <div className="start-screen">
        <h1 className="start-logo">GLACIA</h1>
        <div className="start-login">
          <p>はじめての方はログインしてください</p>
          <button type="button" onClick={handleLogin}>
            ログイン
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="start-screen start-tap" onClick={enterGame}>
      <h1 className="start-logo">GLACIA</h1>
      <p className="start-prompt">タップしてスタート</p>
    </div>
  )
}
