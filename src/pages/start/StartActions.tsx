import { useState } from 'react'

interface StartActionsProps {
  buttonText: string
  onClick: () => void
}

// TODO: package.jsonのに変える
const APP_VERSION = 'ver 0.0.0'

export default function StartActions({ buttonText, onClick }: StartActionsProps) {
  const [languageOpen, setLanguageOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [creditOpen, setCreditOpen] = useState(false)

  return (
    <>
      <div className="start-actions-container">
        <div className="start-actions-container-left">
          <button type="button" className="start-actions-button" onClick={onClick}>
            {buttonText}
          </button>
        </div>

        <div className="start-actions-container-right">
          <button
            type="button"
            className="start-actions-link"
            onClick={() => setLanguageOpen(true)}
          >
            言語
          </button>
          <button
            type="button"
            className="start-actions-link"
            onClick={() => setCreditOpen(true)}
          >
            クレジット
          </button>
          <button
            type="button"
            className="start-actions-link"
            onClick={() => setTermsOpen(true)}
          >
            利用規約
          </button>
          <span className="start-actions-version">{APP_VERSION}</span>
        </div>
      </div>

      {/* 利用規約modal */}
      {termsOpen && (
        <div className="start-terms-overlay fade-in" onClick={() => setTermsOpen(false)}>
          <div className="start-terms-modal fade-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="start-terms-title">利用規約</h2>
            <p className="start-terms-text">（ここに利用規約のテキストが入ります）</p>
            <button
              type="button"
              className="start-terms-close"
              onClick={() => setTermsOpen(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  )
}
