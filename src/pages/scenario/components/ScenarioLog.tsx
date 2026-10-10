import { useLayoutEffect, useRef } from 'react';
import type { SceneSnapshot } from '../../../features/scenario/types';

type Props = {
  entries: SceneSnapshot[];
};

type Line = { text: string; index: number };
type Run = { speaker: string; faceId: string | null; lines: Line[] };

function toRuns(entries: SceneSnapshot[]): Run[] {
  const runs: Run[] = [];
  entries.forEach((s, index) => {
    if (!s.text) return;
    const faceId = s.faceId && s.characters.some((c) => c.id === s.faceId) ? s.faceId : null;
    const last = runs[runs.length - 1];
    if (s.speaker && last && last.speaker === s.speaker) {
      last.lines.push({ text: s.text, index });
      last.faceId ??= faceId;
    } else {
      runs.push({ speaker: s.speaker, faceId, lines: [{ text: s.text, index }] });
    }
  });
  return runs;
}

export function ScenarioLog({ entries }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const current = entries.length - 1;

  // 開いたら最新までスクロール
  useLayoutEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  return (
    <div className="scenario-log">
      <div ref={listRef} className="scenario-log-list" onClick={(e) => e.stopPropagation()}>
        {toRuns(entries).map((run) =>
          run.lines.map((line, k) => {
            const isCurrent = line.index === current ? ' is-current' : '';
            if (!run.speaker) {
              return <div key={line.index} className={`scenario-log-note${isCurrent}`}>{line.text}</div>;
            }
            // 話者の最初のカードにだけ顔と名前を出す
            const isCont = k > 0;
            const faceClass = isCont ? ' is-cont' : run.faceId ? '' : ' is-empty';
            return (
              <div key={line.index} className={`scenario-log-say${isCurrent}${isCont ? ' is-cont' : ''}`}>
                <div className={`scenario-log-face${faceClass}`}>
                  {!isCont && run.faceId && (
                    <img
                      src={`${import.meta.env.BASE_URL}images/character/face/${run.faceId}.avif`}
                      alt={run.faceId}
                    />
                  )}
                </div>
                <div className="scenario-log-card">
                  {!isCont && <div className="scenario-log-name">{run.speaker}</div>}
                  <div className="scenario-log-text">{line.text}</div>
                </div>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
