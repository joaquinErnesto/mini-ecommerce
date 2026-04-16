export interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
}

export interface CheckoutState {
  step: number;
  shipping: ShippingInfo;
  payment: PaymentInfo;
}