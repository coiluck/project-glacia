import { describe, expect, it } from 'vitest';
import { dropTables } from '../../src/data/drops';
import { items } from '../../src/data/items';
import { stagesOf } from './helpers/stage';

// 検証する章。ひとまず4章だけ
const CHAPTERS = [4];

describe.each(CHAPTERS)('%i章のドロップ', (chapterId) => {
  const stages = stagesOf(chapterId);

  it('ドロップテーブルが stages.ts のステージと一致する', () => {
    const ids = stages.map((s) => s.id).sort();
    expect(Object.keys(dropTables).filter((id) => id.startsWith(`${chapterId}-`)).sort()).toEqual(ids);
  });

  describe.each(stages.map((s) => s.id))('%s', (stageId) => {
    const table = dropTables[stageId] ?? [];

    // rollDrops は確定枠の無いテーブルでも何も落とさずに通ってしまうので、最低保証はここで見る
    it('確定枠が1つ以上ある', () => {
      expect(table.some((e) => e.rate === undefined)).toBe(true);
    });

    it('アイテムが定義されていて、個数と確率が正しい', () => {
      for (const entry of table) {
        expect(items[entry.itemId], entry.itemId).toBeDefined();
        expect(Number.isInteger(entry.count) && entry.count > 0, `${entry.itemId} count`).toBe(true);
        // 確率1は確定枠として rate を省く
        if (entry.rate !== undefined) {
          expect(entry.rate, `${entry.itemId} rate`).toBeGreaterThan(0);
          expect(entry.rate, `${entry.itemId} rate`).toBeLessThan(1);
        }
      }
    });
  });
});
