import { useEffect, useState } from "react"

import { useAuth }
from "../../auth/context/useAuth"

import {
  getUserOrders
}
from "../services/orders.service"

import type {
  Order
}
from "../types/order.types"

export const useOrders = () => {

  const { user } = useAuth()

  const [orders, setOrders] =
    useState<Order[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {

    if (!user) {
      setLoading(false)
      return
    }

    try {

      const data =
        getUserOrders(user.id)

      setOrders(data)

    } catch {

      setError(
        "Failed loading orders."
      )

    } finally {

      setLoading(false)

    }

  }, [user])

  return {
    orders,
    loading,
    error
  }
}