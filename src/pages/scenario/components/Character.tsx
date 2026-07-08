import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../../features/scenario/gameStore';

// @char の bounce フラグで明示的にはねて、話している雰囲気を演出する立ち絵。
function SpriteImage({ id, pose }: { id: string; pose: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const mountedRef = useRef(false);
  const bounce = useGameStore((s) => s.bounce);

  // 初回登場時のクラスを確定する。bounce 指定付きで登場したときだけはねさせ、
  // それ以外はフェードインのみにする。
  const [appearClass] = useState(() => {
    const b = useGameStore.getState().bounce;
    return b && b.charId === id ? 'appear-bounce' : 'fade-in';
  });

  useEffect(() => {
    // 初回マウントは登場アニメーション（appear / appear-bounce）に任せる。
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    // 自分宛ての bounce 発火のときだけバウンドを再生する。
    if (!bounce || bounce.charId !== id) return;
    const el = ref.current;
    if (!el) return;
    el.classList.remove('fade-in', 'appear-bounce', 'bounce');
    void el.offsetWidth; // リフローを強制してアニメーションを再start
    el.classList.add('bounce');
  }, [bounce?.id]);

  return (
    <img
      ref={ref}
      className={`scenario-sprite-image ${appearClass}`}
      src={`${import.meta.env.BASE_URL}images/scenario/character/full_body/${id}/${pose}.png`}
      alt={id}
    />
  );
}

export function CharacterSprite() {
  const characters = useGameStore((s) => s.snapshot.characters);

  if (characters.length === 0) return null;

  return (
    <div className="scenario-sprite-layer">
      {characters.map((c) => (
        <SpriteImage key={c.id} id={c.id} pose={c.pose} />
      ))}
    </div>
  );
}

export function CharacterFace() {
  const characters = useGameStore((s) => s.snapshot.characters);
  const faceId = useGameStore((s) => s.snapshot.faceId);

  // 現在の行の char で指定されたキャラ
  const c = faceId ? characters.find((x) => x.id === faceId) : null;
  if (!c) return null;

  return (
    <div className="scenario-face-layer fade-in">
      <img
        className="scenario-face-image"
        src={`${import.meta.env.BASE_URL}images/scenario/character/face/${c.id}/${c.pose}.png`}
        alt={c.id}
      />
    </div>
  );
}
