import { AuthInput } from "../../../auth/components/AuthInput/AuthInput"

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
  onConfirmPasswordChange,
}: Props) => {
  return (
    <div className="signup-fields">
      <AuthInput
        name="firstName"
        label="First name"
        icon="person"
        value={firstName}
        placeholder="John"
        error={errors.firstName}
        onChange={onFirstNameChange}
        autoComplete="given-name"
        required
      />

      <AuthInput
        name="lastName"
        label="Last name"
        icon="id_card"
        value={lastName}
        placeholder="Doe"
        error={errors.lastName}
        onChange={onLastNameChange}
        autoComplete="family-name"
        required
      />

      <AuthInput
        name="email"
        label="Email address"
        icon="alternate_email"
        type="email"
        value={email}
        placeholder="johndoe@example.com"
        error={errors.email}
        onChange={onEmailChange}
        autoComplete="email"
        required
        full
      />

      <AuthInput
        name="username"
        label="Username"
        icon="account_circle"
        value={username}
        placeholder="johndoe"
        error={errors.username}
        onChange={onUsernameChange}
        autoComplete="username"
        required
        full
      />

      <AuthInput
        name="password"
        label="Password"
        icon="lock"
        type="password"
        value={password}
        placeholder="8+ characters"
        error={errors.password}
        onChange={onPasswordChange}
        autoComplete="new-password"
        required
      />

      <AuthInput
        name="confirmPassword"
        label="Confirm password"
        icon="verified_user"
        type="password"
        value={confirmPassword}
        placeholder="Repeat"
        error={errors.confirmPassword}
        onChange={onConfirmPasswordChange}
        autoComplete="new-password"
        required
      />
    </div>
  )
}
