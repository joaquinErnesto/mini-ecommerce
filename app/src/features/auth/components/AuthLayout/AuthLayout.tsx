import type { ReactNode } from "react";
import { AmbientBackground } from "../AmbientBackground/AmbientBackground";
import "./AuthLayout.css";

interface Props {
  children: ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
  return (
    <main className="auth-layout">
      <AmbientBackground />

      <div className="auth-layout-content">
        {children}
      </div>
    </main>
  );
};