import React from "react";
import "./OrderSummary.css";

interface Props {
  subtotal: number;
  tax: number;
  shipping: number;
}

export const OrderSummary: React.FC<Props> = ({
  subtotal,
  tax,
  shipping,
}) => {
  const total = subtotal + tax + shipping;

  return (
    <div className="summary">
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
      </div>

      <hr />

      <div className="summary-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  );
};