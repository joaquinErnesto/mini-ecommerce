import "./PaymentOption.css"

interface Props {
  label: string
  description: string
  icon: string
  selected?: boolean
  onClick?: () => void
}

export const PaymentOption = ({
  label,
  description,
  icon,
  selected,
  onClick
}: Props) => {
  return (
    <button
      type="button"
      className={`payment-option ${selected ? "is-selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span
        className="payment-option-icon material-symbols-outlined"
        aria-hidden="true"
      >
        {icon}
      </span>

      <span className="payment-option-copy">
        <span className="payment-option-label">{label}</span>
        <span className="payment-option-description">{description}</span>
      </span>

      <span className="payment-option-indicator" aria-hidden="true">
        <span className="material-symbols-outlined">
          {selected ? "radio_button_checked" : "radio_button_unchecked"}
        </span>
      </span>
    </button>
  )
}
