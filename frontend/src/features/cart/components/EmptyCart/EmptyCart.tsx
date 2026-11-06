import { Link } from "react-router-dom"

import "./EmptyCart.css"

export const EmptyCart = () => {
  return (
    <section
      className="cart-empty"
      aria-labelledby="cart-empty-title"
    >
      <div className="cart-empty-plate" aria-hidden="true">
        <span className="material-symbols-outlined">shopping_bag</span>
      </div>

      <div className="cart-empty-copy">
        <h2 id="cart-empty-title">Your bag is empty.</h2>

        <p>
          Start with this week's short list. A handful of pieces, chosen for
          the way they look and the way they last.
        </p>

        <div className="cart-empty-actions">
          <Link className="cart-button" to="/products">
            Browse the catalogue
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </Link>

          <Link className="cart-button cart-button--ghost" to="/">
            Back home
          </Link>
        </div>
      </div>
    </section>
  )
}
