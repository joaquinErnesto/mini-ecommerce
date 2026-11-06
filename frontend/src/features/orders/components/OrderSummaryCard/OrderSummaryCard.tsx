import { formatPrice } from "../../../products/utils/productFormat"

import "./OrderSummaryCard.css"

interface Props {
  totalItems: number
  total: number
}

export const OrderSummaryCard = ({
  totalItems,
  total,
}: Props) => {
  return (
    <section
      className="order-summary-card"
      aria-labelledby="order-summary-title"
    >
      <header className="order-summary-head">
        <h2 id="order-summary-title">Order summary</h2>

        <span className="order-summary-pill">
          <span className="material-symbols-outlined" aria-hidden="true">
            verified
          </span>
          Recorded
        </span>
      </header>

      <dl className="order-summary-rows">
        <div>
          <dt>Items</dt>
          <dd>{totalItems}</dd>
        </div>

        <div className="order-summary-total">
          <dt>Order total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      <p className="order-summary-note">
        <span className="material-symbols-outlined" aria-hidden="true">
          lock
        </span>
        Saved to your account and ready for reference.
      </p>
    </section>
  )
}
