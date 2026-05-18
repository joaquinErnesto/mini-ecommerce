import type { ReactNode } from "react";
import "./AuthCard.css";

interface Props {
  children: ReactNode;
}

export const AuthCard = ({ children }: Props) => {
  return (
    <section className="auth-card">
      {children}
    </section>
  );
};