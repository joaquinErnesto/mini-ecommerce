import { useState } from "react"
import { useNavigate } from "react-router-dom"

import toast from "react-hot-toast"

import { AuthInput } from "../AuthInput/AuthInput"
import { AuthButton } from "../AuthButton/AuthButton"

import { useAuth } from "../../context/useAuth"

import { AUTH_MESSAGES, AUTH_ROUTES } from "../../constants/auth.constants"

import "./LoginForm.css"

export const LoginForm = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => {
      if (!(name in current)) return current

      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading) return

    const nextErrors: Record<string, string> = {}

    if (!form.username.trim()) {
      nextErrors.username = "Enter your username"
    }

    if (!form.password.trim()) {
      nextErrors.password = "Enter your password"
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    try {
      setLoading(true)

      await login({
        username: form.username,
        password: form.password,
      })

      toast.success(AUTH_MESSAGES.LOGIN_SUCCESS)

      navigate(AUTH_ROUTES.PROFILE)
    } catch (error) {
      console.error(error)
      toast.error(AUTH_MESSAGES.LOGIN_ERROR)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <AuthInput
        name="username"
        label="Username"
        icon="alternate_email"
        placeholder="Enter your username"
        value={form.username}
        onChange={handleChange}
        error={errors.username}
        autoComplete="username"
        required
      />

      <AuthInput
        name="password"
        label="Password"
        type="password"
        icon="lock"
        placeholder="Enter your password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="current-password"
        required
      />

      <div className="login-form-button">
        <AuthButton
          type="submit"
          loading={loading}
          disabled={loading}
          text={loading ? "Signing in..." : "Sign in"}
        />
      </div>
    </form>
  )
}
