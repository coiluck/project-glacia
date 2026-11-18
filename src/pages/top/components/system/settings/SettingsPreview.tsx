// シナリオ画面の会話窓。テキスト速度・サイズ・オート速度を変えると、その場で見える
import { useEffect, useState } from 'react'
import { autoWaitMs, TEXT_SIZE_PX, TEXT_SPEED_MS } from '../../../../../data/settings'
import { useTranslations } from '../../../../../i18n'
import { useSettingsStore } from '../../../../../stores/settingsStore'

const BASE = import.meta.env.BASE_URL

const MAPPING = { sample1: 'settingsSample1', sample2: 'settingsSample2', sample3: 'settingsSample3' }

export default function SettingsPreview() {
  const t = useTranslations('system', MAPPING)
  const tName = useTranslations('characters', { lapis: 'charLapis' })
  const textSpeed = useSettingsStore((s) => s.textSpeed)
  const textSize = useSettingsStore((s) => s.textSize)
  const autoSpeed = useSettingsStore((s) => s.autoSpeed)

  const lines = [t.sample1, t.sample2, t.sample3]
  const [lineNo, setLineNo] = useState(0)
  const text = lines[lineNo % lines.length]
  const [typed, setTyped] = useState({ text: '', count: 0 })

  // 1文字ずつ出し、出し終えたらオートと同じ待ちを置いて次の行へ。設定が変わったら頭から
  useEffect(() => {
    if (!text) return
    const stepMs = TEXT_SPEED_MS[textSpeed]
    let i = 0
    let timer = 0
    const tick = () => {
      i += 1
      setTyped({ text, count: i })
      timer = window.setTimeout(i < text.length ? tick : () => setLineNo((n) => n + 1), i < text.length ? stepMs : autoWaitMs(autoSpeed, text.length))
    }
    timer = window.setTimeout(tick, stepMs)
    return () => window.clearTimeout(timer)
  }, [text, textSpeed, autoSpeed])

  const shown = typed.text === text ? text.slice(0, typed.count) : ''

  return (
    <div className="system-settings-preview">
      <div className="system-settings-preview-scene">
        <div
          className="system-settings-preview-bg"
          style={{ backgroundImage: `url(${BASE}images/scenario/bg/camp_border.avif)` }}
        />
        <img className="system-settings-preview-face" src={`${BASE}images/character/face/lapis.avif`} alt="" />
        <div className="system-settings-preview-box">
          <div className="system-settings-preview-name">{tName.lapis}</div>
          <div className="system-settings-preview-message" style={{ fontSize: TEXT_SIZE_PX[textSize] }}>
            <span>{shown}</span>
            <span className="system-settings-preview-cursor" />
          </div>
        </div>
      </div>
    </div>
  )
}
