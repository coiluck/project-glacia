// 0〜100 のスライダー1行
import type { CSSProperties } from 'react'

interface SettingsSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
}

export default function SettingsSlider({ label, value, onChange }: SettingsSliderProps) {
  return (
    <label className="system-settings-row system-notch">
      <span>{label}</span>
      <div className="system-settings-control">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          className="system-settings-slider"
          style={{ '--value': `${value}%` } as CSSProperties}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <b className="system-settings-value">{value}</b>
      </div>
    </label>
  )
}
