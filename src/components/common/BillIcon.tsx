interface BillIconProps {
  className: string
}

// 紙幣アイコン
export default function BillIcon({ className }: BillIconProps) {
  return (
    <span className={`bill-icon ${className}`} aria-hidden>
      <span />
      <span />
    </span>
  )
}
