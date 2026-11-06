import { useState } from "react"
import { useNavigate } from "react-router-dom"

import toast from "react-hot-toast"

import { SignUpFields } from "../SignUpFields/SignUpFields"
import { AuthButton } from "../../../auth/components/AuthButton/AuthButton"
import { validateRegisterData } from "../../../auth/utils/validation"

import { useAuth } from "../../../auth/context/useAuth"

import "./SignUpForm.css"

export const SignUpForm = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const clearFieldError = (field: string) => {
    setErrors((current) => {
      if (!(field in current)) return current

      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading) return

    const validationErrors = validateRegisterData(
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword
    )

    if (!password.trim()) {
      validationErrors.password = "Password is required"
    }

    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm your password"
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please check the highlighted fields")
      return
    }

    setErrors({})

    try {
      setLoading(true)

      await register({
        firstName,
        lastName,
        email,
        username,
        password,
      })

      toast.success("Account created. Sign in to continue.")

      navigate("/login")
    } catch (error) {
      console.error(error)
      toast.error("We couldn't create your account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <SignUpFields
        firstName={firstName}
        lastName={lastName}
        email={email}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        errors={errors}
        onFirstNameChange={(e) => {
          setFirstName(e.target.value)
          clearFieldError("firstName")
        }}
        onLastNameChange={(e) => {
          setLastName(e.target.value)
          clearFieldError("lastName")
        }}
        onEmailChange={(e) => {
          setEmail(e.target.value)
          clearFieldError("email")
        }}
        onUsernameChange={(e) => {
          setUsername(e.target.value)
          clearFieldError("username")
        }}
        onPasswordChange={(e) => {
          setPassword(e.target.value)
          clearFieldError("password")
          clearFieldError("confirmPassword")
        }}
        onConfirmPasswordChange={(e) => {
          setConfirmPassword(e.target.value)
          clearFieldError("confirmPassword")
        }}
      />

      <AuthButton
        type="submit"
        loading={loading}
        disabled={loading}
        text={loading ? "Creating account..." : "Create account"}
      />
    </form>
  )
}
