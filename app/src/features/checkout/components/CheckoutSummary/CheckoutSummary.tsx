import "./CheckoutSummary.css";
import { useCart } from "../../../cart/context/useCart";
import { useCheckout } from "../../context/useCheckout";
import { SummaryItem } from "../SummaryItem/SummaryItem";
import { useState } from "react";

export const CheckoutSummary = () => {
  const { items, clearCart } = useCart();
  const { state, resetCheckout } = useCheckout()
  const [success, setSuccess] = useState(false)

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlerOrder = () => {
    if (!items.length) {
      alert("Cart is empty")

      return
    }

    console.log("ORDER PLACED")

    if (!state.shipping.fullName || !state.payment.cardHolder) {
      alert("Complete checkout steps first")

      return
    }

    console.log("ORDER:", {
      items,
      shipping: state.shipping,
      payment: state.payment
    })

    setSuccess(true)
    clearCart()
    resetCheckout()
  }

  if (success) {
    return <h2>Order placed successfully!</h2>
  }

  const isValid = items.length > 0 && state.shipping.fullName && state.payment.cardHolder

  return (
    <div className="summary">
      <h2>Order Summary</h2>

      {items.map((item) => (
        <SummaryItem key={item.id} item={item} />
      ))}

      <div className="totals">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      <button 
        className="checkout-btn"
        onClick={handlerOrder}
        disabled={!isValid}
      >
        Place Order
      </button>
    </div>
  );
};