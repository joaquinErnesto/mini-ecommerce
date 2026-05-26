import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"

import { useAuth } from "../context/useAuth"

import { AuthLoader } from
  "../components/AuthLoader/AuthLoader"

import { AUTH_ROUTES } from "../constants/auth.constants"

interface Props {
  children: ReactNode
}

export const ProtectedRoute = ({
  children
}: Props) => {

  const {
    isAuthenticated,
    loading
  } = useAuth()

  /**
   * Checking session
   */
  if (loading) {

    return (
      <AuthLoader
        text="Restoring session..."
      />
    )
  }

  /**
   * Not authenticated
   */
  if (!isAuthenticated) {

    return (
      <Navigate
        to={AUTH_ROUTES.LOGIN}
        replace
      />
    )
  }

  /**
   * Authenticated
   */
  return children
}