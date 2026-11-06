import { useState } from "react"
import { Link } from "react-router-dom"

import { useOrders } from "../hooks/useOrders"

import { OrdersHeader } from "../components/OrdersHeader/OrdersHeader"
import { OrdersStats } from "../components/OrdersStats/OrdersStats"
import {
  OrdersFilters,
  type OrderFilter,
} from "../components/OrdersFilters/OrdersFIlters"
import { OrdersList } from "../components/OrdersList/OrdersList"
import { OrdersEmptyState } from "../components/OrdersEmptyState/OrdersEmptyState"

import "./OrdersPage.css"

const SKELETON_COUNT = 3

export const OrdersPage = () => {
  const { orders, loading, error, refetch } = useOrders()

  const [activeFilter, setActiveFilter] = useState<OrderFilter>("All")

  const counts: Record<OrderFilter, number> = {
    All: orders.length,
    Pending: orders.filter((order) => order.status === "Pending").length,
    Processed: orders.filter((order) => order.status === "Processed").length,
    Delivered: orders.filter((order) => order.status === "Delivered").length,
    Cancelled: orders.filter((order) => order.status === "Cancelled").length,
  }

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter((order) => order.status === activeFilter)

  return (
    <div className="orders-page">
      <OrdersHeader />

      {loading ? (
        <>
          <div className="orders-list-skeleton" aria-hidden="true">
            {Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <div className="orders-skeleton-card" key={index}>
                <div className="orders-skeleton-media orders-skeleton-block" />

                <div className="orders-skeleton-copy">
                  <span className="orders-skeleton-block orders-skeleton-line orders-skeleton-line--short" />
                  <span className="orders-skeleton-block orders-skeleton-line" />
                  <span className="orders-skeleton-block orders-skeleton-line orders-skeleton-line--tiny" />
                </div>
              </div>
            ))}
          </div>

          <p className="orders-visually-hidden" role="status">
            Loading orders
          </p>
        </>
      ) : error ? (
        <div className="orders-state" role="alert">
          <span className="material-symbols-outlined" aria-hidden="true">
            cloud_off
          </span>

          <h2>We couldn't load your orders.</h2>
          <p>Something interrupted the request. Try again in a moment.</p>

          <div className="orders-state-actions">
            <button type="button" className="orders-button" onClick={refetch}>
              Try again
            </button>

            <Link
              className="orders-button orders-button--ghost"
              to="/products"
            >
              Browse products
            </Link>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <OrdersEmptyState
          hasOrders={false}
          filter={activeFilter}
          onReset={() => setActiveFilter("All")}
        />
      ) : (
        <>
          <OrdersStats
            total={orders.length}
            pending={counts.Pending}
            delivered={counts.Delivered}
            processed={counts.Processed}
            cancelled={counts.Cancelled}
          />

          <OrdersFilters
            activeFilter={activeFilter}
            counts={counts}
            onChange={setActiveFilter}
          />

          <div className="orders-results-head">
            <p>
              {activeFilter === "All"
                ? "All orders"
                : `${activeFilter} orders`}
            </p>
            <span>
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1 ? "order" : "orders"}
            </span>
          </div>

          {filteredOrders.length === 0 ? (
            <OrdersEmptyState
              hasOrders
              filter={activeFilter}
              onReset={() => setActiveFilter("All")}
            />
          ) : (
            <OrdersList orders={filteredOrders} />
          )}
        </>
      )}
    </div>
  )
}
