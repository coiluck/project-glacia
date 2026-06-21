import { type ReactNode } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { paths } from '../../router/paths'
import '../../styles/components/resource-bar.css'
import MenuMap from './MenuMap'

const billIcon = (
  <span className="resource-bar-icon resource-bar-icon-bill">
    <span className="resource-bar-icon-bill-back" />
    <span className="resource-bar-icon-bill-front" />
  </span>
)

const gemIcon = (
  <span className="resource-bar-icon resource-bar-icon-gem">
    <span className="resource-bar-icon-gem-shape" />
  </span>
)

// 全画面共通の上部リソースバー
// TODO: D1のデータと接続する。
export default function ResourceBar() {
  const navigate = useNavigate()
  const isTopPage = useLocation().pathname === paths.top;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  const backButton = () => {
    setIsMenuOpen(false);
    navigate(-1);
  }

  // 閉じるアニメーションを再生してからアンマウントする
  const closeMenu = () => setIsMenuClosing(true);

  const handleMenuButton = () => {
    if (isMenuOpen && !isMenuClosing) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  }

  const handleMenuAnimationEnd = () => {
    if (isMenuClosing) {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
    }
  }

  // メニュー項目を選択: 閉じてから遷移する
  const handleMenuSelect = (to: string) => {
    closeMenu();
    navigate(to);
  }

  // リソースアイテム
  const resouceItem = (icon: ReactNode, text: string) => {
    return (
      <div className="resource-bar-resource-item">
        {icon}
        <span className="resource-bar-resource-item-value">{text}</span>
      </div>
    )
  }

  return (
    <header className="resource-bar-component-container">
      <div className="resource-bar-component-container-left">
        {!isTopPage &&
         <div className="resource-bar-move-container fade-in">
           <button className="resource-bar-move-button back-button" onClick={backButton}></button>
           <button className="resource-bar-move-button menu-button" onClick={handleMenuButton}></button>
         </div>
        }
      </div>
      <div className="resource-bar-component-container-right">
        {resouceItem(billIcon, '1111111111')}
        {resouceItem(gemIcon, '1000')}
      </div>

      {isMenuOpen && (
        <div
          className={`resource-bar-menu-overlay${isMenuClosing ? ' closing' : ''}`}
          onClick={closeMenu}
          onAnimationEnd={handleMenuAnimationEnd}
        >
          <div className="resource-bar-menu-container" onClick={(e) => e.stopPropagation()}>
            <div className="resource-bar-menu-icon">
              <MenuMap onSelect={handleMenuSelect} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
