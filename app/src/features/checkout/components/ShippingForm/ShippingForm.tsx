import "./ShippingForm.css";
import { InputField } from "../InputField/InputField";

export const ShippingForm = () => {
  return (
    <div className="shipping-form">
      <h2>Shipping Information</h2>

      <div className="grid">
        <InputField label="First Name" placeholder="John" />
        <InputField label="Last Name" placeholder="Doe" />
        <InputField label="Address" placeholder="123 Main St" full />
        <InputField label="City" placeholder="New York" />
        <InputField label="Postal Code" placeholder="10001" />
      </div>
    </div>
  );
};