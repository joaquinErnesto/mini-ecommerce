import { useNavigate } from "react-router-dom"

import { useAuth } from "../../../auth/context/useAuth"
import { formatPrice } from "../../../products/utils/productFormat"

import "./OrderSummary.css"

interface Props {
  subtotal: number
  tax: number
  shipping: number
}

export const OrderSummary = ({
  subtotal,
  tax,
  shipping,
}: Props) => {
  const total = subtotal + tax + shipping

  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleCheckout = () => {
    if (subtotal === 0) return

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: "/checkout"
        }
      })

      return
    }

    navigate("/checkout")
  }

  return (
    <aside
      className="cart-summary"
      aria-labelledby="cart-summary-title"
    >
      <div className="cart-summary-head">
        <h2 id="cart-summary-title">Order summary</h2>

        <span className="cart-summary-pill">
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            lock
          </span>
          Secure
        </span>
      </div>

      <dl className="cart-summary-rows">
        <div className="cart-summary-row">
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>

        <div className="cart-summary-row">
          <dt>Tax (8%)</dt>
          <dd>{formatPrice(tax)}</dd>
        </div>

        <div className="cart-summary-row">
          <dt>Shipping</dt>
          <dd className="is-free">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </dd>
        </div>
      </dl>

      <div className="cart-summary-total">
        <span>Total</span>
        <strong>{formatPrice(total)}</strong>
      </div>

      <p className="cart-summary-note">
        <span
          className="material-symbols-outlined"
          aria-hidden="true"
        >
          {isAuthenticated ? "lock" : "login"}
        </span>

        {isAuthenticated
          ? "Encrypted checkout. Your details stay private."
          : "You'll sign in to finish checkout."}
      </p>

      <button
        type="button"
        className="cart-checkout"
        onClick={handleCheckout}
        disabled={subtotal === 0}
      >
        Proceed to checkout
        <span
          className="material-symbols-outlined"
          aria-hidden="true"
        >
          arrow_forward
        </span>
      </button>
    </aside>
  )
}
