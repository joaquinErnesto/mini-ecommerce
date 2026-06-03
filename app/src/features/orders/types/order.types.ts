export type OrderStatus =
  | "Pending"
  | "Processed"
  | "Delivered"
  | "Cancelled"

export interface Order {
  id: string

  userId: number

  productName: string

  image: string

  quantity: number

  total: number

  status: OrderStatus

  date: string
}