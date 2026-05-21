import { apiClient } from "../../../services/apiClient"

import type {
  ProfileData,
  OrderItem,
  UserPreferences
} from "../types/profile.types"

// -----------------------------
// Helpers
// -----------------------------

const mapPreferences = (): UserPreferences => {
  return {
    newsletter: true,
    pushNotifications: false,
    twoFactorAuth: true
  }
}

const mapOrders = (): OrderItem[] => {
  return [
    {
      id: "EN-98210",
      productName: "Neon Stryde V2",
      image: "https://dummyjson.com/image/300",
      date: "May 14, 2026",
      status: "Delivered",
      total: 249
    },
    {
      id: "EN-97554",
      productName: "Midnight Chronograph",
      image: "https://dummyjson.com/image/300",
      date: "April 28, 2026",
      status: "Processed",
      total: 595
    }
  ]
}

// -----------------------------
// Get Profile Data
// -----------------------------

export const getProfile = async (): Promise<ProfileData> => {
  try {
    const response = await apiClient.get("/auth/me")

    const user = response.data

    return {
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      location: user.address?.city || "Unknown",
      role: user.role || "Customer",
      image: user.image,

      preferences: mapPreferences(),

      orders: mapOrders()
    }
  } catch (error) {
    console.error("Error fetching profile:", error)

    throw error
  }
}