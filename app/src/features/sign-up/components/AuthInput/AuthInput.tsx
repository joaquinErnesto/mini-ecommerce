import "./AuthInput.css"

interface Props {
  label: string
  icon: string
  type?: string
  value: string
  placeholder: string
  error?: string

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
}

export const AuthInput = ({
  label,
  icon,
  type = "text",
  value,
  placeholder,
  error,
  onChange
}: Props) => {

  return (
    <div className="auth-input">

      <label>
        {label}
      </label>

      <div className="auth-input-wrapper">

        <span className="material-symbols-outlined">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />

      </div>

      {error && (
        <small>{error}</small>
      )}

    </div>
  )
}