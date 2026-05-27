export interface Order {
  id: string
  userId: number

  productName: string
  image: string

  quantity: number
  total: number

  status: "Pending" | "Processed" | "Delivered"

  date: string
}