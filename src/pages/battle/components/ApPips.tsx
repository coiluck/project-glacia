interface ApPipsProps {
  max: number
  current: number
  spend?: number // 予告中の消費。残りの末尾から spend 個を点滅させる
  size?: 'small' | 'tiny' // 省略時はHUD用の大きさ。small はユニットカード、tiny は盤面上
}

// APの目盛り
export default function ApPips({ max, current, spend = 0, size }: ApPipsProps) {
  return (
    <span className={`battle-pips${size ? ` is-${size}` : ''}`}>
      {Array.from({ length: max }, (_, i) => {
        const on = i < current
        const willSpend = on && i >= current - spend
        return <i key={i} className={`${on ? 'is-on' : ''}${willSpend ? ' is-spend' : ''}`} />
      })}
    </span>
  )
}
