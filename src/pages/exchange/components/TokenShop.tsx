import { useState } from 'react'
import { TOKEN_PRICE } from '../../../data/exchange'
import BillIcon from '../../../components/common/BillIcon'
import TokenIcon from './TokenIcon'

const STEP = 10
const BIG_STEP = 100

type Props = {
  open: boolean
  currency: number
  pending: boolean
  labels: { purchase: string; cost: string; buy: string }
  onBuy: (count: number) => void
}

// 紙幣で交換材料を買うパネル
export default function TokenShop({ open, currency, pending, labels, onBuy }: Props) {
  const [count, setCount] = useState(STEP)
  const cost = count * TOKEN_PRICE
  const short = cost > currency

  return (
    <div className={`exchange-shop${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="exchange-shop-inner">
        <div>
          <div className="exchange-caption">PURCHASE</div>
          <div className="exchange-label">{labels.purchase}</div>
        </div>

        {/* レート */}
        <div className="exchange-rate">
          <b>
            <BillIcon className="exchange-bill" />
            {TOKEN_PRICE}
          </b>
          <span className="exchange-rate-arrow" />
          <b>
            <TokenIcon />1
          </b>
        </div>

        {/* 個数 */}
        <div className="exchange-stepper">
          <button
            type="button"
            disabled={count <= STEP}
            onClick={() => setCount(Math.max(STEP, count - STEP))}
          >
            −{STEP}
          </button>
          <div className="exchange-stepper-value">
            <TokenIcon />
            <b>{count.toLocaleString('en-US')}</b>
          </div>
          <button type="button" onClick={() => setCount(count + STEP)}>
            +{STEP}
          </button>
          <button type="button" onClick={() => setCount(count + BIG_STEP)}>
            +{BIG_STEP}
          </button>
        </div>

        <dl className={`exchange-cost${short ? ' is-short' : ''}`}>
          <dt>{labels.cost}</dt>
          <dd>
            <BillIcon className="exchange-bill" />
            <b>{cost.toLocaleString('en-US')}</b>
          </dd>
        </dl>

        <button
          type="button"
          className="exchange-button"
          disabled={pending || short}
          onClick={() => onBuy(count)}
        >
          {labels.buy}
        </button>
      </div>
    </div>
  )
}
