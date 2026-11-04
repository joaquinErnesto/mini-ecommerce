import { SignUpHeader } from "../SignUpHeader/SignUpHeader"
import { SignUpForm } from "../SignUpForm/SignUpForm"

import { AuthFooter } from "../../../auth/components/AuthFooter/AuthFooter"

import "./SignUpCard.css"

export const SignUpCard = () => {

  return (
    <div className="signup-card">

      <SignUpHeader />

      <SignUpForm />

      <AuthFooter
        text="Already have an account?"
        linkText="Log In"
        to="/login"
      />

    </div>
  )
}