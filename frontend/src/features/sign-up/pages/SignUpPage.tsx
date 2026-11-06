import { AuthLayout } from "../../auth/components/AuthLayout/AuthLayout"
import { AuthCard } from "../../auth/components/AuthCard/AuthCard"
import { AuthHeader } from "../../auth/components/AuthHeader/AuthHeader"
import { AuthFooter } from "../../auth/components/AuthFooter/AuthFooter"

import { SignUpForm } from "../components/SignUpForm/SignUpForm"
import { TrustIndicators } from "../components/TrustIndicators/TrustIndicators"

export const SignUpPage = () => {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create your account."
          subtitle="A few details and you're in."
        />

        <SignUpForm />

        <TrustIndicators />

        <AuthFooter
          text="Already have an account?"
          linkText="Sign in"
          to="/login"
        />
      </AuthCard>
    </AuthLayout>
  )
}
