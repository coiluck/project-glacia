import { useState, type FormEvent } from 'react'
import { login, register } from '../../../api/actions/auth'
import {
  AUTH_ERROR,
  NAME_MAX,
  NAME_MIN,
  PASSWORD_MAX,
  PASSWORD_MIN,
} from '../../../features/auth/auth'
import { useTranslations } from '../../../i18n'

type Mode = 'login' | 'register'

// 文言の {0} {1} … を数値で埋める
const fill = (template: string, ...values: number[]) =>
  template.replace(/\{(\d+)\}/g, (match, index: string) => String(values[Number(index)] ?? match))

interface LoginFormProps {
  onDone: () => void
  onClose: () => void
}

// ログイン／新規登録。ログインのユーザー名欄には引き継ぎコードも入れられる
export default function LoginForm({ onDone, onClose }: LoginFormProps) {
  const t = useTranslations('start', {
    login: 'login',
    register: 'register',
    name: 'name',
    nameOrCode: 'nameOrCode',
    password: 'password',
    toRegister: 'toRegister',
    toLogin: 'toLogin',
    errorNameLength: 'errorNameLength',
    errorPasswordLength: 'errorPasswordLength',
    errorNameTaken: 'errorNameTaken',
    errorBadCredentials: 'errorBadCredentials',
    errorUnknown: 'errorUnknown',
  })

  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  // サーバーが返したエラーコード。表示直前に文言へ変換する
  const [errorCode, setErrorCode] = useState<string | null>(null)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (pending) return

    setPending(true)
    setErrorCode(null)
    try {
      await (mode === 'login' ? login(name, password) : register(name, password))
      onDone()
    } catch (e) {
      setErrorCode(e instanceof Error ? e.message : '')
    } finally {
      setPending(false)
    }
  }

  // 知らないコード（通信断やサーバーエラー）はまとめて通信失敗にする
  const errorText = (code: string) => {
    switch (code) {
      case AUTH_ERROR.nameLength:
        return fill(t.errorNameLength, NAME_MIN, NAME_MAX)
      case AUTH_ERROR.passwordLength:
        return fill(t.errorPasswordLength, PASSWORD_MIN, PASSWORD_MAX)
      case AUTH_ERROR.nameTaken:
        return t.errorNameTaken
      case AUTH_ERROR.badCredentials:
        return t.errorBadCredentials
      default:
        return t.errorUnknown
    }
  }

  // 他のmodalと同じく、外側をクリックしたら閉じる
  return (
    <div className="start-actions-overlay fade-in" onClick={onClose}>
      <form className="start-login" onSubmit={submit} onClick={(e) => e.stopPropagation()}>
        <label className="start-login-field">
          <span>{mode === 'login' ? t.nameOrCode : t.name}</span>
          <input
            type="text"
            value={name}
            autoComplete="username"
            maxLength={mode === 'register' ? NAME_MAX : undefined}
            minLength={mode === 'register' ? NAME_MIN : undefined}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="start-login-field">
          <span>{t.password}</span>
          <input
            type="password"
            value={password}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            maxLength={PASSWORD_MAX}
            minLength={mode === 'register' ? PASSWORD_MIN : undefined}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {errorCode !== null && <p className="start-login-error">{errorText(errorCode)}</p>}

        <button type="submit" className="start-login-submit" disabled={pending}>
          {mode === 'login' ? t.login : t.register}
        </button>

        <button
          type="button"
          className="start-login-switch"
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login')
            setErrorCode(null)
          }}
        >
          {mode === 'login' ? t.toRegister : t.toLogin}
        </button>
      </form>
    </div>
  )
}
