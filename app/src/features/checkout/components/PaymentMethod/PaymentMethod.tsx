import "./PaymentMethod.css";
import { PaymentOption } from "../PaymentOption/PaymentOption";

export const PaymentMethod = () => {
  return (
    <div className="payment-method">
      <h2>Payment Method</h2>

      <div className="options">
        <PaymentOption label="Card" selected />
        <PaymentOption label="Crypto" />
        <PaymentOption label="Transfer" />
      </div>
    </div>
  );
};