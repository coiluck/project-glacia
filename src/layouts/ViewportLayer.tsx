import { useContext, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ScreenViewportContext } from './ScreenFrame'

// 子要素をセーフエリア外へ出す
export default function ViewportLayer({ children }: { children: ReactNode }) {
  const el = useContext(ScreenViewportContext)
  if (!el) return null
  return createPortal(children, el)
}
