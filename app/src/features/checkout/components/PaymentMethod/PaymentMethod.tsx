import "./PaymentMethod.css";
import { useState } from "react";
import { useCheckout } from "../../context/useCheckout";
import { PaymentOption } from "../PaymentOption/PaymentOption";

export const PaymentMethod = () => {
  const { setPayment, setStep } = useCheckout()

  const [selected, setSelected] = useState("Card")

  const handleSelect = (method: string) => {
    setSelected(method)
  }

  const handleContinue = () => {
    setPayment({
      cardNumber: "demo",
      cardHolder: selected,
      expiry: "12/30"
    })

    setStep(3)
  }

  return (
    <div className="payment-method">
      <h2>Payment Method</h2>

      <div className="options">
        <PaymentOption 
          label="Card"
          selected={selected === "Card"} 
          onClick={() => handleSelect("Card")}
        />

        <PaymentOption 
          label="Crypto" 
          selected={selected === "Crypto"}
          onClick={() => handleSelect("Crypto")}
        />

        <PaymentOption 
          label="Transfer"
          selected={selected === "Transfer"}
          onClick={() => handleSelect("Transfer")}
        />
      </div>

      <div className="action-buttons">
        <button onClick={() => setStep(1)}>
          Back
        </button>
        
        <button onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};