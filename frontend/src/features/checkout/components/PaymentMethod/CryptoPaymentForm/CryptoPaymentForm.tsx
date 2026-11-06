import { InputField } from "../../InputField/InputField"
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
  const networkError = touched.network ? errors.network : ""

  return (
    <>
      <InputField
        label="Wallet address"
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
        autoComplete="off"
        required
        full
      />

      <div className={`input-field full ${networkError ? "error" : ""}`}>
        <label htmlFor="network">Network</label>

        <div className="select-wrap">
          <select
            id="network"
            name="network"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            onBlur={() =>
              setTouched((prev) => ({
                ...prev,
                network: true
              }))
            }
            aria-invalid={Boolean(networkError)}
            aria-describedby={
              networkError ? "network-error" : undefined
            }
            className="select-field"
            required
          >
            <option value="">Select network</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Solana">Solana</option>
          </select>

          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            expand_more
          </span>
        </div>

        {networkError ? (
          <span
            className="input-field-error"
            id="network-error"
          >
            {networkError}
          </span>
        ) : null}
      </div>
    </>
  )
}
