import "./PaymentMethod.css";
import { useState } from "react";
import { useCheckout } from "../../context/useCheckout";
import { PaymentOption } from "../PaymentOption/PaymentOption";

export const PaymentMethod = () => {
  const { setPayment, setStep } = useCheckout()

  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (method: string) => {
    setSelected(method)
  }

  const handleContinue = () => {
    if (!selected) return
    
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
        <button 
          className="btn-secondary" 
          onClick={() => setStep(1)}
        >
          Back
        </button>
        
        <button 
          className="btn-primary"
          onClick={handleContinue}
          disabled={!selected}
        >
          Continue
        </button>
      </div>
    </div>
  );
};