import { AuthInput } from "../AuthInput/AuthInput"

import "./SIgnUpFields.css"

interface Props {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  confirmPassword: string

  errors: Record<string, string>

  onFirstNameChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  onLastNameChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  onEmailChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  onUsernameChange: (
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
  firstName,
  lastName,
  email,
  username,
  password,
  confirmPassword,
  errors,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange
}: Props) => {

  return (
    <>
      <AuthInput
        label="First Name"
        icon="person"
        value={firstName}
        placeholder="John"
        error={errors.fullName}
        onChange={onFirstNameChange}
      />

      <AuthInput
        label="Last Name"
        icon="person"
        value={lastName}
        placeholder="Doe"
        error={errors.fullName}
        onChange={onLastNameChange}
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
        label="User Name"
        icon="user"
        value={username}
        placeholder="john@example.com"
        error={errors.email}
        onChange={onUsernameChange}
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