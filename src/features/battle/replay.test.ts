import { describe, expect, it } from 'vitest';
import { battlePartyFor, readActions, replayBattle, type BattleAction } from './replay';

// 1-1 はチュートリアルのステージなので、未クリアならガイドの編成（ラピス Lv1）で戦う
const party = battlePartyFor({}, {}, [], '1-1', 1);

// 1-1 のガイドどおりに1ターン目を進め、2ターン目に残った敵を通常攻撃で倒す
// worker/test/commands.test.ts にも同じ列がある
const victory: BattleAction[] = [
  { type: 'deploy', charId: 'lapis', pos: { q: -2, r: 0 } },
  { type: 'start' },
  { type: 'move', unitId: 'ally-lapis', to: { q: -1, r: 0 } },
  { type: 'skill', userId: 'ally-lapis', aim: { q: 2, r: -1 } },
  { type: 'endTurn' },
  { type: 'attack', attackerId: 'ally-lapis', targetIds: ['enemy-1-glacimo'] },
];

describe('replayBattle', () => {
  it('1-1 の勝ち筋を再生すると勝つ', () => {
    expect(replayBattle('1-1', party, victory).phase).toBe('victory');
  });

  it('途中までのログは決着しない', () => {
    expect(replayBattle('1-1', party, victory.slice(0, 5)).phase).toBe('player');
  });

  it('決着のあとに操作があれば通らない', () => {
    expect(() => replayBattle('1-1', party, [...victory, { type: 'endTurn' }])).toThrow();
  });

  it('敵のユニットは動かせない', () => {
    const log: BattleAction[] = [
      ...victory.slice(0, 2),
      { type: 'move', unitId: 'enemy-1-glacimo', to: { q: 2, r: 0 } },
    ];
    expect(() => replayBattle('1-1', party, log)).toThrow(/味方でない/);
  });

  it('編成にいないキャラは配置できない', () => {
    expect(() =>
      replayBattle('1-1', party, [{ type: 'deploy', charId: 'alma', pos: { q: -2, r: 0 } }]),
    ).toThrow(/編成にいない/);
  });

  it('届かない敵は攻撃できない', () => {
    const log: BattleAction[] = [
      ...victory.slice(0, 2),
      { type: 'attack', attackerId: 'ally-lapis', targetIds: ['enemy-1-glacimo'] },
    ];
    expect(() => replayBattle('1-1', party, log)).toThrow(/Invalid target/);
  });
});

describe('readActions', () => {
  it('JSON で届いた勝ち筋はそのまま読める', () => {
    expect(readActions(JSON.parse(JSON.stringify(victory)))).toEqual(victory);
  });

  it('余計な項目は落とす', () => {
    expect(readActions([{ type: 'start', extra: 1 }])).toEqual([{ type: 'start' }]);
  });

  it('座標が整数でない操作は通らない', () => {
    expect(() =>
      readActions([{ type: 'move', unitId: 'ally-lapis', to: { q: '1', r: 0 } }]),
    ).toThrow(/0番目/);
  });

  it('知らない種類の操作は通らない', () => {
    expect(() => readActions([{ type: 'win' }])).toThrow(/0番目/);
  });

  it('配列でなければ通らない', () => {
    expect(() => readActions({ type: 'start' })).toThrow();
  });
});
