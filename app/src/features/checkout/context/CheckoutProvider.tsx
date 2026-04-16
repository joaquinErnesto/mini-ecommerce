import { useState } from "react";
import { CheckoutContext } from "./CheckoutContext";
import type { CheckoutState, ShippingInfo, PaymentInfo } from "../types/checkout.types";

const initialState: CheckoutState = {
  step: 1,
  shipping: {
    fullName: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  },
  payment: {
    cardNumber: "",
    cardHolder: "",
    expiry: "",
  },
};

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CheckoutState>(initialState);

  const setStep = (step: number) => {
    setState((prev) => ({ ...prev, step }));
  };

  const setShipping = (data: ShippingInfo) => {
    setState((prev) => ({ ...prev, shipping: data }));
  };

  const setPayment = (data: PaymentInfo) => {
    setState((prev) => ({ ...prev, payment: data }));
  };

  const resetCheckout = () => {
    setState(initialState);
  };

  return (
    <CheckoutContext.Provider
      value={{ state, setStep, setShipping, setPayment, resetCheckout }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};