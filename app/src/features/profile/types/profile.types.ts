import type { Order }
from "../../orders/types/order.types"

export interface UserPreferences {
  newsletter: boolean
  pushNotifications: boolean
  twoFactorAuth: boolean
}

export interface ProfileData {
  fullName: string
  email: string
  phone: string
  location: string
  role: string
  image: string

  preferences: UserPreferences

  orders: Order[]
}