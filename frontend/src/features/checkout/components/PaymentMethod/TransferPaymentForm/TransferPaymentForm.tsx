import { InputField } from "../../InputField/InputField";
import "./TransferPaymentForm.css"

interface TransferPaymentFormProps {
  bankName: string
  accountNumber: string
  accountHolder: string

  touched: { [key: string]: boolean }
  errors: { [key: string]: string }

  setBankName: React.Dispatch<React.SetStateAction<string>>
  setAccountHolder: React.Dispatch<React.SetStateAction<string>>

  onAccountNumberChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  setTouched: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >
}

export const TransferPaymentForm = ({
  bankName,
  accountNumber,
  accountHolder,

  touched,
  errors,

  setBankName,
  setAccountHolder,

  onAccountNumberChange,

  setTouched
}: TransferPaymentFormProps) => {
  return (
    <>
      <InputField
        label="Bank Name"
        name="bankName"
        value={bankName}
        onChange={(e) =>
          setBankName(
            e.target.value
              .replace(/[^a-zA-Z\s]/g, "")
              .slice(0, 50)
          )
        }
        onBlur={() =>
          setTouched((prev) => ({
            ...prev,
            bankName: true
          }))
        }
        error={touched.bankName ? errors.bankName : ""}
        placeholder="Bank of America"
        full
      />

      <InputField
        label="Account Number"
        name="accountNumber"
        value={accountNumber}
        onChange={onAccountNumberChange}
        onBlur={() =>
          setTouched((prev) => ({
            ...prev,
            accountNumber: true
          }))
        }
        error={
          touched.accountNumber
            ? errors.accountNumber
            : ""
        }
        placeholder="123456789"
        full
      />

      <InputField
        label="Account Holder"
        name="accountHolder"
        value={accountHolder}
        onChange={(e) =>
          setAccountHolder(
            e.target.value
              .replace(/[^a-zA-Z\s]/g, "")
              .slice(0, 50)
          )
        }
        onBlur={() =>
          setTouched((prev) => ({
            ...prev,
            accountHolder: true
          }))
        }
        error={
          touched.accountHolder
            ? errors.accountHolder
            : ""
        }
        placeholder="John Doe"
        full
      />
    </>
  )
}