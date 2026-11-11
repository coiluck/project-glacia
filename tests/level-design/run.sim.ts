// レベルデザインの調査。結果を out/ に Markdown で書く。合否は出さない
import { mkdirSync, writeFileSync } from 'node:fs'
import { it } from 'vitest'
import { battleStageRegistry } from '../../src/data/battleStages'
import { chapters } from '../../src/data/stages'
import { playWithBot } from '../data/helpers/bot'
import { simulate, type Profile, type RunResult } from './sim'

const OUT = new URL('./out/', import.meta.url)
const write = (name: string, lines: string[]) => {
  mkdirSync(OUT, { recursive: true })
  writeFileSync(new URL(name, OUT), lines.join('\n') + '\n')
}

const q = (xs: number[], p: number) => {
  if (xs.length === 0) return NaN
  const s = [...xs].sort((a, b) => a - b)
  return s[Math.min(s.length - 1, Math.floor(p * (s.length - 1) + 0.5))]
}
const f1 = (x: number) => (Number.isNaN(x) ? '-' : x.toFixed(1))
const maxEnemyLv = (id: string) => Math.max(...battleStageRegistry[id].enemies.map((e) => e.level))

// 編成の文字列（"alma3★28 lapis2★28 …"）から
const levelsIn = (s: string) => [...s.matchAll(/★(\d+)/g)].map((m) => Number(m[1]))
const rarity3In = (s: string) => [...s.matchAll(/[a-z]+3★/g)].length
const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length

// ---- 勝てる最低 Lv ----
const PARTIES: Record<string, string[]> = {
  '標準（★3×4＋ラピス）': ['alma', 'vermilia', 'lapis', 'oboro', 'sylvie'],
  '★1・★2だけ': ['lapis', 'sylvie', 'stella', 'rosalie', 'clarice'],
}

it('ボットが勝てる最低 Lv', () => {
  const names = Object.keys(PARTIES)
  const lines = [
    '# ボットが勝てる最低 Lv',
    '',
    '全員を同じ Lv（レアリティの上限で止める）・凸0・スキル Lv1 にして、Lv1〜60 を総当たりした。括弧はそれより上で負ける Lv',
    '',
    `| ステージ | 敵 Lv | 敵の数 | ${names.join(' | ')} |`,
    `|---|---|---|${names.map(() => '---').join('|')}|`,
  ]
  for (const [id, stage] of Object.entries(battleStageRegistry)) {
    const lvs = stage.enemies.map((e) => e.level)
    const cells = names.map((name) => {
      const wins = Array.from({ length: 60 }, (_, i) => i + 1).filter((lv) => playWithBot(stage, PARTIES[name], lv).victory)
      const min = wins[0]
      if (min === undefined) return '勝てない'
      const holes = Array.from({ length: 60 - min }, (_, i) => min + i).filter((l) => !wins.includes(l))
      return holes.length ? `${min}（${holes.slice(0, 6).join(',')}${holes.length > 6 ? '…' : ''}）` : `${min}`
    })
    lines.push(`| ${id} | ${Math.min(...lvs)}〜${Math.max(...lvs)} | ${lvs.length} | ${cells.join(' | ')} |`)
  }
  write('min-level.md', lines)
})

// ---- ゼロから始めたプレイヤー ----
const SEEDS = Number(process.env.SEEDS ?? 30)
const DAYS = 90
const VARIANTS: { name: string; profile: Profile; useBase: boolean }[] = [
  { name: 'ライト（1日2回）', profile: { name: 'light', hours: [8, 21], gap: 13 }, useBase: true },
  { name: '中間（1日4回）', profile: { name: 'mid', hours: [7.5, 12.5, 18.5, 22.5], gap: 9 }, useBase: true },
  { name: 'ライト・基地なし', profile: { name: 'light', hours: [8, 21], gap: 13 }, useBase: false },
]
const CURVE_DAYS = [1, 3, 7, 14, 21, 30, 45, 60, 89]
const LAST = chapters.flatMap((c) => c.stages).at(-1)!.id

it('ゼロから始めたプレイヤーの進み方', () => {
  const lines = [
    '# ゼロから始めたプレイヤーの進み方',
    '',
    `新規登録の状態から ${DAYS} 日。運（ガチャとドロップ）を変えて ${SEEDS} 回ずつ。戦闘の勝敗はボットが所持キャラで戦って決める`,
    '',
  ]
  for (const v of VARIANTS) {
    const runs: RunResult[] = []
    for (let seed = 1; seed <= SEEDS; seed++) {
      runs.push(simulate({ profile: v.profile, seed, days: DAYS, retrySum: 5, useBase: v.useBase, continueAfterDone: true }))
    }
    lines.push(`## ${v.name}`, '')

    lines.push('| ステージ | 敵の最高 Lv | 初クリアの日 下位1割/中央/上位1割 | そのときの編成平均 Lv 中央（最小〜最大） | 負けた回数 中央/最大 |', '|---|---|---|---|---|')
    for (const stage of chapters.flatMap((c) => c.stages)) {
      const recs = runs.flatMap((r) => r.clears.filter((c) => c.stageId === stage.id))
      const days = recs.map((c) => c.day)
      const lv = recs.map((c) => avg(levelsIn(c.levels)))
      const losses = recs.map((c) => c.attempts)
      const missing = runs.length - recs.length
      lines.push(
        `| ${stage.id} | ${maxEnemyLv(stage.id)} | ${f1(q(days, 0.1))} / ${f1(q(days, 0.5))} / ${f1(q(days, 0.9))}${missing ? `（${missing}回は未到達）` : ''} | ${f1(q(lv, 0.5))}（${f1(Math.min(...lv))}〜${f1(Math.max(...lv))}） | ${q(losses, 0.5)} / ${Math.max(...losses)} |`,
      )
    }

    lines.push('', '| 経過日数 | 編成平均 Lv 下位1割/中央/上位1割 | 所持キャラ数 中央 | スタミナ使用率 中央 |', '|---|---|---|---|')
    for (const d of CURVE_DAYS) {
      const pts = runs.flatMap((r) => r.curve.filter((c) => c.day === d))
      const a = pts.map((p) => p.avg)
      lines.push(`| ${d} | ${f1(q(a, 0.1))} / ${f1(q(a, 0.5))} / ${f1(q(a, 0.9))} | ${q(pts.map((p) => p.owned), 0.5)} | ${(q(pts.map((p) => p.usedRatio), 0.5) * 100).toFixed(0)}% |`)
    }

    // 運で分ける: 最後のステージをクリアしたときの編成の★3の人数
    lines.push('', `### ${LAST} クリア時の編成の★3の人数で分けると`, '', '| ★3の人数 | 回数 | クリアの日 中央（最小〜最大） | 編成平均 Lv 中央 | それまでのガチャ回数 中央 |', '|---|---|---|---|---|')
    const last = runs.flatMap((r) => r.clears.filter((c) => c.stageId === LAST))
    for (let n = 0; n <= 5; n++) {
      const g = last.filter((c) => rarity3In(c.levels) === n)
      if (g.length === 0) continue
      const days = g.map((c) => c.day)
      lines.push(`| ${n} | ${g.length} | ${f1(q(days, 0.5))}（${f1(Math.min(...days))}〜${f1(Math.max(...days))}） | ${f1(q(g.map((c) => avg(levelsIn(c.levels))), 0.5))} | ${q(g.map((c) => c.pulls), 0.5)} |`)
    }

    const baseShare = runs.map((r) => r.expFromBase / Math.max(1, r.expFromBase + r.expFromStages))
    const stops = runs.reduce((s, r) => ({ exp: s.exp + r.binding.exp, currency: s.currency + r.binding.currency }), { exp: 0, currency: 0 })
    lines.push(
      '',
      `- 経験値のうち基地の書庫から入った割合（ステージのドロップとの比）: 中央 ${(q(baseShare, 0.5) * 100).toFixed(0)}%`,
      `- ${DAYS} 日間のガチャ回数: 中央 ${q(runs.map((r) => r.pulls), 0.5)}`,
      `- Lv 上げが止まった理由（全試行の合計回数）: 経験値不足 ${stops.exp} / 紙幣不足 ${stops.currency}`,
      '',
    )
  }
  write('progression.md', lines)
})
