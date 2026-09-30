interface GemIconProps {
  className: string
}

// ジェムアイコン
export default function GemIcon({ className }: GemIconProps) {
  return (
    <span className={`gem-icon ${className}`} aria-hidden>
      <span />
    </span>
  )
}
