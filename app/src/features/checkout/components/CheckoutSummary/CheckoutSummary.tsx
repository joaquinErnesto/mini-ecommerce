import "./CheckoutSummary.css";
import { useCart } from "../../../cart/context/useCart";
import { SummaryItem } from "../SummaryItem/SummaryItem";

export const CheckoutSummary = () => {
  const { items } = useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

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

      <button className="checkout-btn">
        Place Order
      </button>
    </div>
  );
};