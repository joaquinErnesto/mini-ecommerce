import "./PaymentMethod.css";
import { useState } from "react";
import { useCheckout } from "../../context/useCheckout";
import { PaymentOption } from "../PaymentOption/PaymentOption";
import { InputField } from "../InputField/InputField";

export const PaymentMethod = () => {
  const [cardNumber, setCardNumber] = useState("")
  const [cardHolder, setCardHolder] = useState("")
  const [expiry, setExpiry] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})

  const { setPayment, setStep } = useCheckout()

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

  const handleContinue = () => {
    if (!selected) return

    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setPayment({
      method: selected,

      cardNumber,
      cardHolder,
      expiry,

      walletAddress,
      network,

      bankName,
      accountNumber,
      accountHolder
    })

    setStep(3)
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (selected === "Card") {
      const digitsOnly = cardNumber.replace(/\s/g, "")

      if (!digitsOnly) newErrors.cardNumber = "Required"
      else if (!/^\d{16}$/.test(digitsOnly))
        newErrors.cardNumber = "Must be 16 digits"

      if (!cardHolder) newErrors.cardHolder = "Required"

      if (!expiry) newErrors.expiry = "Required"
      else if (!/^\d{2}\/\d{2}$/.test(expiry))
        newErrors.expiry = "Format MM/YY"
    }

    if (selected === "Crypto") {
      if (!walletAddress) newErrors.walletAddress = "Required"
      if (!network) newErrors.network = "Required"
    }

    if (selected === "Transfer") {
      if (!bankName) newErrors.bankName = "Required"
      if (!accountNumber) newErrors.accountNumber = "Required"
      if (!accountHolder) newErrors.accountHolder = "Required"
    }

    return newErrors
  }

  const isValid =
  selected === "Card"
    ? cardNumber &&
      cardHolder &&
      expiry &&
      Object.keys(errors).length === 0
    : selected !== null

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

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4)

    if (digits.length <= 2) return digits

    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    setExpiry(formatted)
  }

  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // ✅ Remove numbers/symbols (only letters + spaces)
    value = value.replace(/[^a-zA-Z\s]/g, "")

    // ✅ LIMIT length
    value = value.slice(0, 40)

    setCardHolder(value)
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
                  onChange={(e) => setCardNumber(e.target.value)}
                  onBlur={() => setTouched({ ...touched, cardNumber: true })}
                  error={touched.cardNumber ? errors.cardNumber : ""}
                  placeholder="1234 5678 9012 3456"
                  full
                />

                <InputField
                  label="Card Holder"
                  name="cardHolder"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  onBlur={() => setTouched({ ...touched, cardHolder: true })}
                  error={touched.cardHolder ? errors.cardHolder : ""}
                  placeholder="John Doe"
                  full
                />

                <InputField
                  label="Expiry"
                  name="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  onBlur={() => setTouched({ ...touched, expiry: true })}
                  error={touched.expiry ? errors.expiry : ""}
                  placeholder="12/30"
                />
              </>
            )}

          {/* CRYPTO */}
          {selected === "Crypto" && (
            <>
              <InputField
                label="Wallet Address"
                name="walletAddress"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                onBlur={() => setTouched({ ...touched, walletAddress: true })}
                error={touched.walletAddress ? errors.walletAddress : ""}
                placeholder="0x1234..."
                full
              />

              <InputField
                label="Network"
                name="network"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                onBlur={() => setTouched({ ...touched, network: true })}
                error={touched.network ? errors.network : ""}
                placeholder="Ethereum / BTC"
                full
              />
            </>
          )}

          {/* TRANSFER */}
          {selected === "Transfer" && (
            <>
              <InputField
                label="Bank Name"
                name="bankName"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                onBlur={() => setTouched({ ...touched, bankName: true })}
                error={touched.bankName ? errors.bankName : ""}
                placeholder="Bank of America"
                full
              />

              <InputField
                label="Account Number"
                name="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                onBlur={() => setTouched({ ...touched, accountNumber: true })}
                error={touched.accountNumber ? errors.accountNumber : ""}
                placeholder="123456789"
                full
              />

              <InputField
                label="Account Holder"
                name="accountHolder"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                onBlur={() => setTouched({ ...touched, accountHolder: true })}
                error={touched.accountHolder ? errors.accountHolder : ""}
                placeholder="John Doe"
                full
              />
            </>
          )}
        </div>

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
          disabled={!isValid}
        >
          Continue
        </button>
      </div>
    </div>
  );
};