import { describe, expect, it } from 'vitest';
import enBattle from '../../public/json/i18n/en/battle.json';
import enCommon from '../../public/json/i18n/en/common.json';
import jaBattle from '../../public/json/i18n/ja/battle.json';
import jaCommon from '../../public/json/i18n/ja/common.json';
import { battleStageRegistry } from '../../src/data/battleStages';
import { enemyDefs } from '../../src/data/enemies';
import { scenarioRegistry } from '../../src/data/scenarios';
import { axialKey } from '../../src/features/battle/hex';
import {
  battleStageOf,
  boardSize,
  chapterOf,
  passableKeys,
  reachableFromDeploy,
  soloEnemyReachesAllies,
  stagesOf,
} from './helpers/stage';

// 翻訳のキーがあるか。JSON の型ではキーが固定されるので、文字列で引けるようにして見る
const hasText = (dict: object, key: string) => {
  const value = (dict as Record<string, unknown>)[key];
  return typeof value === 'string' && value !== '';
};

// 検証する章。ひとまず4章だけ
const CHAPTERS = [4];

// 敵の Lv の目安。src/data/battleStages/index.ts のコメントと合わせる
const LEVEL_RANGE: Record<number, [number, number]> = {
  1: [1, 5],
  2: [6, 14],
  3: [15, 26],
  4: [27, 38],
  5: [39, 50],
};

// 盤面の表示に収まる大きさ。今あるマップはすべて7段・幅16
const MAX_ROWS = 7;
const MAX_COL_SPAN = 16;
const MIN_DEPLOY = 5;

// 水は台地にすると周りの地面より高く見えるので、全ステージで高さを付けない
it('水のマスに高さが付いていない', () => {
  const raised = Object.entries(battleStageRegistry).flatMap(([id, stage]) =>
    stage.tiles
      .filter((t) => t.terrain === 'water' && (t.elevation ?? 0) > 0)
      .map((t) => `${id} @ ${axialKey(t.pos)}`),
  );
  expect(raised).toEqual([]);
});

describe.each(CHAPTERS)('%i章', (chapterId) => {
  const stages = stagesOf(chapterId);

  it('戦闘マップとシナリオの登録が stages.ts のステージと一致する', () => {
    const ids = stages.map((s) => s.id).sort();
    const inChapter = (id: string) => id.startsWith(`${chapterId}-`);
    expect(Object.keys(battleStageRegistry).filter(inChapter).sort()).toEqual(ids);
    expect(Object.keys(scenarioRegistry).filter(inChapter).sort()).toEqual(ids);
  });

  it('章タイトルの翻訳が ja と en にある', () => {
    const { titleKey } = chapterOf(chapterId);
    expect(hasText(jaCommon, titleKey), `ja ${titleKey}`).toBe(true);
    expect(hasText(enCommon, titleKey), `en ${titleKey}`).toBe(true);
  });

  it('出てくる敵の名前とスキル名の翻訳が ja と en にある', () => {
    const enemyIds = new Set(stages.flatMap((s) => battleStageOf(s.id).enemies.map((e) => e.enemyId)));
    for (const id of enemyIds) {
      const def = enemyDefs[id];
      const keys = [def.nameKey, ...(def.skill ? [def.skill.def.nameKey] : [])];
      for (const key of keys) {
        expect(hasText(jaBattle, key), `ja ${key}`).toBe(true);
        expect(hasText(enBattle, key), `en ${key}`).toBe(true);
      }
    }
  });

  describe.each(stages.map((s) => s.id))('%s', (stageId) => {
    const stage = battleStageOf(stageId);
    const passable = passableKeys(stage);

    it('盤面が表示に収まる', () => {
      const { rows, colSpan } = boardSize(stage);
      expect(rows).toBeLessThanOrEqual(MAX_ROWS);
      expect(colSpan).toBeLessThanOrEqual(MAX_COL_SPAN);
    });

    it(`配置マスが${MIN_DEPLOY}つ以上あり、どれも通れる`, () => {
      expect(stage.deployableTiles.length).toBeGreaterThanOrEqual(MIN_DEPLOY);
      for (const pos of stage.deployableTiles) expect(passable.has(axialKey(pos))).toBe(true);
    });

    it('敵は定義があり、通れるマスに1体ずつ立っていて、配置マスと重ならない', () => {
      const deploy = new Set(stage.deployableTiles.map(axialKey));
      const keys = stage.enemies.map((e) => axialKey(e.pos));
      expect(new Set(keys).size).toBe(keys.length);
      for (const enemy of stage.enemies) {
        const key = axialKey(enemy.pos);
        expect(enemyDefs[enemy.enemyId], enemy.enemyId).toBeDefined();
        expect(passable.has(key), `${enemy.enemyId} @ ${key}`).toBe(true);
        expect(deploy.has(key), `${enemy.enemyId} @ ${key}`).toBe(false);
      }
    });

    it('敵の Lv が章の目安に収まる', () => {
      const [min, max] = LEVEL_RANGE[chapterId];
      for (const enemy of stage.enemies) {
        expect(enemy.level, enemy.enemyId).toBeGreaterThanOrEqual(min);
        expect(enemy.level, enemy.enemyId).toBeLessThanOrEqual(max);
      }
    });

    it('どの敵にも配置マスから歩いて届く', () => {
      const reach = reachableFromDeploy(stage);
      for (const enemy of stage.enemies) {
        expect(reach.has(axialKey(enemy.pos)), `${enemy.enemyId} @ ${axialKey(enemy.pos)}`).toBe(true);
      }
    });

    it('どの敵も1体だけ置いたとき、壁の手前で止まらずに味方へ攻撃が届く', () => {
      for (const enemy of stage.enemies) {
        expect(soloEnemyReachesAllies(stage, enemy), `${enemy.enemyId} @ ${axialKey(enemy.pos)}`).toBe(true);
      }
    });
  });
});
