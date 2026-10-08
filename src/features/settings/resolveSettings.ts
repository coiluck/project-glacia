// 設定保存のサーバー側の処理
import type { MeResponse, SettingsPayload } from '../../api/types'
import { LANGS, TEXT_SIZES, TEXT_SPEEDS } from '../../data/settings'

const isVolume = (v: unknown) => Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 100

export function resolveSettings(me: MeResponse, payload: SettingsPayload): MeResponse {
  const { bgm, se, textSpeed, textSize, lang } = payload
  if (
    !isVolume(bgm) ||
    !isVolume(se) ||
    !TEXT_SPEEDS.includes(textSpeed) ||
    !TEXT_SIZES.includes(textSize) ||
    !LANGS.includes(lang)
  ) {
    throw new Error(`不正な設定: ${JSON.stringify(payload)}`)
  }

  return {
    ...me,
    user: {
      ...me.user,
      settings_bgm: bgm,
      settings_se: se,
      settings_text_speed: textSpeed,
      settings_text_size: textSize,
      settings_lang: lang,
    },
  }
}
