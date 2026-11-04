import type { Order }
from "../types/order.types"

const ORDERS_STORAGE_KEY =
  "user_orders"

type OrdersMap =
  Record<number, Order[]>

/**
 * GET ALL ORDERS
 */
const getOrdersMap =
  (): OrdersMap => {

  try {

    const stored =
      localStorage.getItem(
        ORDERS_STORAGE_KEY
      )

    return stored
      ? JSON.parse(stored)
      : {}

  } catch {

    return {}
  }
}

/**
 * SAVE ALL ORDERS
 */
const saveOrdersMap = (
  ordersMap: OrdersMap
) => {

  localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify(ordersMap)
  )
}

/**
 * GET ORDERS BY USER
 */
export const getOrdersByUser = (
  userId: number
): Order[] => {

  const ordersMap =
    getOrdersMap()

  return (
    ordersMap[userId] || []
  )
}

/**
 * SAVE ORDER FOR USER
 */
export const saveOrderForUser = (
  userId: number,
  order: Order
) => {

  const ordersMap =
    getOrdersMap()

  const currentOrders =
    ordersMap[userId] || []

  ordersMap[userId] = [
    order,
    ...currentOrders
  ]

  saveOrdersMap(ordersMap)
}