import { InputField } from "../../InputField/InputField";
import "./CryptoPaymentForm.css"

interface CryptoPaymentFormProps {
  walletAddress: string
  network: string

  touched: { [key: string]: boolean }
  errors: { [key: string]: string }

  setWalletAddress: React.Dispatch<React.SetStateAction<string>>
  setNetwork: React.Dispatch<React.SetStateAction<string>>

  setTouched: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >
}

export const CryptoPaymentForm = ({
  walletAddress,
  network,

  touched,
  errors,

  setWalletAddress,
  setNetwork,

  setTouched
}: CryptoPaymentFormProps) => {
  return (
    <>
      <InputField
        label="Wallet Address"
        name="walletAddress"
        value={walletAddress}
        onChange={(e) =>
          setWalletAddress(
            e.target.value
              .replace(/[^a-zA-Z0-9]/g, "")
              .slice(0, 42)
          )
        }
        onBlur={() =>
          setTouched((prev) => ({
            ...prev,
            walletAddress: true
          }))
        }
        error={
          touched.walletAddress
            ? errors.walletAddress
            : ""
        }
        placeholder="0x1234..."
        full
      />

      <select
        value={network}
        onChange={(e) => setNetwork(e.target.value)}
        onBlur={() =>
          setTouched((prev) => ({
            ...prev,
            network: true
          }))
        }
        className="select-field"
      >
        <option value="">Select network</option>
        <option value="Ethereum">Ethereum</option>
        <option value="Bitcoin">Bitcoin</option>
        <option value="Solana">Solana</option>
      </select>

      {touched.network && errors.network && (
        <span className="error">{errors.network}</span>
      )}
    </>
  )
}