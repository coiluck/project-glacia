// 交換材料のアイコン
export default function TokenIcon({ className }: { className?: string }) {
  return (
    <svg className={`token-icon${className ? ` ${className}` : ''}`} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2.6 20.2 7.3v9.4L12 21.4 3.8 16.7V7.3Z" />
      <path d="M12 7.4 16 9.7v4.6L12 16.6 8 14.3V9.7Z" />
    </svg>
  )
}
