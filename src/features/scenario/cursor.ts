import type { ProgressState, ScenarioLine, ScenarioFile } from './types';

/**
 * 現在の進行位置から「読むべき行配列」と「lineIndexの所有者」を取り出した結果。
 * frameはprogress本体 or branchStack末尾への参照なので、frame.lineIndex++ が
 * そのまま進行状態への書き込みになる。
 */
export type Cursor = {
  lines: ReadonlyArray<ScenarioLine>;
  frame: { lineIndex: number };
  inBranch: boolean;
};

export function resolveCursor(
  progress: ProgressState,
  registry: Record<string, ScenarioFile>,
): Cursor {
  const top = progress.branchStack[progress.branchStack.length - 1];
  if (top) {
    const sc = registry[top.scenarioId];
    const choice = sc?.choices?.[top.choiceId]?.[top.choiceIndex];
    if (!choice) throw new Error(`Choice not found: ${top.choiceId}[${top.choiceIndex}]`);
    return { lines: choice.branch, frame: top, inBranch: true };
  }
  const sc = registry[progress.scenarioId];
  if (!sc) throw new Error(`Scenario not found: ${progress.scenarioId}`);
  return { lines: sc.lines, frame: progress, inBranch: false };
}

export function peekLine(
  progress: ProgressState,
  registry: Record<string, ScenarioFile>,
): ScenarioLine | null {
  const cur = resolveCursor(progress, registry);
  return cur.lines[cur.frame.lineIndex] ?? null;
}
