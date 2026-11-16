import { describe, expect, it } from 'vitest';
import enMail from '../../public/json/i18n/en/mail.json';
import jaMail from '../../public/json/i18n/ja/mail.json';
import { exchangePool } from '../../src/data/exchange';
import { items } from '../../src/data/items';
import { MAILS } from '../../src/data/mails';

describe('メール', () => {
  it('id が重複していない', () => {
    const ids = MAILS.map((m) => m.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });

  it('報酬のアイテムが定義されていて、個数が正の整数', () => {
    const broken = MAILS.flatMap((m) =>
      m.rewards
        .filter((r) => (r.kind === 'item' && !items[r.itemId]) || !Number.isInteger(r.amount) || r.amount <= 0)
        .map((r) => `${m.id}: ${JSON.stringify(r)}`),
    );
    expect(broken).toEqual([]);
  });

  it('差出人・件名・本文が en と ja の mail.json にある', () => {
    const texts: Record<string, Record<string, string>> = { en: enMail, ja: jaMail };
    const missing = MAILS.flatMap((m) =>
      ['from', 'title', 'body'].flatMap((part) =>
        Object.keys(texts).filter((lang) => !texts[lang][`${m.id}.${part}`]).map((lang) => `${lang}: ${m.id}.${part}`),
      ),
    );
    expect(missing).toEqual([]);
  });

  it('期限が Unix秒の整数になっている', () => {
    expect(MAILS.filter((m) => !Number.isInteger(m.expiresAt)).map((m) => m.id)).toEqual([]);
  });
});

describe('スタミナ回復アイテム', () => {
  const recovery = Object.values(items).filter((i) => i.kind === 'stamina');

  it('回復量が正の整数', () => {
    expect(recovery.filter((i) => !Number.isInteger(i.stamina) || i.stamina! <= 0).map((i) => i.id)).toEqual([]);
  });

  it('交換所に並ばない', () => {
    expect(exchangePool.filter((i) => (i.kind as string) === 'stamina').map((i) => i.id)).toEqual([]);
  });
});
