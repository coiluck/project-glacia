import { describe, expect, it } from 'vitest';
import { MAILS } from '../../data/mails';
import type { MeResponse } from '../contract';
import { claimAllMails, claimMail, claimableMails } from './mail';

const release = MAILS.find((m) => m.id === 'release')!;
const NOW = release.expiresAt - 1;

// claimMail は user の mail_claimed と報酬の入る先しか見ない
const meWith = (claimed: string[]) =>
  ({
    user: { mail_claimed: claimed, items: {}, gems: 0, currency: 0 },
  }) as unknown as MeResponse;

describe('メール', () => {
  it('リリース記念を受け取ると携行食が12個入り、受取済みになる', () => {
    const { user } = claimMail(meWith([]), 'release', NOW);
    expect(user.items).toEqual({ fieldRation: 12 });
    expect(user.mail_claimed).toEqual(['release']);
  });

  it('同じメールは2度受け取れない', () => {
    expect(() => claimMail(meWith(['release']), 'release', NOW)).toThrow(/受取済み/);
  });

  it('期限を過ぎたメールは受け取れない', () => {
    expect(() => claimMail(meWith([]), 'release', release.expiresAt)).toThrow(/期限切れ/);
  });

  it('無い id は通らない', () => {
    expect(() => claimMail(meWith([]), 'nope', NOW)).toThrow(/メールが無い/);
  });

  it('受取済みと期限切れは、受け取れるメールに入らない', () => {
    expect(claimableMails({ mail_claimed: [] }, NOW).map((m) => m.id)).toContain('release');
    expect(claimableMails({ mail_claimed: ['release'] }, NOW).map((m) => m.id)).not.toContain('release');
    expect(claimableMails({ mail_claimed: [] }, release.expiresAt).map((m) => m.id)).not.toContain('release');
  });

  it('まとめて受け取ると、受け取れるメールが残らない', () => {
    const { user } = claimAllMails(meWith([]), NOW);
    expect(claimableMails(user, NOW)).toEqual([]);
    expect(user.items.fieldRation).toBe(12);
  });

  it('受け取れるメールが無いときのまとめて受け取りは通らない', () => {
    const all = MAILS.map((m) => m.id);
    expect(() => claimAllMails(meWith(all), NOW)).toThrow(/受け取れるメールが無い/);
  });
});
