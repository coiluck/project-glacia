import { dropTables } from '../../data/drops'

// アイテムから見た入手ステージ。sure は確定枠（rate の無い行）があるか
export interface DropSource {
  stageId: string
  sure: boolean
}

// drops.ts はステージ → アイテムなので、ここで逆引きにしておく
export const dropSources: Record<string, DropSource[]> = {}
for (const [stageId, rows] of Object.entries(dropTables)) {
  for (const row of rows) {
    const list = (dropSources[row.itemId] ??= [])
    const found = list.find((s) => s.stageId === stageId)
    if (found) found.sure ||= row.rate === undefined
    else list.push({ stageId, sure: row.rate === undefined })
  }
}

// ステージ id（"3-4"）の章番号。chapters の stages は 2 章以降が空なので id から読む
export const chapterOf = (stageId: string) => Number(stageId.split('-')[0])
