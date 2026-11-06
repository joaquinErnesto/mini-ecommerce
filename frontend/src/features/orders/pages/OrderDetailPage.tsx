import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { useAuth } from "../../auth/context/useAuth"

import { getOrderById } from "../services/orders.service"

import { OrderDetailHeader } from "../components/OrderDetailHeader/OrderDetailHeader"
import { OrderSummaryCard } from "../components/OrderSummaryCard/OrderSummaryCard"
import { ShippingInfoCard } from "../components/ShippingInfoCard/ShippingInfoCard"
import { OrderItemsList } from "../components/OrderItemsList/OrderItemsList"

import "./OrderDetailPage.css"

const OrderNotFound = () => {
  return (
    <div className="order-detail-page">
      <div className="order-detail-state" role="status">
        <span className="material-symbols-outlined" aria-hidden="true">
          receipt_long
        </span>

        <h1>We couldn't find that order.</h1>

        <p>
          The link may be incomplete, or this order is no longer in your
          archive.
        </p>

        <Link className="order-detail-button" to="/profile/orders">
          Back to orders
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  )
}

export const OrderDetailPage = () => {
  const { id } = useParams()
  const { user } = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!user || !id) {
    return <OrderNotFound />
  }

  const order = getOrderById(user.id, id)

  if (!order) {
    return <OrderNotFound />
  }

  return (
    <div className="order-detail-page">
      <OrderDetailHeader order={order} />

      <div className="order-detail-layout">
        <div className="order-detail-main">
          <section className="order-detail-panel">
            <header className="order-detail-panel-head">
              <h2>Items</h2>
              <span>
                {order.totalItems}{" "}
                {order.totalItems === 1 ? "piece" : "pieces"}
              </span>
            </header>

            <OrderItemsList items={order.items} />
          </section>

          <section className="order-detail-panel">
            <header className="order-detail-panel-head">
              <h2>Shipping</h2>
            </header>

            <ShippingInfoCard order={order} />
          </section>
        </div>

        <aside className="order-detail-aside">
          <OrderSummaryCard
            totalItems={order.totalItems}
            total={order.total}
          />

          <div className="order-detail-help">
            <span className="material-symbols-outlined" aria-hidden="true">
              support_agent
            </span>

            <h3>Need a hand?</h3>
            <p>Questions about this order? Our team can help.</p>

            <Link className="order-detail-help-link" to="/contact">
              Contact support
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
