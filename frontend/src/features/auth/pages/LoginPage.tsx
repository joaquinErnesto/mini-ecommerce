import { AuthLayout } from "../components/AuthLayout/AuthLayout"
import { AuthCard } from "../components/AuthCard/AuthCard"
import { AuthHeader } from "../components/AuthHeader/AuthHeader"
import { LoginForm } from "../components/LoginForm/LoginForm"
import { AuthFooter } from "../components/AuthFooter/AuthFooter"

export const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome back."
          subtitle="Sign in to continue your edit."
        />

        <LoginForm />

        <AuthFooter
          text="New to the shop?"
          linkText="Create an account"
          to="/signup"
        />
      </AuthCard>
    </AuthLayout>
  )
}
