// 全員に届くメール。受け取ったかどうかだけをユーザーごとに持つ（UserRow.mail_claimed）
import type { LoginReward } from './loginBonus';

export interface MailDef {
  id: string; // 配ったあとは変えない。変えると受取済みの人にもう一度届く
  rewards: LoginReward[];
  expiresAt: number; // 受け取れる期限（Unix秒）
}

const at = (iso: string) => Date.parse(iso) / 1000;

export const MAILS: MailDef[] = [
  // リリース記念
  {
    id: 'release',
    rewards: [{ kind: 'item', itemId: 'fieldRation', amount: 12 }],
    expiresAt: at('2027-01-01T05:00:00+09:00'),
  },
];
