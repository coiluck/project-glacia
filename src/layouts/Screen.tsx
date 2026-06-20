import { useContext, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ScreenViewportContext } from './ScreenFrame'
import { useViewportBackground } from './useViewportBackground'

// ページの3レイヤーを受け取る
// - background: ビューポート全体に敷く背景（BASE_URL 基準の相対パス）
// - viewport: ビューポート端に貼り付く層（セーフエリア外＝実画面の端に固定）
// - children: セーフエリア内のメインUI
type ScreenProps = {
  background?: string | null
  viewport?: ReactNode
  children?: ReactNode
}

export default function Screen({ background, viewport, children }: ScreenProps) {
  useViewportBackground(background ?? null)

  // viewport層は.screen-viewportへPortalする。
  const viewportEl = useContext(ScreenViewportContext)

  return (
    <>
      {children}
      {viewport && viewportEl && createPortal(viewport, viewportEl)}
    </>
  )
}
