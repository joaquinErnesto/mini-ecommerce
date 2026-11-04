import { getUsers } from "../../sign-up/utils/usersStorage"

export const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateRegisterData = (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  confirmPassword: string
) => {

  const errors: Record<string, string> = {}

  if (!firstName.trim()) {
    errors.firstName =
      "First name is required"
  }

  if (!lastName.trim()) {
    errors.lastName =
      "Last name is required"
  }

  if (!email.trim()) {
    errors.email =
      "Email is required"
  }

  if (
    email &&
    !emailRegex.test(email)
  ) {
    errors.email =
      "Invalid email format"
  }

  if (!username.trim()) {
    errors.username =
      "Username is required"
  }

  if (
    username &&
    username.length < 4
  ) {
    errors.username =
      "Username must have at least 4 characters"
  }

  if (
    password &&
    password.length < 8
  ) {
    errors.password =
      "Password must have at least 8 characters"
  }

  if (
    password !== confirmPassword
  ) {
    errors.confirmPassword =
      "Passwords do not match"
  }

  const users = getUsers()

  const emailExists =
    users.some(
      user =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    )

  if (emailExists) {
    errors.email =
      "Email already registered"
  }

  const usernameExists =
    users.some(
      user =>
        user.username.toLowerCase() ===
        username.toLowerCase()
    )

  if (usernameExists) {
    errors.username =
      "Username already exists"
  }

  return errors
}