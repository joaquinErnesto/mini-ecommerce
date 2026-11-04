import type {
  OrderItem
}
from "../../types/order.types"

import {
  OrderItemCard
}
from "../OrderItemCard/OrderItemCard"

import "./OrderItemsList.css"

interface Props {
  items: OrderItem[]
}

export const OrderItemsList = ({
  items
}: Props) => {

  return (
    <div className="order-items-list">

      {items.map((item) => (

        <OrderItemCard
          key={item.productId}
          item={item}
        />

      ))}

    </div>
  )
}