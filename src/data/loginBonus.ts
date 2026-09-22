// ログインボーナス
export type LoginReward =
  | { kind: 'gems'; amount: number }
  | { kind: 'currency'; amount: number }
  | { kind: 'item'; itemId: string; amount: number };

const gems = (amount: number): LoginReward => ({ kind: 'gems', amount });
const currency = (amount: number): LoginReward => ({ kind: 'currency', amount });
const item = (itemId: string, amount: number): LoginReward => ({ kind: 'item', itemId, amount });

// 数値は全て仮
export const LOGIN_BONUS: LoginReward[] = [
  gems(50),
  currency(500),
  item('iceCrystal', 3),
  item('trainingRecordSmall', 2),
  currency(500),
  item('steelScrap', 3),
  gems(150),
  item('flint', 3),
  currency(800),
  item('skillBookSmall', 1), // 10
  gems(50),
  item('brokenGear', 3),
  item('trainingRecordSmall', 2),
  item('awakenStone', 1),
  currency(500),
  item('beastFang', 3),
  gems(50),
  item('toughHide', 3),
  item('trainingRecordMedium', 1),
  currency(800), // 20
  gems(150),
  item('herbBundle', 3),
  item('skillBookSmall', 1),
  gems(50),
  item('magicDust', 3),
  currency(500),
  item('trainingRecordSmall', 2),
  gems(300),
  currency(500),
  item('iceCrystal', 3), // 30
  gems(50),
];
