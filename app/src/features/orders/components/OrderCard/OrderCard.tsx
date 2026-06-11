import { useNavigate } from "react-router-dom"

import "./OrderCard.css"

import {
  OrderStatusBadge
}
from "../OrderStatusBadge/OrderStatusBadge"

import type {
  Order
}
from "../../types/order.types"

interface Props {
  order: Order
}

export const OrderCard = ({
  order
}: Props) => {

  const navigate = useNavigate()

  return (
    <article 
      className="order-card"
      onClick={() =>
        navigate(
          `/profile/orders/${order.id}`
        )
      }
    >

      <div className="order-card-left">

        <div
          className="order-card-info"
        >

          <div
            className="order-card-top"
          >

            <h3>
              #{order.id}
            </h3>

            <OrderStatusBadge
              status={
                order.status
              }
            />

          </div>

          <p>
            {order.items[0]?.title}

            {order.items.length > 1 && (
              ` + ${order.items.length - 1} more`
            )}
          </p>

          <div
            className="order-card-meta"
          >

            <span>
              {order.date}
            </span>

            <span>
              Items: {order.totalItems}
            </span>

          </div>

        </div>

      </div>

    </article>
  )
}