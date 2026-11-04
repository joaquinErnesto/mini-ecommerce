import "./SummaryItem.css";
import type { CartItem } from "../../../cart/types/cart.types";

export const SummaryItem = ({ item }: { item: CartItem }) => {
  return (
    <div className="summary-item">
      <img src={item.image} alt={item.title} />

      <div>
        <p>{item.title}</p>
        <span>x{item.quantity}</span>
      </div>

      <p>${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
};