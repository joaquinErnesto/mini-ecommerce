import "./CheckoutSummary.css";
import { useCart } from "../../../cart/context/useCart";
import { useCheckout } from "../../context/useCheckout";
import { SummaryItem } from "../SummaryItem/SummaryItem";
import { useState } from "react";

export const CheckoutSummary = () => {
  const { items, clearCart } = useCart();
  const { state, resetCheckout } = useCheckout()
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlerOrder = async () => {
    if (!isValid) return

    setStatus("loading")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
    
      console.log("ORDER:", {
        items,
        shipping: state.shipping,
        payment: state.payment
      })

      setStatus("success")

      clearCart()
      resetCheckout()
    } catch (err) {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="success-state">
        <h2>
          Order placed successfully!
        </h2>

        <p>
          Thank you for your purchase.
        </p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="error-state">
        <h2>
          Something went wrong
        </h2>

        <button onClick={() => setStatus("idle")}>
          Try again
        </button>
      </div>
    )
  }

  const isValid = items.length > 0 && state.shipping.fullName && state.payment.cardHolder

  return (
    <div className="summary">
      <h2>Order Summary</h2>

      {items.map((item) => (
        <SummaryItem key={item.id} item={item} />
      ))}

      {items.length === 0 && (
        <p className="empty-message">
          Your cart is empty
        </p>
      )}

      <div className="totals">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      <button 
        className="checkout-btn"
        onClick={handlerOrder}
        disabled={!isValid || status === "loading"}
      >
        {status === "loading" ? "Placing order..." : "Place Order"}
      </button>
    </div>
  );
};