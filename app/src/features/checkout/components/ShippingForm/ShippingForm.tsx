import "./ShippingForm.css";
import { InputField } from "../InputField/InputField";
import { useState } from "react";
import { useCheckout } from "../../context/useCheckout";

export const ShippingForm = () => {
  const { setShipping, setStep } = useCheckout()

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    country: "",
    zipCode: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = () => {
    // Basic validation
    if (!form.fullName || !form.address) {
      alert("Please fill requiered fields")

      return
    }

    setShipping(form)
    setStep(2)
  }

  return (
    <div className="shipping-form">
      <h2>Shipping Information</h2>

      <div className="grid">
        <InputField 
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange} 
          placeholder="John Doe"
          full 
        />

        <InputField 
          label="Address" 
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="123 Main St" 
          full
        />

        <InputField 
          label="City" 
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="New York" 
          full 
        />

        <InputField 
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="USA" 
        />

        <InputField 
          label="Zip Code" 
          name="zipCode"
          value={form.zipCode}
          onChange={handleChange}
          placeholder="10001" 
        />
      </div>

      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
};