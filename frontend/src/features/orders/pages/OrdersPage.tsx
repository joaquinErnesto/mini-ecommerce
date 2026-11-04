import { useState }
from "react"

import {
  useOrders
}
from "../hooks/useOrders"

import {
  OrdersHeader
}
from "../components/OrdersHeader/OrdersHeader"

import {
  OrdersStats
}
from "../components/OrdersStats/OrdersStats"

import {
  OrdersFilters,
  type OrderFilter
}
from "../components/OrdersFilters/OrdersFIlters"

import {
  OrdersList
}
from "../components/OrdersList/OrdersList"

import {
  OrdersEmptyState
}
from "../components/OrdersEmptyState/OrdersEmptyState"

import "./OrdersPage.css"

export const OrdersPage = () => {

  const {
    orders,
    loading,
    error
  } = useOrders()

  const [
    activeFilter,
    setActiveFilter
  ] =
    useState<OrderFilter>(
      "All"
    )

  if (loading) {
    return (
      <div className="orders-loading">
        Loading orders...
      </div>
    )
  }

  if (error) {
    return (
      <div className="orders-error">
        {error}
      </div>
    )
  }

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter(
          (order) =>
            order.status ===
            activeFilter
        )

  const delivered =
    orders.filter(
      (o) =>
        o.status ===
        "Delivered"
    ).length

  const processed =
    orders.filter(
      (o) =>
        o.status ===
        "Processed"
    ).length

  const cancelled =
    orders.filter(
      (o) =>
        o.status ===
        "Cancelled"
    ).length

  return (
    <section
      className="orders-page"
    >

      <OrdersHeader
        totalOrders={
          orders.length
        }
      />

      <OrdersStats
        total={
          orders.length
        }
        delivered={
          delivered
        }
        processed={
          processed
        }
        cancelled={
          cancelled
        }
      />

      <OrdersFilters
        activeFilter={
          activeFilter
        }
        onChange={
          setActiveFilter
        }
      />

      {filteredOrders.length === 0
        ? (
          <OrdersEmptyState />
        )
        : (
          <OrdersList
            orders={
              filteredOrders
            }
          />
        )}

    </section>
  )
}