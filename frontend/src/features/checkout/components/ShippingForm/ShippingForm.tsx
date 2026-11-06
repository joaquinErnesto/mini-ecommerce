import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { Link } from "react-router-dom"

import { InputField } from "../InputField/InputField"

import { useCheckout } from "../../context/useCheckout"
import { useCart } from "../../../cart/context/useCart"

import toast from "react-hot-toast"

import "./ShippingForm.css"

export const ShippingForm = () => {
  const { state, setShipping, setStep } = useCheckout()
  const { items } = useCart()

  const [form, setForm] = useState({
    fullName: state.shipping.fullName,
    address: state.shipping.address,
    city: state.shipping.city,
    country: state.shipping.country,
    zipCode: state.shipping.zipCode
  })

  useEffect(() => {
    setForm({
      fullName: state.shipping.fullName,
      address: state.shipping.address,
      city: state.shipping.city,
      country: state.shipping.country,
      zipCode: state.shipping.zipCode
    })
  }, [state.shipping])

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})

  const validate = (data = form) => {
    const newErrors: { [key: string]: string } = {}

    if (!data.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (data.fullName.trim().length < 3) {
      newErrors.fullName = "Enter at least 3 characters"
    }

    if (!data.address.trim()) {
      newErrors.address = "Street address is required"
    }

    if (!data.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!data.country.trim()) {
      newErrors.country = "Country is required"
    }

    if (!data.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required"
    } else if (!/^\d{5}$/.test(data.zipCode)) {
      newErrors.zipCode = "Use a 5-digit ZIP code"
    }

    return newErrors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value
    }

    setForm(updatedForm)
    setErrors(validate(updatedForm))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!items.length) {
      toast.error("Your cart is empty")
      return
    }

    const newErrors = validate()

    setErrors(newErrors)
    setTouched({
      fullName: true,
      address: true,
      city: true,
      country: true,
      zipCode: true
    })

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please check the highlighted fields")
      return
    }

    setShipping(form)
    setStep(2)
  }

  return (
    <form
      className="shipping-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <header className="checkout-step-head">
        <h2>Shipping details</h2>
        <p>Where should we send your order?</p>
      </header>

      <div className="checkout-fields">
        <InputField
          label="Full name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="John Doe"
          autoComplete="name"
          required
          full
          error={touched.fullName ? errors.fullName : ""}
        />

        <InputField
          label="Street address"
          name="address"
          value={form.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="123 Main St"
          autoComplete="street-address"
          required
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
          autoComplete="address-level2"
          required
          error={touched.city ? errors.city : ""}
        />

        <InputField
          label="ZIP code"
          name="zipCode"
          value={form.zipCode}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="10001"
          autoComplete="postal-code"
          inputMode="numeric"
          required
          error={touched.zipCode ? errors.zipCode : ""}
        />

        <InputField
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="United States"
          autoComplete="country-name"
          required
          full
          error={touched.country ? errors.country : ""}
        />
      </div>

      <div className="checkout-actions">
        <Link
          className="checkout-button checkout-button--ghost"
          to="/cart"
        >
          Back to bag
        </Link>

        <button type="submit" className="checkout-button">
          Continue to payment
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </button>
      </div>
    </form>
  )
}
