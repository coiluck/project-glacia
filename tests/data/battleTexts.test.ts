import { describe, expect, it } from 'vitest';
import enBattle from '../../public/json/i18n/en/battle.json';
import enCharacters from '../../public/json/i18n/en/characters.json';
import jaBattle from '../../public/json/i18n/ja/battle.json';
import jaCharacters from '../../public/json/i18n/ja/characters.json';
import { characterMasters } from '../../src/data/characters';
import { enemyDefs } from '../../src/data/enemies';

const LANGS: Record<string, { battle: Record<string, string>; characters: Record<string, string> }> = {
  en: { battle: enBattle, characters: enCharacters },
  ja: { battle: jaBattle, characters: jaCharacters },
};

// 文の中の {0} {1} … の数
const slotCount = (text: string) => new Set([...text.matchAll(/\{(\d+)\}/g)].map((m) => m[1])).size;

describe('戦闘画面のスキル説明文', () => {
  it.each(Object.keys(LANGS))('%s: 味方のスキルの説明は、効果の数ぶんの {n} を持つ', (lang) => {
    const offenders: string[] = [];
    for (const master of Object.values(characterMasters)) {
      for (const skill of master.skills) {
        const text = LANGS[lang].characters[skill.descriptionKey];
        if (!text || slotCount(text) > skill.def.effect.length) offenders.push(skill.descriptionKey);
      }
    }
    expect(offenders).toEqual([]);
  });

  it.each(Object.keys(LANGS))('%s: 敵のスキルには「スキル名のキー＋Desc」の説明があり、{n} が効果の数に収まる', (lang) => {
    const offenders: string[] = [];
    for (const enemy of Object.values(enemyDefs)) {
      if (!enemy.skill) continue;
      const key = `${enemy.skill.def.nameKey}Desc`;
      const text = LANGS[lang].battle[key];
      if (!text || slotCount(text) > enemy.skill.def.effect.length) offenders.push(`${enemy.id}: ${key}`);
    }
    expect(offenders).toEqual([]);
  });

  it('通常攻撃の説明・射程・ステータス名は en と ja の両方にある', () => {
    const keys = ['normalAttackDesc', 'normalAttackDescAll', 'rangeLabel', 'rangeSelf', 'lv', 'statAttack', 'statDefense', 'kindAttack'];
    const missing = Object.keys(LANGS).flatMap((lang) => keys.filter((k) => !LANGS[lang].battle[k]).map((k) => `${lang}: ${k}`));
    expect(missing).toEqual([]);
  });
});
