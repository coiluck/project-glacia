// 難易度曲線。ステージごとに「勝つのに要る Lv」を、★3の人数の違う編成で測って out/curve.md に書く
// 3〜5章は曲線の形も確かめる。1回50秒ほどかかるので pnpm test には入れていない
// STAGES=4-1,4-2 で測るステージを絞れる（絞ったときは形を確かめない）
import { mkdirSync, writeFileSync } from 'node:fs'
import { beforeAll, describe, expect, it } from 'vitest'
import { battleStageRegistry } from '../../src/data/battleStages'
import { CURVE_PARTIES, median, requiredLevel } from './curve'

const DEFAULT_STAGES = Object.keys(battleStageRegistry)
const SHAPED_CHAPTERS = [
  ['3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7'],
  ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7'],
  ['5-1', '5-2', '5-3', '5-4'],
]
// ★3なしでも届く Lv。★1は Lv40 で止まるので、★2が少し上回れば勝てるところまで
const WORST_CASE_LIMIT = 42
const WORST_CASE = '★3なし'

const stages = process.env.STAGES?.split(',') ?? DEFAULT_STAGES
const names = Object.keys(CURVE_PARTIES)
const req: Record<string, Record<string, number>> = {}
const med: Record<string, number> = {}

beforeAll(() => {
  const lines = [
    '# 難易度曲線',
    '',
    '3 Lv 続けてボットが勝てるようになる最低の Lv（凸0・スキル Lv1）。中央値は7編成の真ん中。61 は Lv60 でも勝てない',
    '',
    `| ステージ | 敵 Lv | 中央値 | ${names.join(' | ')} |`,
    `|---|---|---|${names.map(() => '---').join('|')}|`,
  ]
  for (const id of stages) {
    const lvs = battleStageRegistry[id].enemies.map((e) => e.level)
    req[id] = Object.fromEntries(names.map((n) => [n, requiredLevel(battleStageRegistry[id], CURVE_PARTIES[n]) ?? 61]))
    med[id] = median(Object.values(req[id]))
    lines.push(`| ${id} | ${Math.min(...lvs)}〜${Math.max(...lvs)} | **${med[id]}** | ${names.map((n) => req[id][n]).join(' | ')} |`)
  }
  mkdirSync(new URL('./out/', import.meta.url), { recursive: true })
  writeFileSync(new URL(`./out/${process.env.OUT ?? 'curve'}.md`, import.meta.url), lines.join('\n') + '\n')
})

describe.skipIf(process.env.STAGES)('3〜5章の難易度曲線', () => {
  it.each(SHAPED_CHAPTERS.map((ids) => [ids[0][0], ids] as const))('%s章は、必要 Lv の中央値が前のステージより下がらない', (_, ids) => {
    const drops = ids
      .slice(1)
      .map((id, i) => [ids[i], id] as const)
      .filter(([prev, id]) => med[id] < med[prev])
      .map(([prev, id]) => `${prev}=${med[prev]} -> ${id}=${med[id]}`)
    expect(drops).toEqual([])
  })

  it.each(SHAPED_CHAPTERS.map((ids) => [ids[0][0], ids] as const))('%s章は、最後のステージ（ボス）の必要 Lv がいちばん高い', (_, ids) => {
    const boss = ids[ids.length - 1]
    const higher = ids.slice(0, -1).filter((id) => med[id] >= med[boss]).map((id) => `${id}=${med[id]} >= ${boss}=${med[boss]}`)
    expect(higher).toEqual([])
  })

  it(`★3なしの編成でも、どのステージも Lv${WORST_CASE_LIMIT} までに勝てる`, () => {
    const over = SHAPED_CHAPTERS.flat().filter((id) => req[id][WORST_CASE] > WORST_CASE_LIMIT).map((id) => `${id}=${req[id][WORST_CASE]}`)
    expect(over).toEqual([])
  })
})
