import { useEffect, useEffectEvent } from 'react'

// 開いている間に、内側でない所を押したら閉じる
// isInside は押された要素が閉じなくてよい所か。開くきっかけになった要素もここに含める
export function useOutsideClick(open: boolean, isInside: (target: Element) => boolean, onClose: () => void) {
  const onClick = useEffectEvent((e: MouseEvent) => {
    const target = e.target
    // 押した直後に描き直しで消えた要素は、どこだったか分からないので閉じない
    if (!(target instanceof Element) || !target.isConnected || isInside(target)) return
    onClose()
  })

  useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent) => onClick(e)
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [open])
}
