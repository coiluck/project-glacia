import { useEffect, useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom'
import { paths } from '../../router/paths'
import { syncUserData } from '../../api/sync'
import { hasToken } from '../../api/session'

// 定数
const textTop = "KOKONE";
const textBottom = "Project";
const animationDelay = 0.07;

export default function BootPage() {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  const animationType = useMemo(() => {
    const logoAnimationArray = ['bounce', 'scale', 'jump'];
    return logoAnimationArray[Math.floor(Math.random() * logoAnimationArray.length)];
  }, []);

  useEffect(() => {
    // 未ログインなら取りに行かない
    const loading = hasToken()
      ? syncUserData().catch((e) => console.error(e))
      : Promise.resolve()

    const startTimer = setTimeout(() => {
      setShowText(true);

      const totalAnimationTimeSec =
        (textTop.length * animationDelay + 0.2) +
        (textBottom.length - 1) * animationDelay +
        0.6;
      const totalWaitTimeMs = (totalAnimationTimeSec * 1000) + 500;

      // アニメーション完了後の処理
      const navTimer = setTimeout(() => {
        // ここで遷移
        void loading.then(() => navigate(paths.start, { replace: true }))
      }, totalWaitTimeMs);

      return () => clearTimeout(navTimer);
    }, 1000);

    return () => clearTimeout(startTimer);
  }, [navigate])

  // 表示部分
  const renderAnimatedText = (text: string, delayStart: number) => {
    if (!showText) return null;
    return text.split('').map((char, index) => {
      const delay = (delayStart + index * animationDelay).toFixed(1);
      return (
        <span key={index} className={`animate-${animationType}`} style={{ animationDelay: `${delay}s` }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="page fade-in">
      <div className="boot-container">
        <div className="boot-image-container">
          <img
            src={`${import.meta.env.BASE_URL}images/boot/logo.svg`}
            className={`boot-image ${showText ? "fade-in" : ""}`}
            style={{ opacity: showText ? undefined : 0 }}
          />
        </div>
        <div className="boot-text-container">
          <p id="boot-text-top">{renderAnimatedText(textTop, 0)}</p>
          <p id="boot-text-bottom">{renderAnimatedText(textBottom, textTop.length * animationDelay + 0.15)}</p>
        </div>
      </div>
    </div>
  );
}