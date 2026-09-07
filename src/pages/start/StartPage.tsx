import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../router/paths'
import { useTranslations } from '../../i18n'
import { hasToken } from '../../api/session'
import Screen from '../../layouts/Screen'
import StartActions from './StartActions'
import AccountPanel from './components/AccountPanel'
import LoginForm from './components/LoginForm'

const BOOTED_KEY = 'glacia:booted' // セッション中に起動フローを通過済みか（sessionStorage）

// 背景画像（BASE_URL 基準の相対パス）。Screen がビューポート全体に敷く。
const BACKGROUND = 'images/start/background.png'

export default function StartPage() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(hasToken)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  const t = useTranslations('start', {
    login: 'login',
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

  const title = (
    <div className="start-title-container">
      <img className="start-emblem" src={logoSrc} alt="" aria-hidden />
      <h1 className="start-logo">氷途</h1>
    </div>
  )

  if (!loggedIn) {
    return (
      <Screen
        background={BACKGROUND}
        viewport={
          <>
            <StartActions
              buttonText={t.login}
              onClick={() => setShowLoginForm(true)}
            />
            {showLoginForm && (
              <LoginForm
                onDone={() => setLoggedIn(true)}
                onClose={() => setShowLoginForm(false)}
              />
            )}
          </>
        }
      >
        <div className="start-screen fade-in" onClick={() => setShowLoginForm(true)}>
          {title}
          <p className="start-prompt">{t.needLogin}</p>
        </div>
      </Screen>
    )
  }

  return (
    <>
      <Screen
        background={BACKGROUND}
        viewport={
          <StartActions buttonText={t.manageAccount} onClick={() => setAccountOpen(true)} />
        }
      >
        <div className="start-screen start-tap fade-in" onClick={enterGame}>
          {title}
          <p className="start-prompt">{t.tapToStart}</p>
        </div>
      </Screen>

      {accountOpen && (
        <AccountPanel
          onClose={() => setAccountOpen(false)}
          onLoggedOut={() => {
            setAccountOpen(false)
            setLoggedIn(false)
          }}
        />
      )}
    </>
  )
}
