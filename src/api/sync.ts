import { apiGet } from './client'
import type { UserRow } from './types'
import { useAccountStore } from '../stores/accountStore'
import { useRankStore } from '../stores/rankStore'
import { useStaminaStore } from '../stores/staminaStore'
import { useResourceStore } from '../stores/resourceStore'
import { useProgressStore } from '../stores/progressStore'
import { useTutorialStore } from '../stores/tutorialStore'

// データを各ストアへ配る。
function distribute(row: UserRow) {
  useAccountStore.getState().hydrate(row)
  useRankStore.getState().hydrate(row)
  useStaminaStore.getState().hydrate(row)
  useResourceStore.getState().hydrate(row)
  useProgressStore.getState().hydrate(row)
  useTutorialStore.getState().hydrate(row)
}

// 全ストアを初期状態へ戻す
export function resetAll() {
  useAccountStore.getState().reset()
  useRankStore.getState().reset()
  useStaminaStore.getState().reset()
  useResourceStore.getState().reset()
  useProgressStore.getState().reset()
  useTutorialStore.getState().reset()
}

// ユーザーデータを取得し、全ストアへ反映する
export async function syncUserData(): Promise<UserRow> {
  const row = await apiGet<UserRow>('/me')
  distribute(row)
  return row
}
