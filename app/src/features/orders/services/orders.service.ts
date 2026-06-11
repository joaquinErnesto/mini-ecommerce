import type { CartItem }
from "../../cart/types/cart.types"
import type { ShippingInfo } from "../../checkout/types/checkout.types"
import type { Order }
from "../types/order.types"

import {
  getOrdersByUser,
  saveOrderForUser
} from "../utils/ordersStorage"

/**
 * CREATE ORDER
 */
export const createOrder = (
  userId: number,
  items: CartItem[],
  shipping: ShippingInfo
) => {

  const order: Order = {
    id: `ORD-${Date.now()}`,

    userId,

    items: items.map(item => ({
      productId: item.id,
      title: item.title,
      image: item.image,
      quantity: item.quantity,
      price: item.price
    })),

    totalItems: items.reduce(
      (acc, item) => acc + item.quantity,
      0
    ),

    total: items.reduce(
      (acc, item) =>
        acc + item.price * item.quantity,
      0
    ),

    status: "Processed",

    date: new Date().toLocaleDateString(),

    shipping
  }

  saveOrderForUser(
    userId,
    order
  )

  return order
}

/**
 * GET USER ORDERS
 */
export const getUserOrders = (
  userId: number
): Order[] => {

  return getOrdersByUser(
    userId
  )
}

/**
 * GET ORDER BY ID
 */
export const getOrderById = (
  userId: number,
  orderId: string
): Order | undefined => {

  const orders =
    getOrdersByUser(userId)

  return orders.find(
    (order) => order.id === orderId
  )
}