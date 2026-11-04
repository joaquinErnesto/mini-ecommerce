import "./AuthButton.css"

interface Props {
  text: string
  
  disabled?: boolean

  onClick?: () => void

  type?: "button" | "submit"
}

export const AuthButton = ({
  text,
  disabled = false,
  onClick,
  type = "button"
}: Props) => {

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="auth-button"
    >
      <span>{text}</span>

      <span className="material-symbols-outlined">
        arrow_right_alt
      </span>
    </button>
  )
}