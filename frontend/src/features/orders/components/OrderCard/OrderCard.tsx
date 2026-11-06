import { Link } from "react-router-dom"

import { formatPrice } from "../../../products/utils/productFormat"

import type { Order } from "../../types/order.types"

import { OrderImage } from "../OrderImage/OrderImage"
import { OrderStatusBadge } from "../OrderStatusBadge/OrderStatusBadge"

import "./OrderCard.css"

interface Props {
  order: Order
}

export const OrderCard = ({ order }: Props) => {
  const firstItem = order.items[0]
  const extraItems = Math.max(order.items.length - 1, 0)

  return (
    <article className="order-card">
      <Link
        className="order-card-link"
        to={`/profile/orders/${order.id}`}
      >
        <OrderImage images={order.items.map((item) => item.image)} />

        <div className="order-card-body">
          <div className="order-card-top">
            <h3>Order #{order.id}</h3>
            <OrderStatusBadge status={order.status} />
          </div>

          <p className="order-card-summary">
            {firstItem?.title ?? "Order"}
            {extraItems > 0 ? ` + ${extraItems} more` : ""}
          </p>

          <div className="order-card-meta">
            <span>{order.date}</span>
            <span>
              {order.totalItems}{" "}
              {order.totalItems === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="order-card-aside">
          <span className="order-card-total">
            {formatPrice(order.total)}
          </span>

          <span className="order-card-arrow" aria-hidden="true">
            <span className="material-symbols-outlined">
              north_east
            </span>
          </span>
        </div>
      </Link>
    </article>
  )
}
