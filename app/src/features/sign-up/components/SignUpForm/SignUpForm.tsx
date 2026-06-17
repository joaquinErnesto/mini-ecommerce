import { useState } from "react"

import { SignUpFields } from "../SignUpFields/SignUpFields"
import { AuthButton } from "../AuthButton/AuthButton"
import { validateRegisterData } from "../../../auth/utils/validation"

import "./SignUpForm.css"
import { useAuth } from "../../../auth/context/useAuth"

export const SignUpForm = () => {

  const { register } = useAuth()

    const [firstName, setFirstName] =
    useState("")

  const [lastName, setLastName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [errors, setErrors] =
    useState<Record<string, string>>({})

  const [loading, setLoading] = useState(false)  

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      return
    }

    if (password !== confirmPassword) {
      return
    }

    const validationErrors =
      validateRegisterData(
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword
      )

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors)
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
        password
      })

      console.log(
        "Account created successfully"
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    
    }
  }

  return (
    <form
      className="signup-form"
      onSubmit={handleSubmit}
    >

      <SignUpFields
        firstName={firstName}
        lastName={lastName}
        email={email}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        errors={errors}

        onFirstNameChange={(e) =>
          setFirstName(e.target.value)
        }

        onLastNameChange={(e) =>
          setLastName(e.target.value)
        }

        onEmailChange={(e) =>
          setEmail(e.target.value)
        }
        
        onUsernameChange={(e) =>
          setUsername(e.target.value)
        }
        
        onPasswordChange={(e) =>
          setPassword(e.target.value)
        }

        onConfirmPasswordChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }
      />

      <AuthButton
        type="submit"
        disabled={loading}
        text={
          loading
            ? "CREATING ACCOUNT..."
            : "SIGN UP"
        }
      />

    </form>
  )
}