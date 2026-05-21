export interface OrderItem {
  id: string
  productName: string
  image: string
  date: string
  status: "Delivered" | "Processed" | "Pending"
  total: number
}

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
  orders: OrderItem[]
}
