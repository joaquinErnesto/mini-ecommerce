import React from "react";
import { CartList } from "../components/CartList/CartList";
import { OrderSummary } from "../components/OrderSummary/OrderSummary";
import { useCart } from "../context/useCart";
import "./CartPage.css";

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;

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