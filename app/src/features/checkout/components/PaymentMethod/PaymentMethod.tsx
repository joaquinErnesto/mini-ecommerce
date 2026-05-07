import "./PaymentMethod.css";
import { useState, useEffect, useCallback } from "react";
import { useCheckout } from "../../context/useCheckout";
import { PaymentOption } from "../PaymentOption/PaymentOption";
import { InputField } from "../InputField/InputField";
import { submitOrder } from "../../services/checkout.api";

export const PaymentMethod = () => {
  const [cardNumber, setCardNumber] = useState("")
  const [cardHolder, setCardHolder] = useState("")
  const [expMonth, setExpMonth] = useState("")
  const [expYear, setExpYear] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const { state, setPayment, setStep } = useCheckout()

  const [selected, setSelected] = useState<"Card" | "Crypto" | "Transfer" | "">("")

  // Crypto
  const [walletAddress, setWalletAddress] = useState("")
  const [network, setNetwork] = useState("")

  // Transfer
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountHolder, setAccountHolder] = useState("")

  type PaymentMethodType = "Card" | "Crypto" | "Transfer"

  const handleSelect = (method: PaymentMethodType) => {
    setSelected(method)
  }

  const handleContinue = async () => {
    if (!selected) return

    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    setApiError(null)

    try {
      const result = await submitOrder({
        payment: {
          method: selected,
          cardNumber,
          cardHolder,
          expMonth,
          expYear,
          walletAddress,
          network,
          bankName,
          accountNumber,
          accountHolder
        },
        shipping: state.shipping,
        items: [] // connect cart later
      })

      console.log("✅ Order success:", result)

      setPayment({
        method: selected,
        cardNumber,
        cardHolder,
        expMonth,
        expYear,
        walletAddress,
        network,
        bankName,
        accountNumber,
        accountHolder
      })

      setStep(3)

    } catch (err: unknown) {
      console.error("❌ Order failed:", err)
      if (err instanceof Error) {
        setApiError(err.message)
      } else {
        setApiError("Something went wrong")
      }
    } finally {
      setLoading(false)
    }
  }

  const validate = useCallback((data?: Partial<{
    cardNumber: string
    cardHolder: string
    expMonth: string
    expYear: string

    walletAddress: string
    network: string

    bankName: string
    accountNumber: string
    accountHolder: string
  }>) => {

    const newErrors: { [key: string]: string } = {}

    // Merge current state with incoming data
    const values = {
      cardNumber,
      cardHolder,
      expMonth,
      expYear,

      walletAddress,
      network,

      bankName,
      accountNumber,
      accountHolder,

      ...data
    }

    // =========================
    // CARD VALIDATION
    // =========================
    if (selected === "Card") {

      const digitsOnly = values.cardNumber.replace(/\s/g, "")

      // Card Number
      if (!digitsOnly) {
        newErrors.cardNumber = "Required"
      } else if (!/^\d{16}$/.test(digitsOnly)) {
        newErrors.cardNumber = "Must be 16 digits"
      }

      // Card Holder
      if (!values.cardHolder) {
        newErrors.cardHolder = "Required"
      } else if (values.cardHolder.length > 50) {
        newErrors.cardHolder = "Too long"
      } else if (!/^[a-zA-Z\s]+$/.test(values.cardHolder)) {
        newErrors.cardHolder = "Only letters"
      }

      // Expiration Month
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth() + 1
      const currentYear = currentDate.getFullYear()

      const month = Number(values.expMonth)
      const year = Number(values.expYear)

      if (!values.expMonth) {
        newErrors.expMonth = "Required"
      } else if (month < 1 || month > 12) {
        newErrors.expMonth = "Invalid month"
      }

      // Expiration Year
      if (!values.expYear) {
        newErrors.expYear = "Required"
      } else if (!/^\d{4}$/.test(values.expYear)) {
        newErrors.expYear = "Must be 4 digits"
      } else if (year < currentYear) {
        newErrors.expYear = "Card expired"
      }

      // Full Expiration Check
      if (
        year === currentYear &&
        month < currentMonth
      ) {
        newErrors.expMonth = "Expired"
      }
    }

    // =========================
    // CRYPTO VALIDATION
    // =========================
    if (selected === "Crypto") {

      if (!values.walletAddress) {
        newErrors.walletAddress = "Required"
      } else if (
        values.walletAddress.length < 26 ||
        values.walletAddress.length > 42
      ) {
        newErrors.walletAddress = "Invalid length"
      } else if (!/^[a-zA-Z0-9]+$/.test(values.walletAddress)) {
        newErrors.walletAddress = "Invalid characters"
      }

      if (!values.network) {
        newErrors.network = "Required"
      }
    }

    // =========================
    // TRANSFER VALIDATION
    // =========================
    if (selected === "Transfer") {

      // Bank Name
      if (!values.bankName) {
        newErrors.bankName = "Required"
      } else if (values.bankName.length > 50) {
        newErrors.bankName = "Too long"
      } else if (!/^[a-zA-Z\s]+$/.test(values.bankName)) {
        newErrors.bankName = "Only letters"
      }

      // Account Number
      const digitsOnly = (values.accountNumber || "").replace(/\s/g, "")

      if (!digitsOnly) {
        newErrors.accountNumber = "Required"
      } else if (!/^\d{20}$/.test(digitsOnly)) {
        newErrors.accountNumber = "Must be 20 digits"
      }

      // Account Holder
      if (!values.accountHolder) {
        newErrors.accountHolder = "Required"
      } else if (values.accountHolder.length > 50) {
        newErrors.accountHolder = "Too long"
      } else if (!/^[a-zA-Z\s]+$/.test(values.accountHolder)) {
        newErrors.accountHolder = "Only letters"
      }
    }

    return newErrors

  }, [
    selected,

    cardNumber,
    cardHolder,
    expMonth,
    expYear,

    walletAddress,
    network,

    bankName,
    accountNumber,
    accountHolder
  ])

  useEffect(() => {
    const validationErrors = validate()

    setErrors(validationErrors)
  }, [
    expMonth,
    expYear,

    walletAddress,
    network,

    bankName,
    accountNumber,
    accountHolder,
    validate
  ])

  const isValid =
    selected === "Card"
      ? !!(
          cardNumber &&
          cardHolder &&
          expMonth &&
          expYear &&
          Object.keys(errors).length === 0
        )
      : selected === "Crypto"
      ? !!(
          walletAddress &&
          network &&
          Object.keys(errors).length === 0
        )
      : selected === "Transfer"
      ? !!(
          bankName &&
          accountNumber &&
          accountHolder &&
          Object.keys(errors).length === 0
        )
      : false

  const formatCardNumber = (value: string) => {
    // remove everything except digits
    const digits = value.replace(/\D/g, "")

    // group every 4 digits
    const groups = digits.match(/.{1,4}/g)

    return groups ? groups.join(" ") : ""
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "") // only digits

    // ✅ LIMIT to 16 digits
    input = input.slice(0, 16)

    const formatted = formatCardNumber(input)

    setCardNumber(formatted)
  }

  /* const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4)

    if (digits.length <= 2) return digits

    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  } */

  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "").slice(0, 50)

    setCardHolder(value)
  }

  const formatAccountNumber = (value: string) => {
    // Remove everything except digits
    const digits = value.replace(/\D/g, "")

    // Limit to 20 digits (5 groups of 4)
    const limited = digits.slice(0, 20)

    // Add space every 4 digits
    return limited.replace(/(.{4})/g, "$1 ").trim()
  }

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAccountNumber(e.target.value)

    setAccountNumber(formatted)

    const newErrors = validate({
      accountNumber: formatted
    })

    setErrors((prev) => ({ ...prev, ...newErrors }))
  }
  
  return (
    <div className="payment-method">
      <h2>Payment Method</h2>

      <div className="options">
        <PaymentOption 
          label="Card"
          selected={selected === "Card"} 
          onClick={() => handleSelect("Card")}
        />

        <PaymentOption 
          label="Crypto" 
          selected={selected === "Crypto"}
          onClick={() => handleSelect("Crypto")}
        />

        <PaymentOption 
          label="Transfer"
          selected={selected === "Transfer"}
          onClick={() => handleSelect("Transfer")}
        />
      </div>

      {/* Dynamic Payment Form */}
        <div className="payment-form">

          {/* CARD */}
            {selected === "Card" && (
              <>
                <InputField
                  label="Card Number"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  onBlur={() => setTouched({ ...touched, cardNumber: true })}
                  error={touched.cardNumber ? errors.cardNumber : ""}
                  placeholder="1234 5678 9012 3456"
                  full
                />

                <InputField
                  label="Card Holder"
                  name="cardHolder"
                  value={cardHolder}
                  onChange={handleCardHolderChange}
                  onBlur={() => setTouched({ ...touched, cardHolder: true })}
                  error={touched.cardHolder ? errors.cardHolder : ""}
                  placeholder="John Doe"
                  full
                />

                <div className="expiry-group">
                  <InputField
                    label="Month"
                    name="expMonth"
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
                    onBlur={() => setTouched({ ...touched, expMonth: true })}
                    error={touched.expMonth ? errors.expMonth : ""}
                    placeholder="MM"
                  />

                  <InputField
                    label="Year"
                    name="expYear"
                    value={expYear}
                    onChange={(e) => 
                      setExpYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    onBlur={() => setTouched({ ...touched, expYear: true })}
                    error={touched.expYear ? errors.expYear : ""}
                    placeholder="YY"
                  />
                </div>
              </>
            )}

          {/* CRYPTO */}
          {selected === "Crypto" && (
            <>
              <InputField
                label="Wallet Address"
                name="walletAddress"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 42))}
                onBlur={() => setTouched({ ...touched, walletAddress: true })}
                error={touched.walletAddress ? errors.walletAddress : ""}
                placeholder="0x1234..."
                full
              />

              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                onBlur={() => setTouched({ ...touched, network: true })}
                className="select-field"
              >
                <option value="">
                  Select network
                </option>
                
                <option value="Ethereum">
                  Ethereum
                </option>
                
                <option value="Bitcoin">
                  Bitcoin
                </option>
                
                <option value="Solana">
                  Solana
                </option>
              </select>

              {touched.network && errors.network && (
                <span className="error">{errors.network}</span>
              )}
            </>
          )}

          {/* TRANSFER */}
          {selected === "Transfer" && (
            <>
              <InputField
                label="Bank Name"
                name="bankName"
                value={bankName}
                onChange={(e) => setBankName(e.target.value.replace(/[^a-zA-Z\s]/g, "").slice(0, 50))}
                onBlur={() => setTouched({ ...touched, bankName: true })}
                error={touched.bankName ? errors.bankName : ""}
                placeholder="Bank of America"
                full
              />

              <InputField
                label="Account Number"
                name="accountNumber"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                onBlur={() => setTouched({ ...touched, accountNumber: true })}
                error={touched.accountNumber ? errors.accountNumber : ""}
                placeholder="123456789"
                full
              />

              <InputField
                label="Account Holder"
                name="accountHolder"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value.replace(/[^a-zA-Z\s]/g, "").slice(0, 50))}
                onBlur={() => setTouched({ ...touched, accountHolder: true })}
                error={touched.accountHolder ? errors.accountHolder : ""}
                placeholder="John Doe"
                full
              />
            </>
          )}
        </div>

      {apiError && (
        <p style={{ color: "red", textAlign: "center" }}>
          {apiError}
        </p>
      )}
      
      <div className="action-buttons">
        <button 
          className="btn-secondary" 
          onClick={() => setStep(1)}
        >
          Back
        </button>
        
        <button 
          className="btn-primary"
          onClick={handleContinue}
          disabled={!isValid || loading}
        >
          {loading ? "Processing..." : "Continue"}
        </button>
      </div>
    </div>
  );
};