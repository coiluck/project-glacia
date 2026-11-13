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

type Shake = {
  id: number; // 同じ命令を再発火させるためのキー
  duration: number;
  intensity: number; // 揺れの強さ。1 あたり SHAKE_PX_PER_INTENSITY px（設計座標）
};

type Props = {
  bg: BgState;
  motion: Motion | null;
  shake: Shake | null;
};

// 揺れの1コマの長さ (ms)
const SHAKE_FRAME_MS = 40;
// 強さ 1 あたりの揺れ幅の最大値（設計座標の px）
const SHAKE_PX_PER_INTENSITY = 2;

const TRANSFORM_MAP: Record<BgDirection, [string, string]> = {
  leftToRight: ['translateX(-3%) scale(1.06)', 'translateX(0) scale(1.06)'],
  rightToLeft: ['translateX( 3%) scale(1.06)', 'translateX(0) scale(1.06)'],
  topToBottom: ['translateY(-3%) scale(1.06)', 'translateY(0) scale(1.06)'],
  bottomToTop: ['translateY( 3%) scale(1.06)', 'translateY(0) scale(1.06)'],
};

export function Background({ bg, motion, shake }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

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
  }, [motion]);

  useEffect(() => {
    if (!shake) return;
    const img = imgRef.current;
    if (!img) return;

    // 設計座標の px を画面の px に直す。
    const scale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale')) || 1;
    const amp = shake.intensity * SHAKE_PX_PER_INTENSITY * scale;
    // 揺らしても端が見えないよう、揺れ幅の分だけ拡大しておく。
    const cover = 1 + (2 * amp) / Math.min(img.clientWidth, img.clientHeight);
    const frames = Math.max(2, Math.round(shake.duration / SHAKE_FRAME_MS));
    const offset = (decay: number) => `${(Math.random() * 2 - 1) * amp * decay}px`;

    // bgMove が transform を使うので、揺れは個別プロパティの translate / scale で重ねる。
    const keyframes: Keyframe[] = [];
    for (let i = 0; i < frames; i++) {
      // 前半は強く揺れたまま、後半で一気に収まる。
      const decay = 1 - (i / frames) ** 2;
      keyframes.push({ translate: `${offset(decay)} ${offset(decay)}`, scale: `${cover}` });
    }
    keyframes.push({ translate: '0 0', scale: `${cover}` });

    const animation = img.animate(keyframes, { duration: shake.duration, easing: 'linear' });
    return () => animation.cancel();
  }, [shake]);

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
