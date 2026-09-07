import { apiGet } from './client'
import type { MeResponse } from './types'
import { useAccountStore } from '../stores/accountStore'
import { useRankStore } from '../stores/rankStore'
import { useStaminaStore } from '../stores/staminaStore'
import { useResourceStore } from '../stores/resourceStore'
import { useProgressStore } from '../stores/progressStore'
import { useTutorialStore } from '../stores/tutorialStore'
import { useCharacterStore } from '../stores/characterStore'
import { useGachaStore } from '../stores/gachaStore'

// ユーザーデータを取得し、全ストアへ反映する
export async function syncUserData(): Promise<MeResponse> {
  const me = await apiGet<MeResponse>('/me')
  distribute(me)
  return me
}

// データを各ストアへ配る。
export function distribute(me: MeResponse) {
  useAccountStore.getState().hydrate(me.user)
  useRankStore.getState().hydrate(me.user)
  useStaminaStore.getState().hydrate(me.user)
  useResourceStore.getState().hydrate(me.user)
  useProgressStore.getState().hydrate(me.user)
  useTutorialStore.getState().hydrate(me.user)
  useGachaStore.getState().hydrate(me.user)
  useCharacterStore.getState().hydrate(me)
}

// 全ストアを初期状態へ戻す
export function resetAll() {
  useAccountStore.getState().reset()
  useRankStore.getState().reset()
  useStaminaStore.getState().reset()
  useResourceStore.getState().reset()
  useProgressStore.getState().reset()
  useTutorialStore.getState().reset()
  useGachaStore.getState().reset()
  useCharacterStore.getState().reset()
}
