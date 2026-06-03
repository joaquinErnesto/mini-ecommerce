import "./OrderCard.css"

import {
  OrderImage
}
from "../OrderImage/OrderImage"

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

  return (
    <article className="order-card">

      <div className="order-card-left">

        <OrderImage
          image={order.image}
          productName={
            order.productName
          }
        />

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
            {order.productName}
          </p>

          <div
            className="order-card-meta"
          >

            <span>
              {order.date}
            </span>

            <span>
              Qty: {order.quantity}
            </span>

          </div>

        </div>

      </div>

      <div
        className="order-card-right"
      >

        <span
          className="order-total"
        >
          $
          {order.total.toFixed(
            2
          )}
        </span>

        <button>
          Details
        </button>

      </div>

    </article>
  )
}