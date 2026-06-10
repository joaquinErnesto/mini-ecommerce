export type OrderStatus =
  | "Pending"
  | "Processed"
  | "Delivered"
  | "Cancelled"

export interface OrderItem {
  productId: number
  title: string
  image: string
  quantity: number
  price: number
}

export interface Order {
  id: string

  userId: number

  items: OrderItem[]

  totalItems: number

  total: number

  status: OrderStatus

  date: string

  shipping: {
    fullName: string
    address: string
    city: string
    country: string
    zipCode: string
  }
}