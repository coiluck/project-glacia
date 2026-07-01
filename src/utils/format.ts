// 大きな数値の表示用フォーマット

// 1千万未満はコンマ区切り、それ以上はK/M/B/Tで丸める。
export function formatCompact(n: number): string {
  if (n < 10_000_000) return n.toLocaleString('en-US')

  const units: [number, string][] = [
    [1e12, 'T'],
    [1e9, 'B'],
    [1e6, 'M'],
  ]
  for (const [div, suffix] of units) {
    if (n >= div) {
      const v = Math.floor((n / div) * 10) / 10 // 小数1桁・切り捨て
      const s = v % 1 === 0 ? String(v) : v.toFixed(1)
      return s + ' ' + suffix
    }
  }
  return n.toLocaleString('en-US')
}
