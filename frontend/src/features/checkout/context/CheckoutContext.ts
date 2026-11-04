import { createContext } from "react";
import type { CheckoutState, ShippingInfo, PaymentInfo } from "../types/checkout.types";

export interface CheckoutContextType {
  state: CheckoutState;
  setStep: (step: number) => void;
  setShipping: (data: ShippingInfo) => void;
  setPayment: (data: PaymentInfo) => void;
  resetCheckout: () => void;
}

export const CheckoutContext = createContext<CheckoutContextType | null>(null);