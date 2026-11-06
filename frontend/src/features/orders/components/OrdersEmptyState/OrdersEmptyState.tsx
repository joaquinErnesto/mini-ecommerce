import { Link } from "react-router-dom"

import type { OrderFilter } from "../OrdersFilters/OrdersFIlters"

import "./OrdersEmptyState.css"

interface Props {
  hasOrders: boolean
  filter: OrderFilter
  onReset: () => void
}

export const OrdersEmptyState = ({
  hasOrders,
  filter,
  onReset,
}: Props) => {
  return (
    <section className="orders-empty">
      <div className="orders-empty-plate" aria-hidden="true">
        <span className="material-symbols-outlined">receipt_long</span>
      </div>

      <div className="orders-empty-copy">
        <h2>
          {hasOrders ? `No ${filter.toLowerCase()} orders.` : "No orders yet."}
        </h2>

        <p>
          {hasOrders
            ? "Nothing sits in this view right now. Clear the filter to see your whole history."
            : "When you place your first order, it will live here with its status, items, and total."}
        </p>

        <div className="orders-empty-actions">
          {hasOrders ? (
            <button type="button" className="orders-button" onClick={onReset}>
              Show all orders
            </button>
          ) : (
            <Link className="orders-button" to="/products">
              Browse the catalogue
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          )}

          <Link
            className="orders-button orders-button--ghost"
            to={hasOrders ? "/products" : "/"}
          >
            {hasOrders ? "Continue shopping" : "Back home"}
          </Link>
        </div>
      </div>
    </section>
  )
}
