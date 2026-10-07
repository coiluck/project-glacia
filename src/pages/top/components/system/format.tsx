import { Fragment, type ReactNode } from 'react'

// 「未読{0}件」の {0} {1} … に数字を入れ、数字だけ <b> で強調する
export function withNumbers(template: string, ...values: number[]): ReactNode {
  return template.split(/\{(\d+)\}/).map((part, i) =>
    i % 2 === 0 ? (
      <Fragment key={i}>{part}</Fragment>
    ) : (
      <b key={i}>{values[Number(part)]?.toLocaleString()}</b>
    ),
  )
}
