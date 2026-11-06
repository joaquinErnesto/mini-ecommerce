import "./AuthButton.css"

interface Props {
  text: string
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  loading?: boolean
}

export const AuthButton = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className="auth-button"
      onClick={onClick}
      aria-busy={loading}
    >
      {loading ? (
        <span className="auth-button-spinner" aria-hidden="true" />
      ) : null}

      <span>{text}</span>

      {!loading ? (
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_forward
        </span>
      ) : null}
    </button>
  )
}
