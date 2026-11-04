import React from "react";
import { useNavigate } from "react-router-dom";

import { CartList } from "../components/CartList/CartList";
import { OrderSummary } from "../components/OrderSummary/OrderSummary";
import { EmptyCart } from "../components/EmptyCart/EmptyCart";

import { useCart } from "../context/useCart";
import { useAuth } from "../../auth/context/useAuth";

import "./CartPage.css";

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;

  if (items.length === 0) {
    return <EmptyCart />
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };
  
  return (
    <div className="cart-page">
      <h1>Shopping Bag</h1>
      <p>{items.length} items</p>

      <div className="cart-layout">
        <div className="cart-left">
          <CartList
            items={items}
            onUpdate={updateQuantity}
            onRemove={removeItem}
          />
        </div>

        <div className="cart-right">
          <OrderSummary subtotal={subtotal} tax={tax} shipping={0} />
        </div>
      </div>
    </div>
  );
};