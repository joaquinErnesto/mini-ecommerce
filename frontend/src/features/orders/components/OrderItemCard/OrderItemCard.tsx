import type {
  OrderItem
}
from "../../types/order.types"

import "./OrderItemCard.css"

interface Props {
  item: OrderItem
}

export const OrderItemCard = ({
  item
}: Props) => {

  return (
    <article className="order-item-card">

      <img
        src={item.image}
        alt={item.title}
      />

      <div>

        <h3>
          {item.title}
        </h3>

        <p>
          Qty: {item.quantity}
        </p>

      </div>

      <strong>
        $
        {(item.price * item.quantity).toFixed(2)}
      </strong>

    </article>
  )
}