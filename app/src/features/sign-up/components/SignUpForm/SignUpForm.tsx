import { useState } from "react"

import { SignUpFields } from "../SignUpFields/SignUpFields"
import { AuthButton } from "../AuthButton/AuthButton"

import "./SignUpForm.css"

export const SignUpForm = () => {

  const [fullName, setFullName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [errors] =
    useState<Record<string, string>>({})

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    console.log("Sign Up")
  }

  return (
    <form
      className="signup-form"
      onSubmit={handleSubmit}
    >

      <SignUpFields
        fullName={fullName}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        errors={errors}

        onFullNameChange={(e) =>
          setFullName(e.target.value)
        }

        onEmailChange={(e) =>
          setEmail(e.target.value)
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
        text="Sign Up"
      />

    </form>
  )
}