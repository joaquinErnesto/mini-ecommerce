import { InputField } from "../../InputField/InputField";
import "./CardPaymentForm.css"

interface CardPaymentFormProps {
  cardNumber: string
  cardHolder: string
  expMonth: string
  expYear: string

  touched: { [key: string]: boolean }
  errors: { [key: string]: string }

  onCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCardHolderChange: (e: React.ChangeEvent<HTMLInputElement>) => void

  setExpMonth: React.Dispatch<React.SetStateAction<string>>
  setExpYear: React.Dispatch<React.SetStateAction<string>>

  setTouched: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >
}

export const CardPaymentForm = ({
  cardNumber,
  cardHolder,
  expMonth,
  expYear,

  touched,
  errors,

  onCardNumberChange,
  onCardHolderChange,

  setExpMonth,
  setExpYear,

  setTouched
}: CardPaymentFormProps) => {
  return (
    <>
      <InputField
        label="Card Number"
        name="cardNumber"
        value={cardNumber}
        onChange={onCardNumberChange}
        onBlur={() =>
          setTouched((prev) => ({
            ...prev,
            cardNumber: true
          }))
        }
        error={touched.cardNumber ? errors.cardNumber : ""}
        placeholder="1234 5678 9012 3456"
        full
      />

      <InputField
        label="Card Holder"
        name="cardHolder"
        value={cardHolder}
        onChange={onCardHolderChange}
        onBlur={() =>
          setTouched((prev) => ({
            ...prev,
            cardHolder: true
          }))
        }
        error={touched.cardHolder ? errors.cardHolder : ""}
        placeholder="John Doe"
        full
      />

      <div className="expiry-group">
        <InputField
          label="Month"
          name="expMonth"
          value={expMonth}
          onChange={(e) =>
            setExpMonth(
              e.target.value.replace(/\D/g, "").slice(0, 2)
            )
          }
          onBlur={() =>
            setTouched((prev) => ({
              ...prev,
              expMonth: true
            }))
          }
          error={touched.expMonth ? errors.expMonth : ""}
          placeholder="MM"
        />

        <InputField
          label="Year"
          name="expYear"
          value={expYear}
          onChange={(e) =>
            setExpYear(
              e.target.value.replace(/\D/g, "").slice(0, 4)
            )
          }
          onBlur={() =>
            setTouched((prev) => ({
              ...prev,
              expYear: true
            }))
          }
          error={touched.expYear ? errors.expYear : ""}
          placeholder="YYYY"
        />
      </div>
    </>
  )
}