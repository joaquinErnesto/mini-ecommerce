import "./ShippingForm.css";
import { InputField } from "../InputField/InputField";
import { useState } from "react";
import { useCheckout } from "../../context/useCheckout";
import { useCart } from "../../../cart/context/useCart";

export const ShippingForm = () => {
  const { setShipping, setStep } = useCheckout()
  const { items } = useCart()

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
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value
    };

    setForm(updatedForm);

    const newErrors = validate(updatedForm);
    setErrors(newErrors);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true })
  }
  
  const handleSubmit = () => {
    if (!items.length) {
      alert("Your cart is empty");
      return;
    }

    const newErrors = validate();

    setErrors(newErrors);

    // 🔥 mark all fields as touched
    setTouched({
      fullName: true,
      address: true,
      city: true,
      country: true,
      zipCode: true
    });

    if (Object.keys(newErrors).length > 0) return;

    setShipping(form);
    setStep(2);
  };

  const validate = (data = form) => {
    const newErrors: { [key: string]: string } = {};

    if (!data.fullName) newErrors.fullName = "Full name is required";
    if (!data.address) newErrors.address = "Address is required";
    if (!data.city) newErrors.city = "City is required";
    if (!data.country) newErrors.country = "Country is required";
    if (!data.zipCode) newErrors.zipCode = "Zip code is required";

    return newErrors;
  };

  const isValid =
    items.length > 0 &&
    form.fullName &&
    form.address &&
    form.city &&
    form.country &&
    form.zipCode;

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

      <div className="form-actions">
        <button 
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Continue
        </button>
      </div>
    </div>
  );
};