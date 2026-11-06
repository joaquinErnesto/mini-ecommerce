import { useState } from "react"

import "./AuthInput.css"

interface Props {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    icon: string
    type?: string
    placeholder?: string
    error?: string
    autoComplete?: string
    required?: boolean
    full?: boolean
}

export const AuthInput = ({
    label,
    name,
    value,
    onChange,
    icon,
    type = "text",
    placeholder,
    error,
    autoComplete,
    required,
    full,
}: Props) => {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === "password"
    const resolvedType = isPassword && showPassword ? "text" : type
    const errorId = `${name}-error`

    return (
        <div
            className={`auth-input-wrapper ${full ? "full" : ""} ${
                error ? "has-error" : ""
            }`}
        >
            <label htmlFor={name}>{label}</label>

            <div
                className={`auth-input-container ${
                    isPassword ? "has-toggle" : ""
                }`}
            >
                <span
                    className="auth-input-icon material-symbols-outlined"
                    aria-hidden="true"
                >
                    {icon}
                </span>

                <input
                    id={name}
                    name={name}
                    type={resolvedType}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    required={required}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? errorId : undefined}
                />

                {isPassword ? (
                    <button
                        type="button"
                        className="auth-input-toggle"
                        onClick={() => setShowPassword((shown) => !shown)}
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                    >
                        <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                        >
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </button>
                ) : null}
            </div>

            {error ? (
                <span className="auth-input-error" id={errorId}>
                    {error}
                </span>
            ) : null}
        </div>
    )
}
