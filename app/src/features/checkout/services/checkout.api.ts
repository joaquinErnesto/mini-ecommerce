import type {
  SubmitOrderPayload,
  SubmitOrderResponse
} from "../types/checkout.types"

// 🔥 Utility: simulate delay
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

// 🔥 Utility: random failure (realistic behavior)
const shouldFail = () => Math.random() < 0.2 // 20% failure

export const submitOrder = async (
  payload: SubmitOrderPayload
): Promise<SubmitOrderResponse> => {

  console.log("📦 Sending order to fake API:", payload)

  await delay(1500) // simulate network latency

  if (shouldFail()) {
    throw new Error("Payment failed. Please try again.")
  }

  return {
    success: true,
    orderId: `ORD-${Date.now()}`
  }
}