import type { BattleGuideDef } from '../../features/tutorial/guide'
import stage1_1 from './1-1'

// 戦闘中のチュートリアルガイド。keyはstages.tsのStage.idと一致させる。
// そのステージを未クリアのときだけ出す（BattlePage で判定）
export const battleGuideRegistry: Record<string, BattleGuideDef> = {
  '1-1': stage1_1,
}
