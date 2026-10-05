// ログインボーナス
export type LoginReward =
  | { kind: 'gems'; amount: number }
  | { kind: 'currency'; amount: number }
  | { kind: 'item'; itemId: string; amount: number };

const gems = (amount: number): LoginReward => ({ kind: 'gems', amount });
const currency = (amount: number): LoginReward => ({ kind: 'currency', amount });
const item = (itemId: string, amount: number): LoginReward => ({ kind: 'item', itemId, amount });

export const LOGIN_BONUS: LoginReward[] = [
  gems(100),
  currency(500),
  item('iceCrystal', 3),
  item('trainingRecordSmall', 20),
  currency(500),
  item('steelScrap', 3),
  gems(300),
  item('flint', 3),
  currency(800),
  item('skillBookSmall', 1), // 10
  gems(100),
  item('brokenGear', 3),
  item('trainingRecordSmall', 20),
  item('awakenStone', 1),
  currency(500),
  item('beastFang', 3),
  gems(100),
  item('toughHide', 3),
  item('trainingRecordMedium', 10),
  currency(800), // 20
  gems(300),
  item('herbBundle', 3),
  item('skillBookSmall', 1),
  gems(100),
  item('magicDust', 3),
  currency(500),
  item('trainingRecordSmall', 20),
  gems(500),
  currency(500),
  item('iceCrystal', 3), // 30
  gems(100),
];
