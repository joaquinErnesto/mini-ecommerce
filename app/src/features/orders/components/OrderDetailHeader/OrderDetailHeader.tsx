import { useNavigate } from "react-router-dom"

import {
  OrderStatusBadge
}
from "../OrderStatusBadge/OrderStatusBadge"

import type {
  Order
}
from "../../types/order.types"

import "./OrderDetailHeader.css"

interface Props {
  order: Order
}

export const OrderDetailHeader = ({
  order
}: Props) => {

  const navigate =
    useNavigate()

  return (
    <div className="order-detail-header">

      <button
        className="back-button"
        onClick={() =>
          navigate("/profile/orders")
        }
      >
        ← Back to Orders
      </button>

      <div className="header-content">

        <div>

          <h1>
            Order #{order.id}
          </h1>

          <p>
            {order.date}
          </p>

        </div>

        <OrderStatusBadge
          status={order.status}
        />

      </div>

    </div>
  )
}