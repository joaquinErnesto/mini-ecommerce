import { apiClient } from "../../../services/apiClient"

import { getOrdersByUser } from "../../orders/utils/ordersStorage"

import { getSession } from "../../auth/utils/authStorage"

import type {
  ProfileData,
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

// -----------------------------
// Get Profile Data
// -----------------------------

export const getProfile = async (): Promise<ProfileData> => {

  try {

    const response =
      await apiClient.get("/auth/me")

    const user = response.data

    /**
     * Current authenticated session
     */
    const session =
      getSession()

    /**
     * User orders
     */
    const orders =
      session
        ? getOrdersByUser(
            session.user.id
          )
        : []

    return {

      fullName:
        `${user.firstName} ${user.lastName}`,

      email: user.email,

      phone: user.phone,

      location:
        user.address?.city || "Unknown",

      role:
        user.role || "Customer",

      image: user.image,

      preferences:
        mapPreferences(),

      orders
    }

  } catch (error) {

    console.error(
      "Error fetching profile:",
      error
    )

    throw error
  }
}