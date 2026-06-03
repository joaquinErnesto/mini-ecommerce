import "./OrderStatusBadge.css"

import type {
  OrderStatus
}
from "../../types/order.types"

interface Props {
  status: OrderStatus
}

export const OrderStatusBadge = ({
  status
}: Props) => {

  return (
    <span
      className={`order-status-badge status-${status.toLowerCase()}`}
    >
      {status}
    </span>
  )
}