import { AuthInput } from "../AuthInput/AuthInput"

import "./SIgnUpFields.css"

interface Props {
  fullName: string
  email: string
  password: string
  confirmPassword: string

  errors: Record<string, string>

  onFullNameChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  onEmailChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  onPasswordChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  onConfirmPasswordChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
}

export const SignUpFields = ({
  fullName,
  email,
  password,
  confirmPassword,
  errors,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange
}: Props) => {

  return (
    <>
      <AuthInput
        label="Full Name"
        icon="person"
        value={fullName}
        placeholder="John Doe"
        error={errors.fullName}
        onChange={onFullNameChange}
      />

      <AuthInput
        label="Email Address"
        icon="alternate_email"
        type="email"
        value={email}
        placeholder="john@example.com"
        error={errors.email}
        onChange={onEmailChange}
      />

      <AuthInput
        label="Password"
        icon="lock"
        type="password"
        value={password}
        placeholder="••••••••"
        error={errors.password}
        onChange={onPasswordChange}
      />

      <AuthInput
        label="Confirm Password"
        icon="verified_user"
        type="password"
        value={confirmPassword}
        placeholder="••••••••"
        error={errors.confirmPassword}
        onChange={onConfirmPasswordChange}
      />
    </>
  )
}