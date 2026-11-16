import { useState } from 'react'
import type { ReactNode } from 'react'
import ViewportLayer from '../../../layouts/ViewportLayer'

interface CommandBarProps {
  open: boolean // パネルを出すか。ターン操作は open に関係なく見えている
  controls: ReactNode // ターン操作（味方のターン）か配置ドック（配置フェーズ）
  children: ReactNode // 選択中ユニットのパネルの中身
}

export default function CommandBar({ open, controls, children }: CommandBarProps) {
  const [kept, setKept] = useState(children)
  if (open && children !== kept) setKept(children)

  return (
    <ViewportLayer>
      <div className={`battle-command${open ? ' is-open' : ''}`}>
        <div className="battle-command-bg" />
        <div className="battle-command-safe">
          {controls && <div className="battle-command-controls">{controls}</div>}
          <div className="battle-command-panel">{open ? children : kept}</div>
        </div>
      </div>
    </ViewportLayer>
  )
}
