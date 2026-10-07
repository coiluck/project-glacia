// 選択肢から1つ選ぶ行
interface SettingsSegmentProps<T extends string> {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}

export default function SettingsSegment<T extends string>({ label, options, value, onChange }: SettingsSegmentProps<T>) {
  return (
    <div className="system-settings-row system-notch">
      <span>{label}</span>
      <div className="system-settings-control">
        <div className="system-settings-segment">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              className={o.value === value ? 'is-active' : undefined}
              onClick={() => onChange(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
