import { useState } from "react"
import { Link } from "react-router-dom"

import { useCheckout } from "../../context/useCheckout"
import { useCart } from "../../../cart/context/useCart"

import { SummaryItem } from "../SummaryItem/SummaryItem"

import { submitOrder } from "../../services/checkout.api"
import { createOrder } from "../../../orders/services/orders.service"
import { getSession } from "../../../auth/utils/authStorage"
import { formatPrice } from "../../../products/utils/productFormat"

import toast from "react-hot-toast"

import "./ReviewStep.css"

type ReviewStatus = "idle" | "loading" | "success" | "error"

const getShortValue = (value: string, start = 8, end = 6) => {
  if (value.length <= start + end + 1) return value

  return `${value.slice(0, start)}…${value.slice(-end)}`
}

export const ReviewStep = () => {
  const { state, setStep, resetCheckout } = useCheckout()
  const { items, clearCart } = useCart()

  const [status, setStatus] = useState<ReviewStatus>("idle")

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const tax = subtotal * 0.08
  const total = subtotal + tax

  const payment = state.payment

  const paymentSummary =
    payment.method === "Card"
      ? {
          title: "Card",
          lines: [
            payment.cardHolder || "Card holder saved",
            payment.cardNumber
              ? `Ending in ${payment.cardNumber.replace(/\s/g, "").slice(-4)}`
              : "Card details saved",
          ],
        }
      : payment.method === "Crypto"
        ? {
            title: payment.network || "Crypto",
            lines: [
              payment.walletAddress
                ? getShortValue(payment.walletAddress)
                : "Wallet details saved",
            ],
          }
        : {
            title: payment.bankName || "Bank transfer",
            lines: [
              payment.accountHolder || "Account holder saved",
              payment.accountNumber
                ? `Account ending in ${payment.accountNumber.replace(/\s/g, "").slice(-4)}`
                : "Account details saved",
            ],
          }

  const handleConfirm = async () => {
    setStatus("loading")

    const orderPromise = submitOrder({
      items,
      shipping: state.shipping,
      payment: state.payment,
    })

    toast.promise(orderPromise, {
      loading: "Processing your order...",
      success: "Order confirmed successfully!",
      error: "Payment failed. Please try again.",
    })

    try {
      const response = await orderPromise

      console.log("ORDER SUCCESS:", response)

      const session = getSession()

      if (session) {
        createOrder(session.user.id, items, state.shipping)
      }

      clearCart()
      resetCheckout()

      window.location.href = "/checkout/success"
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("ORDER FAILED:", error.message)
      }

      setStatus("error")
    }
  }

  if (items.length === 0 && status !== "success") {
    return (
      <div className="checkout-state">
        <span className="material-symbols-outlined" aria-hidden="true">
          shopping_bag
        </span>

        <h2>Your bag is empty.</h2>
        <p>Add a piece before checking out.</p>

        <Link className="checkout-button" to="/products">
          Browse the catalogue
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="checkout-state">
        <span className="material-symbols-outlined" aria-hidden="true">
          check_circle
        </span>

        <h2>Order confirmed.</h2>
        <p>We're taking you to the confirmation.</p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="checkout-state checkout-state--error" role="alert">
        <span className="material-symbols-outlined" aria-hidden="true">
          error
        </span>

        <h2>Payment didn't go through.</h2>
        <p>
          Your order wasn't placed and your bag is untouched. Try again or
          head back to the bag.
        </p>

        <div className="checkout-state-actions">
          <button
            type="button"
            className="checkout-button"
            onClick={() => setStatus("idle")}
          >
            Try again
          </button>

          <Link
            className="checkout-button checkout-button--ghost"
            to="/cart"
          >
            Back to bag
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="review-step">
      <header className="checkout-step-head">
        <h2>Review and confirm</h2>
        <p>One last look before we place the order.</p>
      </header>

      <div className="review-grid">
        <section className="review-block">
          <header className="review-block-head">
            <h3>Shipping to</h3>
            <button
              type="button"
              className="checkout-edit"
              onClick={() => setStep(1)}
            >
              Edit
            </button>
          </header>

          <p className="review-strong">{state.shipping.fullName}</p>
          <p>{state.shipping.address}</p>
          <p>
            {state.shipping.city}, {state.shipping.country}{" "}
            {state.shipping.zipCode}
          </p>
        </section>

        <section className="review-block">
          <header className="review-block-head">
            <h3>Payment</h3>
            <button
              type="button"
              className="checkout-edit"
              onClick={() => setStep(2)}
            >
              Edit
            </button>
          </header>

          <p className="review-strong">{paymentSummary.title}</p>

          {paymentSummary.lines.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </section>
      </div>

      <section className="review-items">
        <h3>Items</h3>

        <div className="review-items-list">
          {items.map((item) => (
            <SummaryItem key={item.id} item={item} />
          ))}
        </div>

        <div className="review-totals">
          <div>
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div>
            <span>Tax (8%)</span>
            <span>{formatPrice(tax)}</span>
          </div>

          <div>
            <span>Shipping</span>
            <span className="is-free">Free</span>
          </div>

          <div className="review-total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
        </div>
      </section>

      <div className="checkout-actions">
        <button
          type="button"
          className="checkout-button checkout-button--ghost"
          onClick={() => setStep(2)}
        >
          Back
        </button>

        <button
          type="button"
          className="checkout-button"
          onClick={handleConfirm}
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <span className="checkout-spinner" aria-hidden="true" />
              Processing...
            </>
          ) : (
            <>
              Confirm order
              <span className="material-symbols-outlined" aria-hidden="true">
                check
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
