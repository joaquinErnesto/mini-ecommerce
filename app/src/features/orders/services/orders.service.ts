import type { CartItem }
from "../../cart/types/cart.types"

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
  items: CartItem[]
) => {

  const existingOrders =
    getOrdersByUser(userId)

  const newOrders: Order[] =
    items.map((item) => ({
      id:
        `ORD-${Date.now()}-${item.id}`,

      userId,

      productName:
        item.title,

      image:
        item.image,

      quantity:
        item.quantity,

      total:
        item.price *
        item.quantity,

      status:
        "Processed",

      date:
        new Date()
          .toLocaleDateString()
    }))

  newOrders.forEach(
    (order: Order) => {

      saveOrderForUser(
        userId,
        order
      )
    }
  )

  return [
    ...newOrders,
    ...existingOrders
  ]
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