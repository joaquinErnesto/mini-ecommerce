export interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export type PaymentMethodType = "Card" | "Crypto" | "Transfer"

export interface PaymentInfo {
  method: PaymentMethodType;

  // Card
  cardNumber?: string;
  cardHolder?: string;
  expMonth?: string;
  expYear?: string;

  // Crypto
  walletAddress?: string;
  network?: string;

  // Transfer
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
}

export interface CheckoutState {
  step: number;
  shipping: ShippingInfo;
  payment: PaymentInfo;
}

export interface SubmitOrderPayload {
  payment: any // we’ll refine later
  shipping: any
  items: any[]
}

export interface SubmitOrderResponse {
  success: boolean
  orderId: string
}