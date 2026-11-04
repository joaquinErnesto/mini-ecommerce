import { useNavigate } from "react-router-dom"

import { getSession }
from "../../auth/utils/authStorage"

import {
  getOrdersByUser
}
from "../../orders/utils/ordersStorage"

import "./OrderSuccessPage.css"

export const OrderSuccessPage = () => {

  const navigate = useNavigate()

  const session = getSession()

  if (!session) {
    navigate("/")
    return null
  }

  const orders =
    getOrdersByUser(
      session.user.id
    )

  const latestOrder =
    orders[0]

  if (!latestOrder) {
    navigate("/")
    return null
  }

  return (
    <div className="order-success-page">

      <div className="success-card">

        <h1>
          ✓ Order Confirmed
        </h1>

        <div className="success-details">

          <div>
            <span>Order Number</span>
            <strong>{latestOrder.id}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>{latestOrder.date}</strong>
          </div>

          <div>
            <span>Total</span>
            <strong>
              ${latestOrder.total.toFixed(2)}
            </strong>
          </div>

          <div>
            <span>Items</span>
            <strong>
              {latestOrder.totalItems}
            </strong>
          </div>

          <div>
            <span>Shipping To</span>
            <strong>
              {latestOrder.shipping.fullName}
            </strong>
          </div>

        </div>

        <div className="success-actions">

          <button
            onClick={() =>
              navigate("/profile/orders")
            }
          >
            View My Orders
          </button>

          <button
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  )
}