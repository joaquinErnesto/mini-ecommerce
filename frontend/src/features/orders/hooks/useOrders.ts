import { useEffect, useState } from "react"

import { useAuth } from "../../auth/context/useAuth"

import { getUserOrders } from "../services/orders.service"

import type { Order } from "../types/order.types"

export const useOrders = () => {
  const { user } = useAuth()

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = getUserOrders(user.id)

      setOrders(data)
    } catch {
      setError("Failed loading orders.")
    } finally {
      setLoading(false)
    }
  }, [user, reloadKey])

  const refetch = () => {
    setReloadKey((key) => key + 1)
  }

  return {
    orders,
    loading,
    error,
    refetch,
  }
}
