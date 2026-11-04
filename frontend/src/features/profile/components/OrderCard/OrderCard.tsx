import type { Order } from "../../../orders/types/order.types"

import "./OrderCard.css"

interface Props {
  order: Order
}

export const OrderCard = ({ order }: Props) => {
  return (
    <article className="order-card-container">
      {/* <img
        src={order.image}
        alt={order.productName}
      /> */}

      <div className="order-card-info">
        <h3>
          {order.productName}
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