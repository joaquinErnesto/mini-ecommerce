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

  const [touched, setTouched] = useState<{ [key: string]: boolean}>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true })
  }
  
  const handleSubmit = () => {
    const newErrors = validate()

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setShipping(form)
    setStep(2)
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (!form.fullName) newErrors.fullName = "Full name is requiered"
    if (!form.address) newErrors.address = "Address is required"

    return newErrors
  }

  const isValid = Object.keys(validate()).length === 0

  return (
    <div className="shipping-form">
      <h2>Shipping Information</h2>

      <div className="grid">
        <InputField 
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          onBlur={handleBlur} 
          placeholder="John Doe"
          full 
          error={touched.fullName ? errors.fullName : ""}
        />

        <InputField 
          label="Address" 
          name="address"
          value={form.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="123 Main St" 
          full
          error={touched.address ? errors.address : ""}
        />

        <InputField 
          label="City" 
          name="city"
          value={form.city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="New York" 
          full 
          error={touched.city ? errors.city : ""}
        />

        <InputField 
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="USA"
          full
          error={touched.country ? errors.country : ""} 
        />

        <InputField 
          label="Zip Code" 
          name="zipCode"
          value={form.zipCode}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="10001"
          full
          error={touched.zipCode ? errors.zipCode : ""} 
        />
      </div>

      <button 
        onClick={handleSubmit}
        disabled={!isValid}
      >
        Continue
      </button>
    </div>
  );
};