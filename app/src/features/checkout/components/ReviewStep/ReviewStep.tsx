import "./ReviewStep.css";
import { useCheckout } from "../../context/useCheckout";
import { useCart } from "../../../cart/context/useCart";
import { SummaryItem } from "../SummaryItem/SummaryItem";
import { useState } from "react";

export const ReviewStep = () => {
  const { state, setStep, resetCheckout } = useCheckout();
  const { items, clearCart } = useCart();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleConfirm = async () => {
    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("ORDER:", {
        items,
        shipping: state.shipping,
        payment: state.payment
      });

      setStatus("success");
      clearCart();
      resetCheckout();

    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="review-success">
        <h2>🎉 Order confirmed!</h2>
        <p>Your order has been placed successfully.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="review-error">
        <h2>❌ Something went wrong</h2>
        <button onClick={() => setStatus("idle")}>Try again</button>
      </div>
    );
  }

  return (
    <div className="review-step">
      <h2>Review Your Order</h2>

      {/* SHIPPING */}
      <div className="review-section">
        <div className="section-header">
          <h3>Shipping</h3>
          <button onClick={() => setStep(1)}>Edit</button>
        </div>

        <p>{state.shipping.fullName}</p>
        <p>{state.shipping.address}</p>
        <p>
          {state.shipping.city}, {state.shipping.country} {state.shipping.zipCode}
        </p>
      </div>

      {/* PAYMENT */}
      <div className="review-section">
        <div className="section-header">
          <h3>Payment</h3>
          <button onClick={() => setStep(2)}>Edit</button>
        </div>

        <p>{state.payment.cardHolder}</p>
        <p>**** **** **** 1234</p>
      </div>

      {/* ITEMS */}
      <div className="review-section">
        <h3>Items</h3>

        {items.map((item) => (
          <SummaryItem key={item.id} item={item} />
        ))}

        <div className="totals">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="review-actions">
        <button
          className="btn-secondary" 
          onClick={() => setStep(2)}
        >
            Back
        </button>

        <button
          className="btn-primary"
          onClick={handleConfirm}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};