import { describe, expect, it } from 'vitest';
import { AUTO_SPEEDS, AUTO_WAIT, autoWaitMs, TEXT_SPEEDS, TEXT_SPEED_MS } from '../../src/data/settings';

describe('設定の速度', () => {
  it('テキスト速度は遅い方から速い方へ並び、1文字の間隔が縮んでいく', () => {
    const ms = TEXT_SPEEDS.map((s) => TEXT_SPEED_MS[s]);
    expect(ms).toEqual([...ms].sort((a, b) => b - a));
    expect(new Set(ms).size).toBe(TEXT_SPEEDS.length);
  });

  it('保存済みの slow / normal / fast は今も有効で、一番速いのは 8ms のまま', () => {
    for (const saved of ['slow', 'normal', 'fast']) expect(TEXT_SPEEDS, saved).toContain(saved);
    expect(TEXT_SPEED_MS.fast).toBe(8);
    expect(TEXT_SPEED_MS.normal).toBe(19);
  });

  it('オート速度は遅い方から速い方へ並び、同じ文字数なら待ちが短くなっていく', () => {
    const waits = AUTO_SPEEDS.map((s) => autoWaitMs(s, 30));
    expect(waits).toEqual([...waits].sort((a, b) => b - a));
    expect(new Set(waits).size).toBe(AUTO_SPEEDS.length);
  });

  it('オートの待ちは文字数が多いほど長い', () => {
    const shorter = AUTO_SPEEDS.filter((s) => autoWaitMs(s, 10) >= autoWaitMs(s, 40));
    expect(shorter).toEqual([]);
    expect(Object.keys(AUTO_WAIT).sort()).toEqual([...AUTO_SPEEDS].sort());
  });
});
