import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../router/paths'
import { useTranslations } from '../../i18n'
import Screen from '../../layouts/Screen'
import StartActions from './StartActions'

// スタート画面。通常はタップするだけでHOMEへ進む。初回のみログイン（プレースホルダー）を表示する。
const BOOTED_KEY = 'glacia:booted' // セッション中に起動フローを通過済みか（sessionStorage）
const LOGGED_IN_KEY = 'glacia:loggedIn' // ログイン済みか＝初回かどうかの判定（localStorage）

// 背景画像（BASE_URL 基準の相対パス）。Screen がビューポート全体に敷く。
const BACKGROUND = 'images/start/background.png'

export default function StartPage() {
  const navigate = useNavigate()
  // 初回判定
  const [isFirstTime] = useState(() => !localStorage.getItem(LOGGED_IN_KEY))

  const t = useTranslations('start', {
    needLogin: 'needLogin',
    manageAccount: 'manageAccount',
    tapToStart: 'tapToStart',
  })

  const logoSrc = `${import.meta.env.BASE_URL}images/start/logo.svg`

  // 起動フロー通過済みフラグ
  const enterGame = () => {
    sessionStorage.setItem(BOOTED_KEY, '1')
    navigate(paths.top, { replace: true })
  }

  // 初回ログイン
  // TODO: 認証処理
  const handleLogin = () => {
    localStorage.setItem(LOGGED_IN_KEY, '1')
  }

  if (isFirstTime) {
    return (
      <Screen background={BACKGROUND}>
        <div className="start-screen fade-in" onClick={handleLogin}>
          <div className="start-title-container">
            <img className="start-emblem" src={logoSrc} alt="" aria-hidden />
            <h1 className="start-logo">氷途</h1>
          </div>
          <p className="start-prompt">{t.needLogin}</p>
        </div>
      </Screen>
    )
  }

  return (
    <Screen
      background={BACKGROUND}
      viewport={<StartActions buttonText={t.manageAccount} onClick={handleLogin} />}
    >
      <div className="start-screen start-tap fade-in" onClick={enterGame}>
        <div className="start-title-container">
          <img className="start-emblem" src={logoSrc} alt="" aria-hidden />
          <h1 className="start-logo">氷途</h1>
        </div>
        <p className="start-prompt">{t.tapToStart}</p>
      </div>
    </Screen>
  )
}
