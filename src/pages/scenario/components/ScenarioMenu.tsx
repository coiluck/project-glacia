import type { MouseEvent } from 'react';

type Props = {
  isLogOpen: boolean;
  labels: { prev: string; log: string; skip: string; close: string };
  onPrev: (e: MouseEvent) => void;
  onLog: (e: MouseEvent) => void;
  onSkip: (e: MouseEvent) => void;
};

// 六角ボタンの内側の線。外形を中心から 0.88 倍した六角
function HexLine() {
  return (
    <svg className="scenario-menu-line" viewBox="0 0 100 87" preserveAspectRatio="none" aria-hidden="true">
      <polygon points="28,5.2 72,5.2 94,43.5 72,81.8 28,81.8 6,43.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const ICON_PATHS = {
  prev: ['M8 4 3 9l5 5', 'M3 9h11a6 6 0 0 1 0 12h-4'],
  log: ['M3 5h2M9 5h12M3 12h2M9 12h12M3 19h2M9 19h12'],
  skip: ['M4 5l7 7-7 7', 'M12 5l7 7-7 7'],
  close: ['M5 5l14 14M19 5 5 19'],
};

function Icon({ name }: { name: keyof typeof ICON_PATHS }) {
  return (
    <svg className="scenario-menu-icon" viewBox="0 0 24 24" aria-hidden="true">
      {ICON_PATHS[name].map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

export function ScenarioMenu({ isLogOpen, labels, onPrev, onLog, onSkip }: Props) {
  return (
    <nav className="scenario-menu">
      <button className="scenario-menu-button at-prev" onClick={onPrev}>
        <HexLine />
        <span className="scenario-menu-button-inner">
          <Icon name="prev" />
          <span className="scenario-menu-label">{labels.prev}</span>
        </span>
      </button>
      <button className={`scenario-menu-button at-log${isLogOpen ? ' is-on' : ''}`} onClick={onLog}>
        <HexLine />
        <span className="scenario-menu-button-inner">
          <Icon name={isLogOpen ? 'close' : 'log'} />
          <span className="scenario-menu-label">{isLogOpen ? labels.close : labels.log}</span>
        </span>
      </button>
      <button className="scenario-menu-button at-skip" onClick={onSkip}>
        <HexLine />
        <span className="scenario-menu-button-inner">
          <Icon name="skip" />
          <span className="scenario-menu-label">{labels.skip}</span>
        </span>
      </button>
    </nav>
  );
}
