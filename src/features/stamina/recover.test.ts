import { describe, expect, it } from 'vitest';
import type { MeResponse } from '../contract';
import { recoverStamina } from './recover';
import { REGEN_INTERVAL_SECONDS, currentStamina, spendStamina } from './stamina';

const NOW = 1_000_000;

// recoverStamina は user の stamina 系と items しか見ない
const meWith = (stamina: number, items: Record<string, number>, updatedAt = NOW) =>
  ({
    user: { stamina, stamina_max: 50, stamina_updated_at: updatedAt, items },
  }) as unknown as MeResponse;

describe('recoverStamina', () => {
  it('携行食1個でスタミナが50増え、アイテムが1個減る', () => {
    const { user } = recoverStamina(meWith(10, { fieldRation: 12 }), { itemId: 'fieldRation', count: 1 }, NOW);
    expect(user.stamina).toBe(60);
    expect(user.items).toEqual({ fieldRation: 11 });
  });

  it('上限を超えて回復する', () => {
    const { user } = recoverStamina(meWith(50, { fieldRation: 2 }), { itemId: 'fieldRation', count: 2 }, NOW);
    expect(user.stamina).toBe(150);
    expect(user.items).toEqual({});
  });

  it('使う前までの自然回復ぶんも残る', () => {
    const before = meWith(10, { fieldRation: 1 }, NOW - REGEN_INTERVAL_SECONDS * 3);
    expect(recoverStamina(before, { itemId: 'fieldRation', count: 1 }, NOW).user.stamina).toBe(63);
  });

  it('持っている数より多くは使えない', () => {
    expect(() => recoverStamina(meWith(0, { fieldRation: 1 }), { itemId: 'fieldRation', count: 2 }, NOW)).toThrow(
      /アイテムが足りない/,
    );
  });

  it('スタミナ回復でないアイテムは使えない', () => {
    expect(() => recoverStamina(meWith(0, { iceCrystal: 5 }), { itemId: 'iceCrystal', count: 1 }, NOW)).toThrow(
      /回復できないアイテム/,
    );
  });

  it.each([0, -1, 1.5])('個数 %d は通らない', (count) => {
    expect(() => recoverStamina(meWith(0, { fieldRation: 5 }), { itemId: 'fieldRation', count }, NOW)).toThrow(
      /個数が不正/,
    );
  });
});

describe('上限を超えたスタミナ', () => {
  const over = meWith(120, {}).user;

  it('時間が経っても減らず、増えもしない', () => {
    expect(currentStamina(over, NOW + REGEN_INTERVAL_SECONDS * 100).stamina).toBe(120);
  });

  it('消費しても上限以上なら自然回復は始まらない', () => {
    const spent = spendStamina(over, 20, NOW);
    expect(spent.stamina).toBe(100);
    expect(currentStamina(spent, NOW + REGEN_INTERVAL_SECONDS * 100).stamina).toBe(100);
  });

  it('上限を下回ったら、その時点から自然回復が始まる', () => {
    const spent = spendStamina(over, 80, NOW + 999);
    expect(spent.stamina).toBe(40);
    expect(currentStamina(spent, NOW + 999 + REGEN_INTERVAL_SECONDS).stamina).toBe(41);
  });
});
