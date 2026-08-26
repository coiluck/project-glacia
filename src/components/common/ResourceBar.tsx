import { type ReactNode } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { paths } from '../../router/paths'
import { runBackHandler } from '../../hooks/useBackHandler'
import { useResourceStore } from '../../stores/resourceStore'
import { useRankStore } from '../../stores/rankStore'
import { formatCompact } from '../../utils/format'
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
export default function ResourceBar() {
  const navigate = useNavigate()
  const currency = useResourceStore((s) => s.currency)
  const gems = useResourceStore((s) => s.gems)
  const isTopPage = useLocation().pathname === paths.top;
  const rank = useRankStore((s) => s.rank)
  const expInRank = useRankStore((s) => s.expInRank)
  const expToNext = useRankStore((s) => s.expToNext)
  const expProgress = expToNext > 0 ? Math.min(1, expInRank / expToNext) : 0
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  const backButton = () => {
    setIsMenuOpen(false);
    // ページが戻りを自前で処理したなら履歴は動かさない
    if (runBackHandler()) return;
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
    <header className="resource-bar-component-container" style={isTopPage ? { paddingLeft: '0' } : undefined}>
      <div className="resource-bar-component-container-left">
        {!isTopPage ?
         <div className="resource-bar-move-container fade-in">
           <button className="resource-bar-move-button back-button" onClick={backButton}></button>
           <button className="resource-bar-move-button menu-button" onClick={handleMenuButton}></button>
         </div>
         :
         <div className="resource-bar-user-container fade-in">
           {/* ビットマップ.svg をインライン展開し、rank/exp を差し込む */}
           <svg
             className="resource-bar-user-svg"
             viewBox="0 0 400 99.49749"
             xmlns="http://www.w3.org/2000/svg"
           >
             {/* 経験値バー */}
             <defs>
               <linearGradient id="resource-bar-exp-grad" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0" stopColor="#fff6a0" />
                 <stop offset="0.5" stopColor="rgb(238, 144, 21)" />
                 <stop offset="1" stopColor="rgb(241, 228, 33)" />
               </linearGradient>
             </defs>
             {/* 背景パネル */}
             <path fill="#060827" fillOpacity={0.386792} d="M 0,0 V 70 H 320 L 400,0 Z" />
             {/* ユーザーアイコン枠（画像未実装） */}
             <rect fill="#060827" width={70} height={70} x={35.355347} y={-34.644653} transform="rotate(45)" />
             {/* 経験値バーの下地 */}
             <path fill="#060827" d="m 90,32 6,6 h 224 v -6 z" />
             {/* 経験値バー */}
             <clipPath id="resource-bar-exp-clip">
               <path d="m 90,32 6,6 h 224 v -6 z" />
             </clipPath>
             <rect
               className="resource-bar-user-exp-fill"
               fill="url(#resource-bar-exp-grad)"
               clipPath="url(#resource-bar-exp-clip)"
               x={90}
               y={32}
               height={6}
               width={230 * expProgress}
             />
             {/* RANK ラベル */}
             <text x={115.71895} y={25.794933} textAnchor="middle" fontFamily="HakkouMincho" fontWeight={600} fontSize={18} fill="#ccc">RANK</text>
             {/* ランク値 */}
             <text x={155} y={27.586248} textAnchor="start" fontFamily="HakkouMincho" fontWeight={600} fontSize={30} fill="#fff">{String(rank).padStart(2, '0')}</text>
             {/* 経験値テキスト */}
             <text x={320} y={58.396862} textAnchor="end" fontFamily="HakkouMincho" fontWeight={600} fontSize={18} fill="#ccc">EXP {expInRank} / {expToNext}</text>
           </svg>
         </div>
        }
      </div>
      <div className="resource-bar-component-container-right">
        {resouceItem(billIcon, formatCompact(currency))}
        {resouceItem(gemIcon, formatCompact(gems))}
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
