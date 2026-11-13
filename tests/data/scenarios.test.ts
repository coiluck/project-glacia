import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { afterClearScenarios, scenarioRegistry } from '../../src/data/scenarios';
import { battleStageRegistry } from '../../src/data/battleStages';
import { chapters } from '../../src/data/stages';
import { speakerFaces } from '../../src/data/scenarios/speakers';
import { reduceLine } from '../../src/features/scenario/SceneReducer';
import type { ScenarioFile, ScenarioLine, SceneSnapshot } from '../../src/features/scenario/types';

// 本文と選択肢の分岐の行をまとめて返す
const allLines = (file: ScenarioFile): ScenarioLine[] => [
  ...file.lines,
  ...Object.values(file.choices ?? {}).flat().flatMap((c) => c.branch),
];

// シナリオを頭から読み進め、行ごとに snapshot を渡す。選択肢では全部の分岐を読み、本文は1つ目の分岐のあとから続ける
const walk = (
  file: ScenarioFile,
  visit: (line: ScenarioLine, snapshot: SceneSnapshot, where: string) => void,
) => {
  const read = (lines: ScenarioLine[], start: SceneSnapshot, label: string): SceneSnapshot => {
    let s = start;
    lines.forEach((line, i) => {
      s = reduceLine(s, line, speakerFaces);
      visit(line, s, `${label}#${i}`);
      if (!line.choiceId) return;
      const ends = (file.choices?.[line.choiceId] ?? []).map((c, k) => read(c.branch, s, `${label}#${i}-${line.choiceId}[${k}]`));
      if (ends.length) s = ends[0];
    });
    return s;
  };
  read(file.lines, { background: null, characters: [], text: '', speaker: '', faceId: null }, file.id);
};

describe('話者と顔', () => {
  it.each(Object.entries(speakerFaces))('%s（%s）の顔と立ち絵の画像がある', (_, id) => {
    expect(existsSync(`public/images/character/face/${id}.avif`), `face/${id}.avif`).toBe(true);
    expect(existsSync(`public/images/character/full_body/${id}.avif`), `full_body/${id}.avif`).toBe(true);
  });

  it.each(Object.keys(scenarioRegistry))('%s: すでに表にある話者の行の char は表の id と同じ', (id) => {
    const mismatches = allLines(scenarioRegistry[id]).flatMap((l) => {
      const face = l.speaker ? speakerFaces[l.speaker] : undefined;
      if (!face) return [];
      return (l.commands ?? []).flatMap((c) => (c.type === 'char' && c.id !== face ? [`${l.speaker}: ${c.id} / ${l.text}`] : []));
    });
    expect(mismatches).toEqual([]);
  });

  it.each(Object.keys(scenarioRegistry))('%s: 表にある話者が舞台にいる行では、char が無くてもその顔が出る', (id) => {
    const missing: string[] = [];
    walk(scenarioRegistry[id], (line, s, where) => {
      const face = line.speaker ? speakerFaces[line.speaker] : undefined;
      if (face && s.characters.some((c) => c.id === face) && s.faceId !== face) missing.push(`${where} ${line.speaker}: ${line.text}`);
    });
    expect(missing).toEqual([]);
  });
});

describe('背景', () => {
  it.each(Object.keys(scenarioRegistry))('%s: bg 命令の画像が public にある', (id) => {
    const missing = allLines(scenarioRegistry[id]).flatMap((l) =>
      (l.commands ?? []).flatMap((c) => (c.type === 'bg' && !existsSync(`public/${c.file}`) ? [`${c.file} / ${l.text}`] : [])),
    );
    expect(missing).toEqual([]);
  });
});

describe('クリア後のシナリオ', () => {
  const stageIds = chapters.flatMap((c) => c.stages.map((s) => s.id));

  it.each(Object.entries(afterClearScenarios))('%s のあとの %s は、登録済みで戦闘マップを持たない', (stageId, scenarioId) => {
    expect(stageIds, stageId).toContain(stageId);
    expect(scenarioRegistry[scenarioId], scenarioId).toBeDefined();
    expect(scenarioRegistry[scenarioId].id).toBe(scenarioId);
    // 戦闘マップがあると、シナリオの終わりで同じ id の戦闘へ進んでしまう
    expect(battleStageRegistry[scenarioId], scenarioId).toBeUndefined();
  });
});
