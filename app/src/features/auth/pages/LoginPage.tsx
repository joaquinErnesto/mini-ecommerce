import { AuthLayout } from "../components/AuthLayout/AuthLayout";
import { AuthCard } from "../components/AuthCard/AuthCard";
import { AuthHeader } from "../components/AuthHeader/AuthHeader";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { AuthFooter } from "../components/AuthFooter/AuthFooter";

export const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="ELECTRIC NOIR"
          subtitle="Digital Curator Portal"
        />

        <LoginForm />

        <AuthFooter
          text="Don't have an account?"
          linkText="Sign Up"
          to="/signup"
        />
      </AuthCard>
    </AuthLayout>
  );
};