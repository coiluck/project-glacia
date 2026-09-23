import type { BattleGuideDef } from '../../features/tutorial/guide'
import stage1_1 from './1-1'

// 戦闘中のチュートリアルガイド。keyはstages.tsのStage.idと一致させる。
// 確認のため、今は tutorial_steps を見ずに登録のあるステージでは毎回出す
export const battleGuideRegistry: Record<string, BattleGuideDef> = {
  '1-1': stage1_1,
}
