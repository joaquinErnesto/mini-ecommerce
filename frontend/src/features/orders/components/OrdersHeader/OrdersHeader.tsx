import { Link } from "react-router-dom"

import "./OrdersHeader.css"

export const OrdersHeader = () => {
  return (
    <header className="orders-hero">
      <p className="orders-kicker">
        <span className="orders-kicker-dot" aria-hidden="true" />
        Order archive
      </p>

      <div className="orders-hero-row">
        <div>
          <h1 className="orders-title">
            Orders
            <span className="orders-title-accent">.</span>
          </h1>

          <p className="orders-lede">
            Every order, from pending to delivered, in one place.
          </p>
        </div>

        <Link className="orders-continue" to="/products">
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
  )
}
