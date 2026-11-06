import type { Order } from "../../../orders/types/order.types"

import "./OrderCard.css"

interface Props {
  order: Order
}

export const OrderCard = ({ order }: Props) => {
  const firstItem = order.items[0]
  const extraItems = Math.max(order.items.length - 1, 0)

  return (
    <article className="order-card-container">
      {firstItem?.image ? (
        <img
          src={firstItem.image}
          alt=""
        />
      ) : null}

      <div className="order-card-info">
        <h3>
          {firstItem?.title ?? "Order"}
          {extraItems > 0 ? ` + ${extraItems} more` : ""}
        </h3>

        <p>
          Order #{order.id} • {order.date}
        </p>
      </div>

      <span className={`status ${order.status.toLowerCase()}`}>
        {order.status}
      </span>

      <strong>
        ${order.total}
      </strong>
    </article>
  )
}
