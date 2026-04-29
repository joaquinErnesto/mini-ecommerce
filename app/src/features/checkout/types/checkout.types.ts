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
  expiry?: string;

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