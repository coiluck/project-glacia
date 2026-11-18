// 段階のあるスライダー1行。両端の名前だけを出し、数値は出さない
import type { CSSProperties } from 'react'

interface SettingsSliderProps {
  label: string
  value: number // 0〜max
  max: number
  minLabel: string
  maxLabel: string
  onChange: (value: number) => void
}

export default function SettingsSlider({ label, value, max, minLabel, maxLabel, onChange }: SettingsSliderProps) {
  return (
    <label className="system-settings-row system-settings-row-slider system-notch">
      <span>{label}</span>
      <div className="system-settings-control">
        <div className="system-settings-slide">
          <input
            type="range"
            min={0}
            max={max}
            step={1}
            value={value}
            className="system-settings-slider"
            style={{ '--value': `${(value / max) * 100}%` } as CSSProperties}
            onChange={(e) => onChange(Number(e.target.value))}
          />
          <div className="system-settings-ends">
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </div>
        </div>
      </div>
    </label>
  )
}
