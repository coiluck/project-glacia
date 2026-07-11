import { useEffect, useRef } from 'react';
import type { BgDirection } from '../../../features/scenario/types';

type BgState = {
  file: string | null;
  transition: 'fade' | 'crossfade' | 'none';
};

type Motion = {
  id: number; // 同じ命令を再発火させるためのキー
  direction: BgDirection;
  duration: number;
};

type Props = {
  bg: BgState;
  motion: Motion | null;
};

const TRANSFORM_MAP: Record<BgDirection, [string, string]> = {
  leftToRight: ['translateX(-3%) scale(1.06)', 'translateX(0) scale(1.06)'],
  rightToLeft: ['translateX( 3%) scale(1.06)', 'translateX(0) scale(1.06)'],
  topToBottom: ['translateY(-3%) scale(1.06)', 'translateY(0) scale(1.06)'],
  bottomToTop: ['translateY( 3%) scale(1.06)', 'translateY(0) scale(1.06)'],
};

export function Background({ bg, motion }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  // motion発火: motion.idが変わったときだけ動く
  useEffect(() => {
    if (!motion) return;
    const img = imgRef.current;
    if (!img) return;

    const [from, to] = TRANSFORM_MAP[motion.direction];

    const start = () => {
      // transition を外して from に瞬時にジャンプ。
      // 強制リフローを挟まないと、ブラウザが「前回のpaintの値 → to」の
      // 連続変化として transition を計算してしまい、from が無視される。
      img.style.transition = 'none';
      img.style.transform = from;
      void img.offsetHeight;
      img.style.transition = `transform ${motion.duration}ms ease-out`;
      img.style.transform = to;
    };

    if (img.complete && img.naturalWidth > 0) start();
    else img.addEventListener('load', start, { once: true });

    return () => img.removeEventListener('load', start);
  }, [motion?.id]); // ← idだけ見る。motionオブジェクト全体は見ない

  if (!bg.file) return <div className="scenario-bg-layer" />;

  return (
    <div className="scenario-bg-layer">
      <img
        key={bg.file}
        ref={imgRef}
        src={`${import.meta.env.BASE_URL}${bg.file}`}
        className={`scenario-bg-image transition-${bg.transition}`}
      />
    </div>
  );
}
