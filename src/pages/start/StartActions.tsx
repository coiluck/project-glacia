import { useRef, useState } from 'react'
import { useTranslations } from '../../i18n'
import credits from './credit.md?raw'
import terms from './terms.md?raw'

interface StartActionsProps {
  buttonText: string
  onClick: () => void
}

// package.json の version（vite の define 経由でビルド時に埋め込まれる）
const APP_VERSION = `ver ${__APP_VERSION__}`

const LANGS = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
] as const

export default function StartActions({ buttonText, onClick }: StartActionsProps) {
  const [languageOpen, setLanguageOpen] = useState(false)
  const [creditOpen, setCreditOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  // 表示のみの選択状態（実際の言語切り替えは未実装）
  const [selectedLang, setSelectedLang] = useState<typeof LANGS[number]['code']>('ja')
  const langBtnRef = useRef<HTMLButtonElement>(null)
  const [langPos, setLangPos] = useState({ left: 0, bottom: 0 })

  const toggleLanguage = () => {
    if (!languageOpen && langBtnRef.current) {
      const r = langBtnRef.current.getBoundingClientRect()
      setLangPos({ left: r.left + r.width / 2, bottom: window.innerHeight - r.top + 8 })
    }
    setLanguageOpen((v) => !v)
  }

  const t = useTranslations('start', {
    language: 'language',
    credit: 'credit',
    terms: 'terms',
  })
  const c = useTranslations('common', {
    close: 'close',
  })

  return (
    <>
      <div className="start-actions-container">
        <div className="start-actions-container-left">
          {onClick && (
            <button type="button" className="start-actions-button" onClick={onClick}>
              {buttonText}
            </button>
          )}
        </div>

        <div className="start-actions-container-right">
          <button
            ref={langBtnRef}
            type="button"
            className="start-actions-link"
            onClick={toggleLanguage}
          >
            {t.language}
          </button>
          <button
            type="button"
            className="start-actions-link"
            onClick={() => setCreditOpen(true)}
          >
            {t.credit}
          </button>
          <button
            type="button"
            className="start-actions-link"
            onClick={() => setTermsOpen(true)}
          >
            {t.terms}
          </button>
          <span className="start-actions-version">{APP_VERSION}</span>
        </div>
      </div>

      {/* 言語選択ポップオーバー */}
      {languageOpen && (
        <div className="start-actions-lang-overlay" onClick={() => setLanguageOpen(false)}>
          <div
            className="start-actions-lang-popover fade-in"
            style={{ left: langPos.left, bottom: langPos.bottom }}
            onClick={(e) => e.stopPropagation()}
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                className="start-actions-lang-option"
                onClick={() => {
                  console.log('change language:', l.code)
                  setSelectedLang(l.code)
                  setLanguageOpen(false)
                }}
              >
                <span className="start-actions-lang-check">
                  {selectedLang === l.code ? '✓' : ''}
                </span>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* クレジットmodal */}
      {creditOpen && (
        <div className="start-actions-overlay fade-in" onClick={() => setCreditOpen(false)}>
          <div className="start-actions-modal fade-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="start-actions-title">{t.credit}</h2>
            <div className="start-actions-text" style={{ whiteSpace: 'pre-wrap' }}>
              {credits}
            </div>
            <button
              type="button"
              className="start-actions-close"
              onClick={() => setCreditOpen(false)}
            >
              {c.close}
            </button>
          </div>
        </div>
      )}

      {/* 利用規約modal */}
      {termsOpen && (
        <div className="start-actions-overlay fade-in" onClick={() => setTermsOpen(false)}>
          <div className="start-actions-modal fade-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="start-actions-title">{t.terms}</h2>
            <div className="start-actions-text" style={{ whiteSpace: 'pre-wrap' }}>
              {terms}
            </div>
            <button
              type="button"
              className="start-actions-close"
              onClick={() => setTermsOpen(false)}
            >
              {c.close}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
