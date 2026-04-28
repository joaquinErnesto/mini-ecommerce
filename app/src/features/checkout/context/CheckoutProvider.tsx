import { useState, useEffect } from "react";
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
  const [state, setState] = useState<CheckoutState>(() => {
    try {
      const stored = localStorage.getItem("checkout")
      const parsed = stored ? JSON.parse(stored) : initialState

      if (parsed.step === 2 && !parsed.shipping.fullName) {
        return { ...parsed, step: 1 }
      }

      if (parsed.step === 3 && !parsed.payment.cardHolder) {
        return { ...parsed, step: 2 }
      }

      return parsed
    } catch {
      return initialState
    }
  });

  useEffect(() => {
    localStorage.setItem("checkout", JSON.stringify(state))
  }, [state])

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
    localStorage.removeItem("checkout");
  };

  return (
    <CheckoutContext.Provider
      value={{ state, setStep, setShipping, setPayment, resetCheckout }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};