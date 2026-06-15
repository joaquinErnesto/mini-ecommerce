import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../auth/context/useAuth";

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
  
  const handleCheckout = () => {
    if (subtotal === 0) return

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: "/checkout"
        }
      })

      return
    }

    navigate("/checkout")
  }

  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

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

      {!isAuthenticated && (
        <p className="checkout-login-warning">
          Login required to complete your purchase.
        </p>
      )}

      <button 
        className="btn-primary"
        disabled={subtotal === 0}
        onClick={handleCheckout}  
      >
        Proceed to Checkout
      </button>
    </div>
  );
};