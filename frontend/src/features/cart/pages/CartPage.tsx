import { Link } from "react-router-dom"

import { CartList } from "../components/CartList/CartList"
import { OrderSummary } from "../components/OrderSummary/OrderSummary"
import { EmptyCart } from "../components/EmptyCart/EmptyCart"

import { useCart } from "../context/useCart"

import "./CartPage.css"

export const CartPage = () => {
  const { items, updateQuantity, removeItem } = useCart()

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const tax = subtotal * 0.08

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  const isEmpty = items.length === 0

  return (
    <div className="cart-page">
      <header className="cart-hero">
        <p className="cart-kicker">
          <span className="cart-kicker-dot" aria-hidden="true" />
          The bag
        </p>

        <div className="cart-hero-row">
          <div>
            <h1 className="cart-title">
              Your bag
              <span className="cart-title-accent">.</span>
            </h1>

            <p className="cart-lede">
              {isEmpty
                ? "Nothing here yet. The short list is waiting."
                : "A small edit, held for you. Adjust quantities or remove a piece before checkout."}
            </p>

            {!isEmpty ? (
              <p className="cart-meta">
                {totalItems} {totalItems === 1 ? "piece" : "pieces"} in your bag
              </p>
            ) : null}
          </div>

          <Link className="cart-continue" to="/products">
            Continue shopping
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </Link>
        </div>
      </header>

      {isEmpty ? (
        <EmptyCart />
      ) : (
        <div className="cart-layout">
          <div className="cart-left">
            <CartList
              items={items}
              onUpdate={updateQuantity}
              onRemove={removeItem}
            />
          </div>

          <div className="cart-right">
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              shipping={0}
            />
          </div>
        </div>
      )}
    </div>
  )
}
