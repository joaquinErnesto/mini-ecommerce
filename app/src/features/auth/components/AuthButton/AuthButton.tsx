import "./AuthButton.css";

interface Props {
  text: string;
  onClick?: () => void;

  type?: "button" | "submit";

  disabled?: boolean;
}

export const AuthButton = ({
  text,
  onClick,
  type = "button",
  disabled = false
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="auth-button"
      onClick={onClick}
    >
      <span>{text}</span>

      <span className="material-symbols-outlined">
        arrow_right_alt
      </span>
    </button>
  );
};