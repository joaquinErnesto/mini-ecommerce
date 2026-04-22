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

  const [errors, setErrors] = useState<{ [key: string]: string}>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {}

    if (!form.fullName) {
      newErrors.fullName = "Full name is required"
    }

    if (!form.address) {
      newErrors.address = "Address is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

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
          error={errors.fullName}
        />

        <InputField 
          label="Address" 
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="123 Main St" 
          full
          error={errors.address}
        />

        <InputField 
          label="City" 
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="New York" 
          full 
          error={errors.city}
        />

        <InputField 
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="USA"
          error={errors.country} 
        />

        <InputField 
          label="Zip Code" 
          name="zipCode"
          value={form.zipCode}
          onChange={handleChange}
          placeholder="10001"
          error={errors.zipCode} 
        />
      </div>

      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
};