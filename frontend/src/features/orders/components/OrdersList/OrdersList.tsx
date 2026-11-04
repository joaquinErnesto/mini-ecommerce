import "./OrdersList.css"

import type {
  Order
}
from "../../types/order.types"

import {
  OrderCard
}
from "../OrderCard/OrderCard"

interface Props {
  orders: Order[]
}

export const OrdersList = ({
  orders
}: Props) => {

  return (
    <div className="orders-list">

      {orders.map((order) => (

        <OrderCard
          key={order.id}
          order={order}
        />

      ))}

    </div>
  )
}