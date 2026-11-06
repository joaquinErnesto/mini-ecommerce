import "./InputField.css"

interface Props {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  placeholder?: string
  full?: boolean
  error?: string
  inputMode?: React.HtmlHTMLAttributes<HTMLInputElement>["inputMode"]
  type?: React.HTMLInputTypeAttribute
  autoComplete?: string
  required?: boolean
}

export const InputField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  full,
  error,
  inputMode,
  type = "text",
  autoComplete,
  required,
}: Props) => {
  return (
    <div
      className={`input-field ${full ? "full" : ""} ${
        error ? "error" : ""
      }`}
    >
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />

      {error ? (
        <span
          className="input-field-error"
          id={`${name}-error`}
        >
          {error}
        </span>
      ) : null}
    </div>
  )
}
