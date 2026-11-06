import { Link } from "react-router-dom"

import type { Order } from "../../types/order.types"

import { OrderStatusBadge } from "../OrderStatusBadge/OrderStatusBadge"

import "./OrderDetailHeader.css"

interface Props {
  order: Order
}

export const OrderDetailHeader = ({ order }: Props) => {
  return (
    <header className="order-detail-hero">
      <Link className="order-detail-back" to="/profile/orders">
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_back
        </span>
        All orders
      </Link>

      <p className="order-detail-kicker">Order details</p>

      <div className="order-detail-title-row">
        <div>
          <h1>
            Order <span className="order-detail-id">#{order.id}</span>
          </h1>

          <p className="order-detail-meta">
            <span>Placed {order.date}</span>
            <span className="order-detail-meta-line" aria-hidden="true" />
            <span>
              {order.totalItems}{" "}
              {order.totalItems === 1 ? "item" : "items"}
            </span>
          </p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>
    </header>
  )
}
