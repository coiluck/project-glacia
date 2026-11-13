import { describe, expect, it } from 'vitest';
import enCommon from '../../public/json/i18n/en/common.json';
import enRecruit from '../../public/json/i18n/en/recruit.json';
import enSortie from '../../public/json/i18n/en/sortie.json';
import enStory from '../../public/json/i18n/en/story.json';
import jaCommon from '../../public/json/i18n/ja/common.json';
import jaRecruit from '../../public/json/i18n/ja/recruit.json';
import jaSortie from '../../public/json/i18n/ja/sortie.json';
import jaStory from '../../public/json/i18n/ja/story.json';
import { RECRUIT_TRANSLATION_MAPPING } from '../../src/pages/recruit/texts';

// 検証する名前空間。en と ja の組
const NAMESPACES: Record<string, [Record<string, string>, Record<string, string>]> = {
  common: [enCommon, jaCommon],
  story: [enStory, jaStory],
  sortie: [enSortie, jaSortie],
  recruit: [enRecruit, jaRecruit],
};

// 文の中の {0} {1} … を並べたもの
const slotsOf = (text: string) => [...text.matchAll(/\{\d+\}/g)].map((m) => m[0]).sort();

describe('i18n', () => {
  it.each(Object.keys(NAMESPACES))('%s は en と ja でキーが揃っている', (ns) => {
    const [en, ja] = NAMESPACES[ns];
    expect(Object.keys(ja).sort()).toEqual(Object.keys(en).sort());
  });

  it.each(Object.keys(NAMESPACES))('%s は en と ja で埋める {n} が同じ', (ns) => {
    const [en, ja] = NAMESPACES[ns];
    const mismatched = Object.keys(en).filter((key) => slotsOf(en[key]).join() !== slotsOf(ja[key] ?? '').join());
    expect(mismatched).toEqual([]);
  });

  it('召集画面が引くキーはどれも recruit.json にある', () => {
    const [en, ja] = NAMESPACES.recruit;
    const missing = Object.values(RECRUIT_TRANSLATION_MAPPING).filter((key) => !en[key] || !ja[key]);
    expect(missing).toEqual([]);
  });
});
