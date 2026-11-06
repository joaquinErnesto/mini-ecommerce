import { Link } from "react-router-dom"

import { useCart } from "../../../cart/context/useCart"
import { formatPrice } from "../../../products/utils/productFormat"
import { SummaryItem } from "../SummaryItem/SummaryItem"

import "./CheckoutSummary.css"

export const CheckoutSummary = () => {
  const { items } = useCart()

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const tax = subtotal * 0.08
  const total = subtotal + tax

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  return (
    <aside
      className="checkout-summary"
      aria-labelledby="checkout-summary-title"
    >
      <div className="checkout-summary-head">
        <div>
          <h2 id="checkout-summary-title">Your order</h2>
          <p>
            {totalItems} {totalItems === 1 ? "piece" : "pieces"}
          </p>
        </div>

        <span className="checkout-summary-pill">
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            lock
          </span>
          Secure
        </span>
      </div>

      {items.length > 0 ? (
        <div className="checkout-summary-items">
          {items.map((item) => (
            <SummaryItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="checkout-summary-empty">
          Your bag is empty.
        </p>
      )}

      <dl className="checkout-summary-rows">
        <div className="checkout-summary-row">
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>

        <div className="checkout-summary-row">
          <dt>Tax (8%)</dt>
          <dd>{formatPrice(tax)}</dd>
        </div>

        <div className="checkout-summary-row">
          <dt>Shipping</dt>
          <dd className="is-free">Free</dd>
        </div>
      </dl>

      <div className="checkout-summary-total">
        <span>Total</span>
        <strong>{formatPrice(total)}</strong>
      </div>

      <p className="checkout-summary-note">
        <span
          className="material-symbols-outlined"
          aria-hidden="true"
        >
          lock
        </span>
        Encrypted checkout. Your details stay private.
      </p>

      <Link
        className="checkout-summary-edit"
        to="/cart"
      >
        Edit bag
        <span
          className="material-symbols-outlined"
          aria-hidden="true"
        >
          arrow_forward
        </span>
      </Link>
    </aside>
  )
}
