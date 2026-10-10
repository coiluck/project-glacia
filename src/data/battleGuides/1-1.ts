import type { BattleGuideDef } from '../../features/tutorial/guide'

// 初回バトルチュートリアル
const DEPLOY_AT = { q: -2, r: 0 }
const MOVE_TO = { q: -1, r: 0 }
const FIRST_ENEMY = 'enemy-0-glacimo'
const SECOND_ENEMY = 'enemy-1-glacimo'

const guide: BattleGuideDef = {
  party: [
    {
      masterId: 'lapis',
      level: 1,
      exp: 0,
      limitBreak: 0,
      dupe: 0,
      selectedSkillId: 'lapisFrostBolt',
      skillLevels: {},
    },
  ],
  steps: [
    { speaker: 'lapis', textKey: 'firstBattleIntro', wait: 'tap' },
    {
      speaker: 'lapis',
      textKey: 'firstBattleDeploy',
      focus: [{ tile: DEPLOY_AT }, { ui: 'deploy-lapis' }],
      dragHint: true,
      wait: { type: 'deploy', charId: 'lapis', pos: DEPLOY_AT },
    },
    { speaker: 'lapis', textKey: 'firstBattleStart', focus: [{ ui: 'start' }], wait: { type: 'startBattle' } },
    {
      speaker: 'lapis',
      textKey: 'firstBattleSelect',
      focus: [{ unit: 'ally-lapis' }],
      wait: { type: 'select', unitId: 'ally-lapis' },
      delay: 1500,
    },
    { speaker: 'lapis', textKey: 'firstBattleMove', focus: [{ tile: MOVE_TO }], wait: { type: 'move', to: MOVE_TO } },
    { speaker: 'lapis', textKey: 'firstBattleSkill', focus: [{ ui: 'skill' }], wait: { type: 'skillMode' } },
    { speaker: 'lapis', textKey: 'firstBattleAim', focus: [{ unit: FIRST_ENEMY }], wait: { type: 'skill', aim: { q: 2, r: -1 } } },
    // 1ターン目の終わりに、残った敵の範囲を見せる。歩いて AP を使うので、まだ届かない
    { speaker: 'lapis', textKey: 'firstBattleThreat', focus: [{ unit: SECOND_ENEMY }], wait: { type: 'select', unitId: SECOND_ENEMY } },
    { speaker: 'lapis', textKey: 'firstBattleThreatFar', focus: [{ unit: SECOND_ENEMY }, { highlight: 'threat' }], wait: 'tap' },
    // 1人でも、パーティ AP と個人の AP の違いはここで見せる
    { speaker: 'lapis', textKey: 'firstBattleAp', focus: [{ ui: 'ap-ally-lapis' }, { ui: 'party-ap' }], wait: 'tap' },
    { speaker: 'lapis', textKey: 'firstBattleEndTurn', focus: [{ ui: 'end-turn' }], wait: { type: 'endTurn' } },
    { speaker: 'lapis', textKey: 'firstBattleEnemyPhase', wait: { phase: 'player' } },
    // 敵は飛び石 (0,0) まで歩いて AP が尽き、ラピスの隣で止まる
    { speaker: 'lapis', textKey: 'firstBattleNoAttack', focus: [{ unit: SECOND_ENEMY }], wait: 'tap', delay: 1500 },
    { speaker: 'lapis', textKey: 'firstBattleOutro', wait: 'tap' },
  ],
}

export default guide
