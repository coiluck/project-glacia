import { dropTables } from '../../data/drops'

export interface DropSource {
  stageId: string
  sure: boolean
}

export const dropSources: Record<string, DropSource[]> = {}
for (const [stageId, rows] of Object.entries(dropTables)) {
  for (const row of rows) {
    const list = (dropSources[row.itemId] ??= [])
    const found = list.find((s) => s.stageId === stageId)
    if (found) found.sure ||= row.rate === undefined
    else list.push({ stageId, sure: row.rate === undefined })
  }
}

export const chapterOf = (stageId: string) => Number(stageId.split('-')[0])
