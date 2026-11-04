import { AuthLayout } from "../../auth/components/AuthLayout/AuthLayout"
import { AuthCard } from "../../auth/components/AuthCard/AuthCard"
import { AuthHeader } from "../../auth/components/AuthHeader/AuthHeader"

import { SignUpCard } from "../components/SignUpCard/SignUpCard"

import { TrustIndicators } from "../components/TrustIndicators/TrustIndicators"

export const SignUpPage = () => {

  return (
    <AuthLayout>

      <div className="signup-page">

        <AuthHeader
          title="Mini E-Commerce"
          subtitle="Product Marketplace Portal"
        />

        <AuthCard>
          <SignUpCard />
        </AuthCard>

        <TrustIndicators />

      </div>

    </AuthLayout>
  )
}